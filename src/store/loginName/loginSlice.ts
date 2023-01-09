import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../services/request";

export const getUser = createAsyncThunk(
  "user/getUserStatus",
  async (userName: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/check_username?name=${userName}`);
    const data = await response.json();
    if (response.status === 200) {
      return data.username_exists;
    } else {
      return response.status;
    }
  }
);

export const getEmail = createAsyncThunk(
  "user/getEmailStatus",
  async (email: string): Promise<boolean> => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/check_email?email=${email}`
    );
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const data = await response.json();
    return data.email_exists;
  }
);

export const signUpSlice = createAsyncThunk(
  "users/signUpSliceStatus",
  async (value: {
    name: string, phone?: string, gender: string, email: string,
    birthday: string, password: string
  }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sign_up`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(value),
    });
    if (response.status !== 201) {
      return response.status;
    }
    const data = await response.json();
    return data;
  }
);

export const confirmTokenSlice = createAsyncThunk(
  "users/confirmTokenSliceStatus",
  async (value: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/sign_up/confirm_email?token=${value}`);
    if (response.status != 200) {
      return response.status;
    }
    const data = await response.json();
    return data;
  }
);

export const getLogin = createAsyncThunk(
  "user/getLoginStatus",
  async (val: { email: string, password: string }) => {
    const response =
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login?email=${val.email}&password=${val.password}`,
        {method: "POST"});
    const data = await response.json();
    if (response.status === 200) {
      return data.jwt;
    } else {
      return "";
    }
  }
);

export const sendPasswordResetLink = createAsyncThunk(
  "user/sendPasswordResetLinkStatus",
  async (email: string): Promise<boolean> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password/forgot`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email})
    });
    if (response.status !== 200) {
      return false;
    }
    return true;
  });

export const changePassword = createAsyncThunk(
  "user/changePasswordStatus",
  async (value: { token: string, password: string }): Promise<string> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password/reset`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: value.token, password: value.password})
    });
    if (response.status !== 200) {
      throw new Error(`Error code ${response.status}`);
    }
    const data = await response.json();
    return data.email_exists;
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserDataStatus",
  async (name: string) => {
    const response = await requestApi(`${process.env.REACT_APP_BACKEND_URL}/users/${name}`);
    const data = response.json();
    return data;
  }
);

export const editUserData = createAsyncThunk(
  "user/editUserDataStatus",
  async (items: { name: number | string, object: object }) => {
    const response = await requestApi(
      `${process.env.REACT_APP_BACKEND_URL}/users/${items.name}`, "PUT", items.object);
    const data = response.json();
    return data;
  }
);

export const editUserEmail = createAsyncThunk(
  "user/editUserEmailStatus",
  async (token: string) => {
    const response = await requestApi(
      `${process.env.REACT_APP_BACKEND_URL}/users/update_email?token=${token}`);
    const data = response.json();
    return data;
  }
);

export const sendUserCode = createAsyncThunk(
  "user/sendUserCodeStatus",
  async (verif: object) => {
    const response = await requestApi(
      `${process.env.REACT_APP_BACKEND_URL}/verify`, "POST", verif);
    const data = response.json();
    return data;
  }
);

export const uploadFile = createAsyncThunk(
  "user/uploadFileStatus",
  async (user: { name: string, file: FileList }) => {
    console.log(user.file[0])
    const formData = new FormData();
    formData.append("avatar", user.file[0]);
    const token = localStorage.getItem("JWT");
    const responce = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.name}`, {
      method: "PUT",
      headers: new Headers({"Authorization": `Bearer ${token}`}),
      body: formData,
    });
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

type Login = {
  updateAfterRequest: boolean;
  user: {
    id: number;
    name: string;
    phone: string;
    gender: string;
    description: string;
    email: string;
    avatar_url: string;
    birthday: string;
    password: string;
    created_at: string;
  };
  userToken: string;
  event: boolean;
  lookButton: boolean;
  isEmail: boolean | string;
  loading: boolean;
  isLogged: boolean;
  token: string;
};

const initialState: Login = {
  updateAfterRequest: false,
  user: {
    id: 0,
    name: "",
    description: "",
    email: "",
    avatar_url: "",
    phone: "",
    gender: "",
    birthday: "",
    password: "",
    created_at: "",
  },
  userToken: "",
  event: false,
  lookButton: false,
  isEmail: "",
  loading: false,
  isLogged: false,
  token: "",
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {resetUserData: (state) => {state.user = {
    id: 0,
    name: "",
    description: "",
    email: "",
    avatar_url: "",
    phone: "",
    gender: "",
    birthday: "",
    password: "",
    created_at: ""
  };},
  addToken: (state, action) => {
    state.token = action.payload;
  }},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLogged = action.payload;
      });
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.userToken = action.payload;
      state.loading = false;
      if (state.userToken) {
        localStorage.setItem("JWT", `${state.userToken}`);
      }
    });
    builder.addCase(getLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      state.isEmail = action.payload;
      state.loading = false;
    });
    builder.addCase(getEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpSlice.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signUpSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserData.fulfilled, (state) => {
      state.updateAfterRequest = !state.updateAfterRequest;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});

export const {addToken, resetUserData} = loginSlice.actions;
export default loginSlice.reducer;