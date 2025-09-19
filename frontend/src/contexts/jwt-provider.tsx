import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { getCurrentUser } from "../services/user.service";

// Login function
const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_SERVER_URL + "/login",
      {
        email,
        password,
      },
    );
    const token = response.data.token;
    // Store the token in localStorage or a cookie for subsequent requests.
    localStorage.setItem("token", token);
    return {
      success: true,
      error: null,
      data: token,
    };
  } catch (error: any) {
    console.error("Login failed:", error.response.data.message);
    return {
      success: false,
      error: error.response.data.message,
      data: null,
    };
  }
};

// Logout function
const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");

    await axios.post(process.env.REACT_APP_API_SERVER_URL + "/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Remove the token from localStorage or a cookie.
    return true;
  } catch (error: any) {
    console.error("Logout failed:", error.response.data.message);
    return false;
  }
};

interface User {
  token: string;
  avatar: string;
  name: string;
  email: string;
  is_admin: boolean;
}

interface JWTContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean, error: string | null }>;
  logout: () => Promise<void>;
  getAccessTokenSilently: () => Promise<string>;
}

const JWTContext = createContext<JWTContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(JWTContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface JWTProviderProps {
  children: ReactNode;
}

export const JWTProvider: React.FC<JWTProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshLock = useRef<Promise<string> | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if the user is authenticated on app load
    const token = localStorage.getItem("token");
    if (token) {
      internalSetUser(token);
    }
    setLoading(false);
  }, []);

  const internalSetUser = (token: string) => {
    getCurrentUser({ accessToken: token }).then((response) => {
      setUser({
        token,
        avatar: response.data.avatar,
        name: response.data.name,
        email: response.data.email,
        is_admin: response.data.is_admin,
      });
    });
  };

  const getAccessTokenSilently = async () => {
    if (refreshLock.current) {
      // If a token refresh operation is in progress, wait for it to complete
      return refreshLock.current;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return "";
      }

      // Check token validity by making a request to your Laravel endpoint
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER_URL + "/check-token-validity",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.isValid) {
        // Token is still valid, return the token
        return token;
      } else {
        // Token is invalid, perform token refresh
        refreshLock.current = axios
          .get(process.env.REACT_APP_API_SERVER_URL + "/refresh-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((refreshResponse) => {
            const refreshedToken = refreshResponse.data.token;

            // Update the token in localStorage
            localStorage.setItem("token", refreshedToken);
            internalSetUser(refreshedToken);

            // Clear the lock
            refreshLock.current = null;

            return refreshedToken;
          });

        return await refreshLock.current;
      }
    } catch (error: any) {
      console.error("Token refresh failed:", error.message);
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const { success, error, data: token } = await login(email, password);

    if (success) {
      if (token) {
        internalSetUser(token);
      }
    }
    return {
      success,
      error
    };
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleRefreshTokenSilently = async () => {
    try {
      // Check token validity and refresh if needed
      const refreshedToken = await getAccessTokenSilently();
      return refreshedToken;
    } catch (error) {
      throw error;
    }
  };

  return (
    <JWTContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login: handleLogin,
        logout: handleLogout,
        getAccessTokenSilently: handleRefreshTokenSilently,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};
