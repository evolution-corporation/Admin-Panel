import React, { FC } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import RootRoutes from "./Root";
import AuthorizationRoutes from "./Authorization";
import { LoadingStatus, AuthenticationStatus } from "~constants";

const Routes: FC<{
  authenticationStatus: AuthenticationStatus;
  isRegistration: boolean;
}> = ({ authenticationStatus, isRegistration }) => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      {authenticationStatus == AuthenticationStatus.NO_AUTHORIZED ? (
        <AuthorizationRoutes />
      ) : !isRegistration ? null : null}
    </NavigationContainer>
  );
};

export default Routes;
