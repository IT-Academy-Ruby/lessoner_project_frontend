import {createSlice} from "@reduxjs/toolkit";

type Header = {
  isDefaultHeader: boolean;
  page: string;
}

const initialState: Header = {
  isDefaultHeader: false,
  page: "",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    showDefaultPage: (state) => {
      state.isDefaultHeader = false;
    },
    showMainPage: (state) => {
      state.isDefaultHeader = true;
      state.page = "mainPage";
    },
    showSectionPage: (state) => {
      state.page = "sectionPage";
    },
    showMyPage: (state) => {
      state.page = "myPage";
    },

  }
});
export const {
  showDefaultPage, showMainPage, showSectionPage, showMyPage
} = headerSlice.actions;
export default headerSlice.reducer;