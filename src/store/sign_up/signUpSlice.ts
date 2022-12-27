import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const signUpSlice = createAsyncThunk(
  "user/registration",
  async (value: { name: string, phone: string, gender: string, email: string, birthday: string, password: string }) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/sign_up`,
      {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(value)
      });
    const data = await response.json();
    console.log(data)
    return data;
  }
)

type User = {
  user: {
    id: number;
    name: string;
    phone: string;
    gender: string;
    email: string;
    birthday: string;
    password: string;
  }
}

const initialState: User = {
  user: {
    id: 0,
    name: "",
    phone: "",
    gender: "",
    email: "",
    birthday: "",
    password: "",
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpSlice.fulfilled, (state, action) => {
      state.user = action.payload;
    })
  }
})