import React, { FC, useEffect, useReducer } from "react";
import { Provider as ProviderRedux } from "react-redux";
import store from "~store/index";
import { editMood, authentication } from "~store/account";
import {
  addWeekStatic,
  editParametersMeditation,
  removeParametersMeditation,
  addFavoriteMeditation,
} from "~store/meditation";
import i18n, { LanguageApp } from "~i18n";
import style, { theme } from "~styles";
import { LoadingStatus, AuthenticationStatus } from "~constants";
import { getMood } from "~api/user";
import {
  getParametersMeditation,
  getWeekStatistic,
  getFavoriteMeditation,
} from "~api/meditation";
import Routes from "~routes/index";
import useAuthorization from "~hooks/useAuthorization";
import { Platform, UIManager } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
// if (__DEV__) {
//   connectToDevTools({
//     host: "localhost",
//     port: 8097,
//   });
// }

function useLoadingModule(): LoadingStatus {
  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "EditLanguage":
          state.languageApp = action.payload;
          state.statusLoadingModules.i18n = LoadingStatus.READY;
          break;
        case "EditTheme":
          state.statusLoadingModules.style = action.payload.result;
          break;
      }
      if (
        state.statusLoadingModules.style == LoadingStatus.READY &&
        state.statusLoadingModules.i18n == LoadingStatus.READY
      ) {
        state.appStatus = LoadingStatus.READY;
      }
      return { ...state };
    },
    {
      appStatus: LoadingStatus.NONE,
      statusLoadingModules: {
        i18n: LoadingStatus.NONE,
        style: LoadingStatus.NONE,
      },
    }
  );

  useEffect(() => {
    console.log("Loading Module");
    i18n.on(({ language }) => {
      dispatch({ type: "EditLanguage", payload: language });
    });
    style.on(({ loadingStatus }) => {
      dispatch({ type: "EditTheme", payload: { result: loadingStatus } });
    });
  }, [dispatch]);

  return state.appStatus;
}

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const AppCore: FC<Props> = (props) => {
  const moduleStatus = useLoadingModule();
  const { authenticationStatus, isRegistration } = useAuthorization();

  useEffect(() => {
    if (authenticationStatus == AuthenticationStatus.AUTHORIZED) {
      store.dispatch(authentication());
      getMood().then((mood) => {
        store.dispatch(editMood(mood));
      });
      getParametersMeditation().then((parameters) => {
        if (parameters[0] == "exist") {
          store.dispatch(editParametersMeditation(parameters[1]));
        } else {
          store.dispatch(removeParametersMeditation());
        }
      });
      getWeekStatistic().then((weekStatistic: WeekStatistic) => {
        store.dispatch(addWeekStatic(weekStatistic));
      });
      getFavoriteMeditation().then((FavoriteMeditation: string[]) =>
        store.dispatch(addFavoriteMeditation(FavoriteMeditation))
      );
    }
  }, [authenticationStatus]);

  useEffect(() => {
    if (
      authenticationStatus != AuthenticationStatus.NONE &&
      moduleStatus == LoadingStatus.READY
    ) {
      // SplashScreen.hideAsync();
    } else {
      // SplashScreen.preventAutoHideAsync();
    }
  }, [authenticationStatus, moduleStatus]);

  if (
    moduleStatus == LoadingStatus.READY &&
    authenticationStatus != AuthenticationStatus.NONE
  ) {
    return (
      <ProviderRedux store={store}>
        <PaperProvider theme={theme}>
          <Routes
            authenticationStatus={authenticationStatus}
            isRegistration={isRegistration}
          />
        </PaperProvider>
      </ProviderRedux>
    );
  }
  return null;
};

interface Props {}

interface State {
  appStatus: LoadingStatus;
  languageApp?: LanguageApp;
  statusLoadingModules: {
    i18n: LoadingStatus;
    style: LoadingStatus;
  };
}

type Action =
  | ActionReducerWithPayload<"EditLanguage", LanguageApp>
  | ActionReducerWithPayload<"EditTheme", { result: LoadingStatus }>;

export default AppCore;
