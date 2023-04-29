import http from "axios.config";
import { IUser } from "types/interfaces";

const ACCESS_TOKEN_EXPIRATION_TIME = 3600 * 1000; // one hour expiration
const REFRESH_TOKEN_EXPIRATION_TIME = 3600 * 1000 * 24; // one day expiration

export const setTimeStamp = () => {
   if (typeof window !== "undefined") {
      window.localStorage.setItem("token_timestamp", "" + Date.now());
   }
};

const getTimeStamp = () => {
   if (typeof window !== "undefined") {
      const timestamp: number = Number(window.localStorage.getItem("token_timestamp"));

      return timestamp;
   }
};

export const refreshToken = async () => {
   if (typeof window !== "undefined") {
      if (Date.now() - getTimeStamp()! > REFRESH_TOKEN_EXPIRATION_TIME) {
         window.localStorage.removeItem("token");
         window.localStorage.removeItem("token_timestamp");
         console.error("Refresh token expired. Redirecting to Login page....");
         window.location.replace("login");
      } else {
         try {
            const { data } = await http.post("/auth/token/refresh/", {
               refresh: getRefreshToken(),
            });
            const { access } = data;
            localStorage.setItem(
               "token",
               JSON.stringify({
                  access_token: access,
                  refresh_token: getRefreshToken(),
               })
            );
            setTimeStamp();
            window.location.reload();
            return;
         } catch (e) {
            console.error(e);
         }
      }
   }
};

export const getToken = () => {
   if (typeof window !== "undefined") {
      const token = JSON.parse(`${window.localStorage.getItem("token")}`);
      return token?.access_token;
   }
};

export const getAccessToken = () => {
   if (typeof window !== "undefined") {
      const localAccessToken = getToken();

      if (getTimeStamp() !== undefined && getTimeStamp() !== 0) {
         if (Date.now() - getTimeStamp()! > ACCESS_TOKEN_EXPIRATION_TIME) {
            console.warn("Access token expired. Refreshing...");
            refreshToken();
         }
      }
      return localAccessToken;
   }
};

export const getRefreshToken = () => {
   if (typeof window !== "undefined") {
      const token = JSON.parse(`${window.localStorage.getItem("token")}`);
      return token?.refresh_token;
   }
};

export const addUserToLocalStorage = (user: IUser) => {
   localStorage.setItem(
      "token",
      JSON.stringify({
         access_token: user.access_token,
         refresh_token: user.refresh_token,
         user: user,
         user_type: user.is_student ? "student" : user.is_teacher ? "teacher" : user.is_parent ? "parent" : "",
      })
   );
   setTimeStamp();
};

export const getUserFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem("token") as string)?.user;
};
