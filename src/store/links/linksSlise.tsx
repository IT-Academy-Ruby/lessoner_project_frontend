import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  link: "",
}
const linksSlise = createSlice({
  name: "links",
  initialState,
  reducers: {
    lessonerLink: state => {
      state.link = "/lessoner";
    },
    startLink: state => {
      state.link = "";
    }
  }
})
export const {lessonerLink, startLink} = linksSlise.actions;
export default linksSlise.reducer;
