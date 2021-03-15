import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { Action } from "redux";
import {
  actionAuthenticate,
  actionLoginSuccess,
  actionLoginFailed,
  // authenticate,
  // actionLogout,
} from "./actions";
import { serverLogin } from "../api";

export const SERVER_ERROR_MESSAGE =
  "Ошибка соединения с сервером. Проверьте параметры подключения к интернет.";

export const serverLoginThunk = ({
  email,
  password,
}: any): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(actionAuthenticate(email, password));
  const isLogin = await serverLogin({
    email,
    password,
  });

  console.log("isLogin = ", isLogin);

  if (isLogin?.data.token) {
    dispatch(actionLoginSuccess(isLogin?.data.token));
  } else {
    dispatch(actionLoginFailed(isLogin?.data.error));
  }
};
