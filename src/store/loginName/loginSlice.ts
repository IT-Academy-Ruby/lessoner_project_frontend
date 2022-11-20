import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BACKEND_URL} from "../../constants";

export const getLogin = createAsyncThunk(
  "login/getLoginStatus",
  async (value: {email: string, password: string}) => {
    const response = await fetch(`${BACKEND_URL}/login?email=
    ${value.email}&password=${value.password}`, {method:"POST"});

    const data = await response.json();
    if (response.status === 200) {
      return data.jwt;
    } else {
      return "";
    }
  }
);
type Login = {
  login: string;
  event: boolean;
  lookButton: boolean;
  loading: boolean;
}
const initialState: Login = {
  login: "",
  event: false,
  lookButton: false,
  loading: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    buttonEvent: (state) => {
      state.event = true;
    },
    changeEvent: (state) => {
      state.event = false;
    },
    lookEvent: (state) => {
      state.lookButton = !state.lookButton;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.login = action.payload;
      state.loading = false;
      if (state.login) {
        localStorage.setItem("JWT", `${state.login}`);
      }
    });
    builder.addCase(getLogin.pending, (state) => {
      state.loading = true;
    });
  }
});
export const {
  buttonEvent, changeEvent, lookEvent
} = loginSlice.actions;
export default loginSlice.reducer;