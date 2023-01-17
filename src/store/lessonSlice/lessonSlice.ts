import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../services/request";

export const getLessons = createAsyncThunk(
  "lesson/getLessons",
  async () => {
    const responce = await request(`${process.env.REACT_APP_BACKEND_URL}/lessons`);
    const data = await responce.json();
    if (responce.status === 200) {
      return data.records;
    } else {
      return `errror ${responce.status}`;
    }
  }
);

export const addVideo = createAsyncThunk(
  "lesson/addVideo",
  async (userLesson: {
    title: string,
    description: string,
    lesson_video: Blob | string,
    category_id: string,
    author_id: string,
    lesson_image: Blob | string,
  }) => {
    const formData = new FormData();
    formData.append("title", userLesson.title);
    formData.append("description", userLesson.description);
    formData.append("category_id", userLesson.category_id);
    formData.append("author_id", userLesson.author_id);
    formData.append("lesson_image", userLesson.lesson_image);
    if (typeof userLesson.lesson_video === "string") {
      formData.append("video_link", userLesson.lesson_video);
    } else {
      formData.append("lesson_video", userLesson.lesson_video);
    }

    const token = localStorage.getItem("JWT");
    const responce = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lessons`, {
      method: "POST",
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

export const updateLesson = createAsyncThunk(
  "lesson/updateLesson",
  async (userLesson: {
    id: number,
    title: string,
    description: string,
    lesson_video: Blob | null | undefined | string,
    category_id: string,
    author_id: string,
    lesson_image: Blob | null | undefined | string,
  }) => {
    const formData = new FormData();
    formData.append("title", userLesson.title);
    formData.append("description", userLesson.description);
    formData.append("category_id", userLesson.category_id);
    formData.append("author_id", userLesson.author_id);
    if (typeof userLesson.lesson_image !== "string") {
      /* eslint-disable-next-line */
      formData.append("lesson_image", userLesson.lesson_image!);
    }
    if (typeof userLesson.lesson_video === "string") {
      /* eslint-disable-next-line */
      formData.append("video_link", userLesson.lesson_video);
    } else {
      /* eslint-disable-next-line */
      formData.append("lesson_video", userLesson.lesson_video!);
    }

    const token = localStorage.getItem("JWT");
    const responce = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lessons/${userLesson.id}`, {
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

export const deleteLesson = createAsyncThunk(
  "category/addCategory",
  async (id: number) => {
    const responce =
      await request(`${process.env.REACT_APP_BACKEND_URL}/lessons/${id}`, "DELETE");
    const data = await responce.json();
    if (responce.status === 200) {
      return data;
    } else {
      return `errror ${responce.status}`;
    }
  }
);


type Lessons = {
  records: [
    {
      author_avatar_url: string;
      id: number;
      title: string;
      author_name: string;
      description: string;
      video_link: string;
      status: string;
      author_id: number;
      category_id: number;
      rating: number;
      created_at: string;
      views_count: number | null;
      image_size: number;
      image_name: string;
      image_link: string;
      votes_count: number;
    }
  ],
  pagy_metadata: {
    page: number;
    per_page: number;
    count_pages: number;
  };
  loading: boolean;
};

const initialState: Lessons = {
  records: [
    {
      author_avatar_url: "",
      author_id: 0,
      author_name: "",
      category_id: 0,
      created_at: "",
      description: "",
      id: 0,
      image_link: "",
      image_name: "",
      image_size: 0,
      rating: 0,
      status: "",
      title: "",
      video_link: "",
      views_count: null,
      votes_count: 0,
    }
  ],
  pagy_metadata: {
    page: 0,
    per_page: 0,
    count_pages: 0,
  },
  loading: false
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLessons.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = false;
    });
    builder.addCase(getLessons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVideo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateLesson.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateLesson.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteLesson.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteLesson.pending, (state) => {
      state.loading = true;
    });
  }
});

export default lessonSlice.reducer;

