import {createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

type UserSession = {
  name: string;
  email: string;
  gender: string;
  birthday: string;
  phone: string;
  description: string | null;
  exp: number;
}

const initialState: UserSession = {
  name: "",
  email: "",
  gender: "",
  birthday: "",
  phone: "",
  description: "",
  exp: 0,
};

const decode = () => {
  const token = localStorage.getItem("JWT");
  const todaySec = new Date().getTime() / 1000;
  if (token) {
    const sessionJWT: UserSession = jwt_decode(token);
    const expDecoded = sessionJWT.exp;
    if (todaySec <= expDecoded) {
      return sessionJWT;
    } else {
      return initialState;
    }
  }
  return initialState;
};

const sessionJWTSlice = createSlice({
  name: "sessionJWT",
  initialState,
  reducers: {
    nameDecodedUser: (state) => {
      state.name = decode().name;
    },
    emailDecodedUser: (state) => {
      state.email = decode().email;
    },
    phoneDecodedUser: (state) => {
      state.phone = decode().phone;
    },
    genderDecodedUser: (state) => {
      state.gender = decode().gender;
    },
    birthdayDecodedUser: (state) => {
      state.birthday = decode().birthday;
    },
    descriptionDecodedUser: (state) => {
      state.description = decode().description;
    },
    expDecodedUser: (state) => {
      state.exp = decode().exp;
    },

  },
});

export const {
  nameDecodedUser,
  emailDecodedUser,
  phoneDecodedUser,
  genderDecodedUser,
  birthdayDecodedUser,
  expDecodedUser,
  descriptionDecodedUser
} = sessionJWTSlice.actions;
export default sessionJWTSlice.reducer;