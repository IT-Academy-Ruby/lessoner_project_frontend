import {createSlice} from "@reduxjs/toolkit";

type Header = {
  isDefaultHeader: boolean;
  page: string;
}

const initialState: Header = {
  isDefaultHeader: false,
  page: '',
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    showDefaultPage: (state) => {
      state.isDefaultHeader = false;
    },
    showStudentPage: state => {
      state.isDefaultHeader = true;
      state.page = '';
    },
    showSectionPage: (state) => {
      state.page = 'sectionPage';
    },
    showMyPage: (state) => {
      state.page = 'myPage';
    },

  }
})
export const {showDefaultPage, showStudentPage, showSectionPage, showMyPage} = headerSlice.actions;
export default headerSlice.reducer;