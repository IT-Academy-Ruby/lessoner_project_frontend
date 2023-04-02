import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
      `${process.env.REACT_APP_BACKEND_URL}/check_email?email=${encodeURIComponent(email)}`
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
    const data = await response.json();
    return data;
  }
);

export const confirmTokenSlice = createAsyncThunk(
  "users/confirmTokenSliceStatus",
  async (value: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/sign_up/confirm_email?token=${value}`);
    const data = await response.json();
    return data;
  }
);

export const getLogin = createAsyncThunk(
  "user/getLoginStatus",
  async (val: { email: string, password: string }) => {
    const email = encodeURIComponent(val.email);
    const response =
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login?email=${email}&password=${val.password}`,
        {method: "POST"});
    const data = await response.json();
    return data;
  }
);

export const sendPasswordResetLink = createAsyncThunk(
  "user/sendPasswordResetLinkStatus",
  async (email: string): Promise<{ error: string, alert: string }> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password/forgot`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email})
    });
    const data = response.json();
    return data;
  });

export const changePassword = createAsyncThunk(
  "user/changePasswordStatus",
  async (value: {
    token: string, password: string
  }): Promise<{ status: string, error: string }> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password/reset`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: value.token, password: value.password})
    });
    const data = await response.json();
    return data;
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserDataStatus",
  async (name: string) => {
    const response = await requestApi(`${process.env.REACT_APP_BACKEND_URL}/users/${name}`);
    if (response.status === 401) {
      return false;
    } else {
      const data = response.json();
      return data;
    }
  }
);

export const editUserData = createAsyncThunk(
  "user/editUserDataStatus",
  async (items: { name: number | string, object: object }) => {
    const response = await requestApi(
      `${process.env.REACT_APP_BACKEND_URL}/users/${items.name}`, "PUT", items.object);
    if (response.status === 401) {
      return false;
    } else {
      const data = response.json();
      return data;
    }
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
    const formData = new FormData();
    formData.append("avatar", user.file[0]);
    const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
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
    errors?: [];
    error?: string;
    deliver?: string;
  };
  userToken: { error: string, jwt: string };
  checkEmail: { alert: string, error: string };
  responsePassword: { status: string, error: string };
  event: boolean;
  lookButton: boolean;
  isEmail: boolean | string;
  loading: boolean;
  isLogged: boolean;
  token: string;
};

const initialState: Login = {
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
    errors: [],
    error: "",
    deliver: "",
  },
  userToken: {error: "", jwt: ""},
  checkEmail: {alert: "", error: ""},
  responsePassword: {status: "", error: ""},
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
  reducers: {
    resetUserData: (state) => {
      state.user = {
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
      };
      state.loading = false;
      state.userToken.jwt = "";
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    clearError: (state) => {
      state.userToken.error = "";
      state.user.errors = undefined;
      state.user.deliver = undefined;
      state.user.error = undefined;
      state.checkEmail = {alert: "", error: ""};
      state.responsePassword = {status: "", error: ""};
    },
    clearIsEmail: (state) => {
      state.isEmail = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLogged = action.payload;
      });
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.userToken = action.payload;
      state.loading = false;
    });
    builder.addCase(getLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(confirmTokenSlice.fulfilled, (state, action) => {
      state.userToken = action.payload;
      state.loading = false;
    });
    builder.addCase(confirmTokenSlice.pending, (state) => {
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
      if (!action.payload) {
        state.user.error = "unregistered user";
      } else {
        state.user = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserData.fulfilled, (state, action) => {
      if (!action.payload) {
        state.user.error = "unregistered user";
      }
      else if (action.payload.error) {
        state.user.error = action.payload.error;
      }
      else if (action.payload) {
        state.user = action.payload;
        state.user.error = "";
      }
      else if (action.payload.deliver) {
        state.user.deliver = action.payload.deliver;
      }
      state.loading = false;
    });
    builder.addCase(editUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(sendPasswordResetLink.fulfilled, (state, action) => {
      state.checkEmail = action.payload;
      state.loading = false;
    });
    builder.addCase(sendPasswordResetLink.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.responsePassword = action.payload;
      state.loading = false;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
  }
});

export const {
  addToken, resetUserData, clearError, clearIsEmail
} = loginSlice.actions;
export default loginSlice.reducer;