import { createContext, useEffect, useState } from "react";
import IUser from "../utils/types/user.types";
import React from "react";
import global_axios from "../global/axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import getAccessToken from "../actions/homeAction";

interface IAuthContext {
  isAuthenticated: boolean;
  message: string;
  status: number;
  token: string;
  logOut: () => Promise<void>;
}

const initialState: IAuthContext = {
  isAuthenticated: false,
  message: "",

  status: 0,
  token: "",
  logOut: async () => {},
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }: any) => {
  const { isAuthenticated: rs } = useSelector(
    (state: RootState) => state.authReducer
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    ContactNumber: "",
    Email: "",
    FirstName: "",
    Gender: "",
    Height: 0,
    LastName: " ",
    MiddleName: "",
    ProfilePic: "",
    UserID: 0,
    Username: "",
    Weight: 0,
    Age: 0,
    Password: "",
    ConfirmPassword: "",
  });

  const ACCESS_TOKEN = "accessToken";
  const logOut = async () => {
    // const accessTokenStored = await SecureStore.getItemAsync(ACCESS_TOKEN);

    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      global_axios.defaults.headers.common["Authorization"] = "";
      setIsAuthenticated(false);
      setMessage("log out successfully");
    } catch (err) {
      console.log("delete token error: ", err);
    }
  };

  useEffect(() => {
    const loadAccessToken = async () => {
      const accessTokenStored = await SecureStore.getItemAsync(ACCESS_TOKEN);
      // console.log("access token stored: ", accessTokenStored);
      if (accessTokenStored) {
        setToken(accessTokenStored);
        setIsAuthenticated(true);
        // global_axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${accessTokenStored}`;
      }
    };
    loadAccessToken();
  }, [rs]);

  // console.log("access token stored main apsss", token);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const res = await global_axios.get("/user/dashboard");

  //     const data = res.data;

  //     // console.log("run in auth context :0", data);
  //     setIsAuthenticated(data.isAuthenticated);
  //     setStatus(data.status);
  //     setMessage(data.message);
  //     setUser(data.payload);
  //   };
  //   loadUser();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ logOut, token, isAuthenticated, message, status }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
