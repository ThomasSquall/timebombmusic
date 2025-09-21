import { CurrentUser } from "types/User";

export const normalizeCurrentUser = (user: CurrentUser): CurrentUser => {
  const impersonator = user.impersonator ?? null;
  const isImpersonating = Boolean(impersonator);

  return {
    ...user,
    impersonator,
    isImpersonating,
    is_admin: isImpersonating ? false : user.is_admin,
  };
};
