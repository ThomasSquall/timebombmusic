import { useEffect, useState } from "react";
import { CurrentUser } from "types/User";
import { useAuth } from "contexts/jwt-provider";
import { getCurrentUser } from "services/user.service";
import { normalizeCurrentUser } from "utils/normalize-current-user";

type UseUserReturnType = CurrentUser | undefined;

let cached_user: CurrentUser | undefined = undefined;

export const useUser = (): UseUserReturnType => {
  const [user, setUser] = useState<CurrentUser | undefined>(cached_user);
  const { getAccessTokenSilently, user: authUser } = useAuth();
  const authUserId = authUser?.id;

  useEffect(() => {
    if (!authUserId) {
      cached_user = undefined;
      setUser(undefined);
      return;
    }

    if (cached_user && cached_user.id === authUserId) {
      setUser(cached_user);
      return;
    }

    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _user = await getCurrentUser({ accessToken });
      const currentUser = _user.data as CurrentUser;
      const normalizedUser = normalizeCurrentUser(currentUser);

      setUser(normalizedUser);
      cached_user = normalizedUser;
    })();
  }, [authUserId, getAccessTokenSilently]);

  return user;
};
