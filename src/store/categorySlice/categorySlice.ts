import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../services/request";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const responce = await request(`${process.env.REACT_APP_BACKEND_URL}/categories`);
    const data = await responce.json();
    if (responce.status === 200) {
      // const url = await fetch(data.image_url)
      // const file = await url.blob();
      // data.size_image = file.size;
      // data.type_image = file.type;
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

export const getBlob = createAsyncThunk(
  "category/getBlobStatus",
  async (url: string) => {
    const responce = await fetch("https://lessoner.s3.amazonaws.com/7ncg5put3swh2vsp0luyusm58s7b", {mode: "no-cors"});
    const file = await responce.blob();
    console.log(responce)
    if (responce.status === 200) {
      console.log(await file)
      return file;
    }
    console.log("oooo")
    // return initialState.urlBlob;
  }
)


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
    amount_lessons: number;
    id: number;
    image_url: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
    size_image: number;
    type_image: string;
  }],
  loading: boolean;

};

const initialState: Categories = {
  categories: [{
    amount_lessons: 0,
    image_url: "",
    id: 0,
    name: "",
    description: "",
    status: "",
    created_at: "",
    size_image: 0,
    type_image: "",
  }],
  loading: false,

};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
      // console.log(state.categories)
      state.loading = false;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    // builder.addCase(getBlob.fulfilled, (state, action) => {
    //   state.urlBlob = action.payload;
    // });
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