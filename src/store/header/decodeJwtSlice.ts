import {createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

type UserSession = {
  session: {
    name: string;
    email: string;
    gender: string;
    birthday: string;
    phone: string;
    description: string;
    exp: number;
    admin: boolean;
  };
};

const initialState: UserSession = {session: {
  name: "",
  email: "",
  gender: "",
  birthday: "",
  phone: "",
  description: "",
  exp: 0,
  admin: false,
}};

const decode = () => {
  const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
  const todaySec = Date.now() / 1000;
  if (token) {
    const sessionJWT: UserSession = {session: jwt_decode(token)};
    if (todaySec <= sessionJWT.session.exp) {
      return sessionJWT.session;
    }
  }
  return initialState.session;
};

const sessionJWTSlice = createSlice({
  name: "sessionJWT",
  initialState,
  reducers:
      {nameDecodedUser: (state) => {
        state.session = decode();
      },
      resetDecodeUser: (state) => {
        state.session = {
          name: "",
          email: "",
          gender: "",
          birthday: "",
          phone: "",
          description: "",
          exp: 0,
          admin: false,
        };
      }},
}
);

export const {nameDecodedUser, resetDecodeUser} = sessionJWTSlice.actions;
export default sessionJWTSlice.reducer;
