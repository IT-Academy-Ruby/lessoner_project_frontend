import {createSlice} from "@reduxjs/toolkit";

type DataModal = {
  data: {
    text: string;
    isOpen: boolean;
    urlNavigate?: string;
    typeModal?: boolean;
  }
}

const initialState: DataModal = {data: {
  text: "",
  isOpen: false,
  urlNavigate: "",
  typeModal: undefined,
}};

const uploadDataSlice = createSlice({
  name: "uploadData",
  initialState,
  reducers: {uploadModalData: (state, action) => {
    state.data = action.payload;
  }},
});

export const {uploadModalData} = uploadDataSlice.actions;
export default uploadDataSlice.reducer;