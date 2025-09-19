import React from "react";
import Freshchat from "components/core/Freshchat";
import { useAuth } from "contexts/jwt-provider";
import { useNavigate } from "react-router-dom";

type LoginGuardProps = {
  children: React.ReactNode;
};

export const LoginGuard = ({
  children,
}: LoginGuardProps): React.ReactElement => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!isAuthenticated) {
    navigate("/login");
    return <></>;
  }

  return <><Freshchat isAuthenticated={isAuthenticated} />{children}</>;
};
export default LoginGuard;
