import { Controllers } from "../../enums/Controllers";
import api, { handleError } from "../../services/api";
import AlertPopUp from "../../utils/AlertPopUp";
import { setUser } from "../slices/userSlice";
import { logout, storeToken } from "./TokenAction";
import { GET_PROFILE_ACTION, SET_PROFILE_ACTION } from "../const";

export function appSignupAction(data = null, close = null, callback = null) {
  return (dispatch, getState) => {
    api
      .add(Controllers.Auth, null, "SeekerSignUp", data)
      .then((response) => {
        AlertPopUp(
          response.status,
          response.message,
          "production",
          "appSignupAction"
        );
        close && close();
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      })
      .finally(() => {
        if (callback !== null && callback && typeof callback === "function") {
          callback();
        }
      });
  };
}
export function appLoginAction(data = null, close = null, callback = null) {
  return (dispatch, getState) => {
    api
      .add(Controllers.Auth, null, "SeekerSignIn", data)
      .then((response) => {
        const value = response.data;
        dispatch(storeToken(value)); // Store token in Redux and localStorage
        AlertPopUp(
          response.status,
          response.message,
          "production",
          "appSignupAction"
        );
        close && close();
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      })
      .finally(() => {
        if (callback !== null && callback && typeof callback === "function") {
          callback();
        }
      });
  };
}
export function appProfileAction(data = null) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.Auth, null, "GetUserProfile")
      .then((response) => {
        dispatch(setAppProfile(response.data?.user));
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      });
  };
}

export function appUpdateProfileAction(data = null) {
  return (dispatch, getState) => {
    api
      .update(Controllers.Auth, null, "ProfileUpdate", data)
      .then((response) => {
        dispatch(appProfileAction());
        AlertPopUp(
          response.status,
          response.message,
          "production",
          "appSignupAction"
        );
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      });
  };
}
export function appLogOutAction() {
  return (dispatch, getState) => {
    dispatch(logout()); // Clear token and reset state
  };
}
export const setAppProfile = (token) => {
  return {
    type: SET_PROFILE_ACTION,
    payload: token,
  };
};
