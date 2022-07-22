import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const RootStack = createNativeStackNavigator<RootStackParametersList>();

const RootRoutes: FC<{}> = () => (
  <RootStack.Navigator
    initialRouteName="TabNavigator"
    screenOptions={{
      animationTypeForReplace: "push",
      animation: "default",
      headerTransparent: true,
      headerShown: false,
    }}
  ></RootStack.Navigator>
);

export default RootRoutes;
