import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BACKEND_URL} from "../../constants";

export const getUser = createAsyncThunk(
  "user/getUserStatus",
  async (userName: string) => {
    const response = await fetch(`${BACKEND_URL}/check_username?name=${userName}`);
    const data = await response.json();
    if (response.status === 200) {
      return data.username_exists;
    } else {
      return response.status;
    }
  }
);

export const getLogin = createAsyncThunk(
  "user/getLoginStatus",
  async (value: { email: string, password: string }) => {
    const response = await fetch(
      `${BACKEND_URL}/login?email=${value.email}&password=${value.password}`,
      {method: "POST"});

    const data = await response.json();
    if (response.status === 200) {
      return data.jwt;
    } else {
      return "";
    }
  }
);

export const getEmail = createAsyncThunk(
  "user/getEmailStatus",
  async (email: string): Promise<boolean> => {
    const response = await fetch(
      `${BACKEND_URL}/check_email?email=${email}`
    );
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const data = await response.json();
    return data.email_exists;
  }
);

export const sendPasswordResetLink = createAsyncThunk(
  "user/sendPasswordResetLink",
  async (email: string): Promise<boolean> => {
    const response = await fetch(`${BACKEND_URL}/password/forgot`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email})
    });
    if (response.status !== 200) {
      return false;
    }
    return true;
  }
);

export const signUpSlice = createAsyncThunk(
  "users/signUpSliceStatus",
  async (value: { userName: string, phone?: string, gender: string, email: string, birthday: string, password: string }) => {
    const response = await fetch(
      `${BACKEND_URL}/sign_up`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(value)
      });
    console.log(response)
    console.log(value)
    if(response.status!==200){
      return response.status
    }
    const data = await response.json();
    console.log(data)
    return data;
  }
)


type Login = {
  user: {
    id: number;
    name: string;
    phone?: string;
    gender: string;
    email: string;
    birthday: string;
    password: string;
  };
  login: string;
  event: boolean;
  lookButton: boolean;
  isEmail: boolean | string;
  loading: boolean;
  isLogged: boolean;
};

const initialState: Login = {
  user: {
    id: 0,
    name: "",
    phone: "",
    gender: "",
    email: "",
    birthday: "",
    password: "",
  },
  login: "",
  event: false,
  lookButton: false,
  isEmail: "",
  loading: false,
  isLogged: false,
};

const loginSlice = createSlice({
  name: "user",
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLogged = action.payload;
      });
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
    builder.addCase(sendPasswordResetLink.fulfilled, (state, action) => {
      // state.notFound = action.payload;
      state.loading = false;
    });
    builder.addCase(sendPasswordResetLink.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      state.isEmail = action.payload;
      // state.loading = false;
    });
    // builder.addCase(getEmail.pending, (state) => {
    //   state.loading = true;
    // });
    builder.addCase(signUpSlice.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signUpSlice.pending, (state) => {
      state.loading = true;
    });
  }
});

export const {
  buttonEvent, changeEvent, lookEvent,
} = loginSlice.actions;
export default loginSlice.reducer;