import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../services/request";

export const getLessons = createAsyncThunk(
  "lesson/getLessons",
  async (value: {
    myStudio?: boolean,
    page: number,
    category?: number,
    sortValue?: string,
    perPage: number,
    status?: string
  }) => {
    const category = value.category ? `&category_id=${value.category}` : null;
    const sort = value.sortValue ? `&sort_field=${value.sortValue}` : null;
    const myStudio = value.myStudio ? "my_studio/lessons" : "lessons";
    const status = `&status=${value.status}&`;
    /*eslint-disable-next-line max-len */
    const response = await request(`${process.env.REACT_APP_BACKEND_URL}/${myStudio}?page=${value.page}&items=${value.perPage}?${category}${sort}${status}`);
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
    if (response.status === 401) {
      return false;
    }
  }
);

export const getLesson = createAsyncThunk(
  "lessons/getLesson",
  async (id: string | undefined) => {
    const response = await request(`${process.env.REACT_APP_BACKEND_URL}/lessons/${id}`);
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
    if (response.status === 401) {
      return false;
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
    const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lessons`, {
      method: "POST",
      headers: new Headers({"Authorization": `Bearer ${token}`}),
      body: formData,
    });
    const data = response.json();
    return data;
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/updateLesson",
  async (userLesson: {
    id: number | string | undefined,
    title?: string,
    description?: string,
    lesson_video?: Blob | null | undefined | string,
    category_id?: string,
    author_id?: string,
    lesson_image?: Blob | null | undefined | string,
    rating?: string,
  }) => {
    const formData = new FormData();
    if (userLesson.title) {
      formData.append("title", userLesson.title);
    }
    if (userLesson.description) {
      formData.append("description", userLesson.description);
    }
    if (userLesson.category_id) {
      formData.append("category_id", userLesson.category_id);
    }
    if (userLesson.author_id) {
      formData.append("author_id", userLesson.author_id);
    }
    if (userLesson.lesson_image) {
      if (typeof userLesson.lesson_image !== "string") {
        /* eslint-disable-next-line */
        formData.append("lesson_image", userLesson.lesson_image!);
      }
    }
    if (userLesson.lesson_video) {
      if (typeof userLesson.lesson_video === "string") {
        /* eslint-disable-next-line */
        formData.append("video_link", userLesson.lesson_video);
      } else {
        /* eslint-disable-next-line */
        formData.append("lesson_video", userLesson.lesson_video!);
      }
    }
    const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lessons/${userLesson.id}`, {
      method: "PUT",
      headers: new Headers({"Authorization": `Bearer ${token}`}),
      body: formData,
    });
    const data = response.json();
    return data;
  }
);

export const updateRating = createAsyncThunk(
  "lesson/updateRating",
  async (lesson: { id: number | string | undefined, rating: string }) => {
    const formData = new FormData();
    if (lesson.rating) {
      formData.append("rating", lesson.rating);
    }
    const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lessons/${lesson.id}`, {
      method: "PUT",
      headers: new Headers({"Authorization": `Bearer ${token}`}),
      body: formData,
    });
    if (response.status === 403) {
      return false;
    } else {
      const data = response.json();
      return data;
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lesson/deleteLesson",
  async (id: number) => {
    const response =
      await request(`${process.env.REACT_APP_BACKEND_URL}/lessons/${id}`, "DELETE");
    const data = response.json();
    return data;
  }
);

export const addLessonView = createAsyncThunk(
  "lesson/addLessonView",
  async (id: number) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add_lesson_view`, {
      method: "POST",
      headers: {"Content-Type": "application/json;charset=utf-8"},
      body: JSON.stringify({lesson_id: id})
    });
    const data = await response.json();
    return data;
  }
);

type Lesson = {
  author_avatar_url: string;
  id: number;
  title: string;
  author_name: string;
  description: string;
  video_link: string;
  status: string | number;
  author_id: number;
  category_id: number;
  rating: number;
  user_rating?: number;
  created_at: string;
  views_count: number;
  image_size: number;
  image_name: string;
  image_link: string;
  votes_count: number;
  error?: string;
}
type Lessons = {
  records: Lesson[],
  pagy_metadata: {
    page: number;
    per_page: number;
    count_pages: number;
  };
  error: string;
  lesson: Lesson;
  loading: boolean;
  skeleton: boolean;
};

let lessons: Lesson[] = [{
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
  views_count: 0,
  votes_count: 0,
  error: "",
}];
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
      views_count: 0,
      votes_count: 0,
      error: "",
    }
  ],
  pagy_metadata: {
    page: 0,
    per_page: 0,
    count_pages: 0,
  },
  error: "",
  lesson: {
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
    user_rating: 0,
    status: "",
    title: "",
    video_link: "",
    views_count: 0,
    votes_count: 0,
    error: "",
  },
  loading: false,
  skeleton: false
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    resetLessons: (state) => {
      state.records = [
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
          views_count: 0,
          votes_count: 0,
          error: "",
        }
      ];
    },
    resetLesson: (state) => {
      state.lesson = {
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
        user_rating: 0,
        status: "",
        title: "",
        video_link: "",
        views_count: 0,
        votes_count: 0,
        error: "",
      };
    },
    resetError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLessons.fulfilled, (state, action) => {
      if (!action.payload) {
        state.error = "Error: 401";
      }
      if (action.payload) {
        if (action.payload.pagy_metadata.page === 1) {
          lessons = action.payload.records;
        }
        if (action.payload.pagy_metadata.page !== 1) {
          lessons = [...lessons, ...action.payload.records];
        }
        state.pagy_metadata = action.payload.pagy_metadata;
        state.records = lessons;
        state.skeleton = false;
      }
    });
    builder.addCase(getLessons.pending, (state, action) => {
      state.skeleton = true;
    });
    builder.addCase(getLesson.fulfilled, (state, action) => {
      state.lesson = action.payload;
      state.loading = false;
    });
    builder.addCase(getLesson.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVideo.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = false;
    });
    builder.addCase(addVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateLesson.fulfilled, (state, action) => {
      state.lesson = action.payload;
      state.loading = false;
    });
    builder.addCase(updateLesson.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRating.fulfilled, (state, action) => {
      //     state.lesson = action.payload;
      if (!action.payload) {
        state.error = "Error: 401";
      }
    })
    builder.addCase(deleteLesson.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteLesson.pending, (state) => {
      state.loading = true;
    });
  }
});

export const {resetLessons, resetLesson, resetError} = lessonSlice.actions;
export default lessonSlice.reducer;

