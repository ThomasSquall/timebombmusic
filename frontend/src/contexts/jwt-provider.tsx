import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { getCurrentUser, impersonateUser, stopImpersonation } from "../services/user.service";
import { CurrentUser, ImpersonatorInfo } from "types/User";
import { normalizeCurrentUser } from "utils/normalize-current-user";

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

interface AuthUser {
  token: string;
  id: number;
  avatar: string;
  name: string;
  email: string;
  is_admin: boolean;
  impersonator: ImpersonatorInfo | null;
  isImpersonating: boolean;
}

interface JWTContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean, error: string | null }>;
  logout: () => Promise<void>;
  getAccessTokenSilently: () => Promise<string>;
  impersonate: (userId: number) => Promise<{ success: boolean; error: string | null }>;
  stopImpersonation: () => Promise<{ success: boolean; error: string | null }>;
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
  const [user, setUser] = useState<AuthUser | null>(null);
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
    getCurrentUser({ accessToken: token })
      .then((response) => {
        if (response.error || !response.data) {
          setUser(null);
          return;
        }

        const currentUser = response.data as CurrentUser;

        const normalizedUser = normalizeCurrentUser(currentUser);

        setUser({
          token,
          id: normalizedUser.id,
          avatar: normalizedUser.avatar,
          name: normalizedUser.name,
          email: normalizedUser.email,
          is_admin: normalizedUser.is_admin,
          impersonator: normalizedUser.impersonator ?? null,
          isImpersonating: normalizedUser.isImpersonating ?? false,
        });
      })
      .catch(() => {
        setUser(null);
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

  const handleImpersonate = async (userId: number) => {
    try {
      const accessToken = await getAccessTokenSilently();

      if (!accessToken) {
        return { success: false, error: "Token non disponibile" };
      }

      const response = await impersonateUser({
        accessToken,
        userId,
      });

      if (response.error) {
        return { success: false, error: response.error.message };
      }

      const token = (response.data as { token?: string })?.token;

      if (!token) {
        return { success: false, error: "Token non ricevuto" };
      }

      localStorage.setItem("token", token);
      internalSetUser(token);

      return { success: true, error: null };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message ?? "Impossibile impersonare l'utente",
      };
    }
  };

  const handleStopImpersonation = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      if (!accessToken) {
        return { success: false, error: "Token non disponibile" };
      }

      const response = await stopImpersonation({ accessToken });

      if (response.error) {
        return { success: false, error: response.error.message };
      }

      const token = (response.data as { token?: string })?.token;

      if (!token) {
        return { success: false, error: "Token non ricevuto" };
      }

      localStorage.setItem("token", token);
      internalSetUser(token);

      return { success: true, error: null };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message ?? "Impossibile terminare l'impersonificazione",
      };
    }
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
        impersonate: handleImpersonate,
        stopImpersonation: handleStopImpersonation,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};
