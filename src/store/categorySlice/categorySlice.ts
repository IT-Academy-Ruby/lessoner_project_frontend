import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../services/request";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const responce = await request(`${process.env.REACT_APP_BACKEND_URL}/categories`);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (value: { name: string, description: string, status: string }) => {
    const responce =
      await request(`${process.env.REACT_APP_BACKEND_URL}/categories`, "POST", value);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (value: { id: number, name: string, description: string, status: string }) => {
    const category = {
      name: value.name,
      description: value.description,
      status: value.status,
    };
    const responce =
      await request(`${process.env.REACT_APP_BACKEND_URL}/categories/${value.id}`, "PUT", category);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

export const archiveCategory = createAsyncThunk(
  "category/archiveCategory",
  async (value: { id: number, name?: string, description?: string, status?: string }) => {
    const category = {
      name: value.name,
      description: value.description,
      status: value.status === "active" ? "archived" : "active"
    };
    const responce =
      await request(`${process.env.REACT_APP_BACKEND_URL}/categories/${value.id}`, "PUT", category);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

type Categories = {
  categories: [{
    id: number,
    name: string,
    description: string,
    status: string,
    created_at: string,
    amount_lessons: number,
  }],
  loading: boolean
};

const initialState: Categories = { categories: [
  {
    id: 0,
    name: "",
    description: "",
    status: "",
    created_at: "",
    amount_lessons: 0,
  }],
loading: false, };

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(archiveCategory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(archiveCategory.pending, (state) => {
      state.loading = true;
    });
  }
});
export default categorySlice.reducer;