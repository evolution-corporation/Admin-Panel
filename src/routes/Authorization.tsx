import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectMethodAuthorizationScreen from "~screens/SelectMethodAuthorization";

const AuthorizationStack =
  createNativeStackNavigator<AuthorizationStackParamList>();

const AuthorizationRoutes: FC<{}> = () => (
  <AuthorizationStack.Navigator
    screenOptions={{ headerShown: true, headerTransparent: true }}
  >
    <AuthorizationStack.Screen
      name={"SelectMethodAuthorization"}
      component={SelectMethodAuthorizationScreen}
    />
  </AuthorizationStack.Navigator>
);

export default AuthorizationRoutes;
