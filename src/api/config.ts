import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "~i18n";

import { getAuth } from "firebase/auth";
import { authentication } from "~api/user";
import app from "~firebase";
const auth = getAuth(app);

export const HOST_URL = new URL("http://192.168.1.146:5000");
export const URL_API = new URL("api", HOST_URL);
export const URL_IMAGE = new URL("image", HOST_URL);
export type ApiError = { codeError: number; name: string };

export async function getToken(): Promise<string> {
  const user = auth().currentUser;
  if (user == null) throw new Error("User not found");
  return await user.getIdToken();
}

export type MethodSendingData = "json" | "form-data";

export async function getHeader(options?: {
  json?: boolean;
  token?: boolean;
}): Promise<Headers> {
  const header = new Headers();
  header.set("appName", "Ecstasys");
  header.set("Accept-Language", i18n.language ?? "ru");
  if (options?.token ?? true) {
    header.set("authorization", await getToken());
  }
  if (options?.json ?? true) {
    header.set("Content-Type", "application/json");
  }
  return header;
}

export const enum AsyncStorageKey {
  MentalState = "@UserMentalState",
  ParamsMeditation = "@MeditationParameters",
  WeekStatistic = "@MeditationWeekStatistic",
  FavoriteMeditations = "@FavoriteMeditations",
}

export function serverRequest(request: Function) {
  try {
    request();
  } catch (error) {
    console.error(error);
    throw new Error(`Function Error`);
  }
}

export function removeUserData() {
  AsyncStorage.multiRemove([
    AsyncStorageKey.MentalState,
    AsyncStorageKey.ParamsMeditation,
    AsyncStorageKey.WeekStatistic,
  ]);
}
