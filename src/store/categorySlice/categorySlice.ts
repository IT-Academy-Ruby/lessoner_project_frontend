import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../services/request";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const responce = await request(`${process.env.REACT_APP_BACKEND_URL}/categories`);
    const data = await responce.json();
    if (responce.status === 200) {
      return data.records;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (dataCategory: { name: string, description: string, image: Blob | undefined }) => {
    const formData = new FormData();
    if (dataCategory.image) {
      formData.append("image", dataCategory.image);
    }
    formData.append("name", dataCategory.name);
    formData.append("description", dataCategory.description);
    const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      method: "POST",
      headers: new Headers({"Authorization": `Bearer ${token}`}),
      body: formData,
    });
    const data = await response.json();
    console.log(data)
    if (response.status === 200 || response.status === 422) {
      console.log(data)
      return data;
    } else {
      return `errror ${response.status}`;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/addCategory",
  async (id: number) => {
    const response =
      await request(`${process.env.REACT_APP_BACKEND_URL}/categories/${id}`, "DELETE");
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `errror ${response.status}`;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (dataCategory: {
    id: number, name: string, description: string, image: Blob | undefined | null | string,
  }) => {
    const formData = new FormData();
    if (dataCategory.image && typeof dataCategory.image !== "string") {
      formData.append("image", dataCategory.image);
    }
    formData.append("name", dataCategory.name);
    formData.append("description", dataCategory.description);
    const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
    const response =
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${dataCategory.id}`, {
        method: "PUT",
        headers: new Headers({"Authorization": `Bearer ${token}`}),
        body: formData,
      });
    const data = await response.json();
    if (response.status === 200 || response.status === 422) {
      return data;
    } else {
      return  `errror ${response.status}`;
    }
  }
);

export const archiveCategory = createAsyncThunk(
  "category/archiveCategory",
  async (value: { id: number, name?: string, description?: string, status?: string }) => {
    const category = {
      name: value.name,
      description: value.description,
      status: value.status === "active" ? "archived" : "active",
    };
    const responce =
      await request(`${process.env.REACT_APP_BACKEND_URL}/categories/${value.id}`, "PUT", category);
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      data.error = `errror ${responce.status}`;
      return data.error;
    }
  }
);

type Category = {
  amount_lessons: number;
  id: number;
  image_url: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  image_size: number;
  image_name: string;
  image_type: string;
};

type Categories = {
  categories: [Category];
  loading: boolean;
};

const initialState: Categories = {
  categories: [
    {
      amount_lessons: 0,
      image_url: "",
      id: 0,
      name: "",
      description: "",
      status: "",
      created_at: "",
      image_size: 0,
      image_name: "",
      image_type: "",
    }],
  loading: false
};

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