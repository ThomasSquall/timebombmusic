import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import { Splashscreen } from "components/core/Splashscreen";

interface AuthenticationGuardProps {
  component: ComponentType;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: Splashscreen,
  });

  return <Component />;
};

export default AuthenticationGuard;
