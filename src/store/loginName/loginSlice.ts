import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BACKEND_URL} from "../../constants";

export const getLogin = createAsyncThunk(
  'login/getLoginStatus',
  async (value: any) => {
    const response = await fetch(`${BACKEND_URL}/login?email=${value.email}&password=${value.password}`, {method:'POST'});
    const data = await response.json();
    if (response.status === 200) {
      return data.jwt;
    } else {
      return null;
    }
  }
)
type Login = {
  login: boolean;
}
const initialState: Login = {
  login: false,
}
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.login = action.payload;
      localStorage.setItem('JWT', `${state.login}`);
    })
  }
})
export default loginSlice.reducer;