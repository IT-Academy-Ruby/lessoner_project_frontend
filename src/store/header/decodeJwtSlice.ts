import {createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

type DecodeJWT = {
  name: string;
  email: string;
  gender: string;
  birthday: string;
  phone: string;
  description: string | null;
  exp: number;
}

const initialState: DecodeJWT = {
  name: "",
  email: "",
  gender: "",
  birthday: "",
  phone: "",
  description: "",
  exp: 0,
}

const decode = () => {
  const token = localStorage.getItem("JWT");
  const todaySec = new Date().getTime() / 1000;
  if (token) {
    const decodeJWT: DecodeJWT = jwt_decode(token);
    const expDecode = decodeJWT.exp;
    if (todaySec <= expDecode) {
      return decodeJWT;
    } else {
      return initialState;
    }
  }
  return initialState;
}

const decodeJWTSlice = createSlice({
  name: "decodeJWT",
  initialState,
  reducers: {
    nameDecodeUser: (state) => {
      state.name = decode().name;
    },
    emailDecodeUser: (state) => {
      state.email = decode().email;
    },
    phoneDecodeUser: (state) => {
      state.phone = decode().phone;
    },
    genderDecodeUser: (state) => {
      state.gender = decode().gender;
    },
    birthdayDecodeUser: (state) => {
      state.birthday = decode().birthday;
    },
    descriptionDecodeUser: (state) => {
      state.description = decode().description;
    },
    expDecodeUser: (state) => {
      state.exp = decode().exp;
    },

  },
})

export const {
  nameDecodeUser,
  emailDecodeUser,
  phoneDecodeUser,
  genderDecodeUser,
  birthdayDecodeUser,
  expDecodeUser,
  descriptionDecodeUser
} = decodeJWTSlice.actions;
export default decodeJWTSlice.reducer;

