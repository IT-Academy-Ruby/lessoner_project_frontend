import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BACKEND_URL} from "../../constants";

export const getUser = createAsyncThunk(
  "user/getUserStatus",
  async (userName: string) => {
    const response = await fetch(`${BACKEND_URL}/en/check_username?name=${userName}`);
    const data = await response.json();

    if (response.status === 200) {
      return data.usernameExists;
    } else {
      return null;
    }
  }
);

type User = {
  isLogged: boolean;
}
const initialState: User = {isLogged: false,};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLogged = action.payload;
      });
  }
});
export default userSlice.reducer;
