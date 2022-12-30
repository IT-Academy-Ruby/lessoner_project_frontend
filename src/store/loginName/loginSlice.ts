import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BACKEND_URL} from "../../constants";
import requestApi from "../../services/request";

export const getLogin = createAsyncThunk(
  "user/getLoginStatus",
  async (value: { email: string, password: string }) => {
    const response =
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login?email=${value.email}&password=${value.password}`,
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
  "user/sendPasswordResetLink",
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
  async (items: { name: string, object: object }) => {
    const response = await requestApi(
      `${process.env.REACT_APP_BACKEND_URL}/users/${items.name}`, "PUT", items.object);
    const data = response.json();
    console.log(data)
    return data;
  }
);

export const uploadFile = createAsyncThunk(
  "user/uploadFileStatus",
  async (user: { name: string, file: FileList}) => {
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
  login: string;
  event: boolean;
  lookButton: boolean;
  notFound: boolean | string;
  isEmail: boolean | string,
  loading: boolean;
  updateAfterRequest: boolean;
  user: {
    "id": number;
    "name": string;
    "description": string;
    "email": string;
    "avatar_url": string;
    "phone": string;
    "gender": string;
    "birthday": string;
    "created_at": string;
  }
};

const initialState: Login = {
  login: "",
  event: false,
  lookButton: false,
  notFound: "",
  isEmail: "",
  loading: false,
  updateAfterRequest: false,
  user: {
    "id": 0,
    "name": "",
    "description": "",
    "email": "",
    "avatar_url": "",
    "phone": "",
    "gender": "",
    "birthday": "",
    "created_at": ""
  }
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
    closePopup: (state) => {
      state.notFound = "";
    },
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
    builder.addCase(sendPasswordResetLink.fulfilled, (state, action) => {
      state.notFound = action.payload;
      state.loading = false;
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      state.isEmail = action.payload;
      state.loading = false;
    });
    builder.addCase(getEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendPasswordResetLink.pending, (state) => {
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
    builder.addCase(uploadFile.fulfilled, (state,action) => {
      // state.updateAfterRequest = !state.updateAfterRequest;
     state.user = action.payload
    });
  }
});

export const {
  buttonEvent, changeEvent, lookEvent, closePopup
} = loginSlice.actions;
export default loginSlice.reducer;