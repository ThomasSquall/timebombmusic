import { useEffect, useState } from "react";
import { User } from "types/User";
import { useAuth } from "contexts/jwt-provider";
import { getCurrentUser } from "services/user.service";

type UseUserReturnType = User | undefined;

let cached_user: User | undefined = undefined;

export const useUser = (): UseUserReturnType => {
  const [user, setUser] = useState<User | undefined>(cached_user);
  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    if (cached_user) {
      return;
    }

    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _user = await getCurrentUser({ accessToken });

      setUser(_user.data as User);
      cached_user = _user.data;
    })();
  }, [getAccessTokenSilently, setUser, user]);

  return user;
};
