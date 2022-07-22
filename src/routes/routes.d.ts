declare type AuthorizationStackParamList = {
  SelectMethodAuthorization: undefined;
};

declare type AuthorizationStackScreenProps<
  T extends keyof AuthorizationStackParamList
> = StackScreenProps<AuthorizationStackParamList, T>;

declare type RootStackParametersList = {};

declare type RootStackScreenProps<T extends keyof RootStackParametersList> =
  StackScreenProps<RootStackParametersList, T>;
