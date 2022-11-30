import {createSlice} from "@reduxjs/toolkit";

const initialState = {lessoner: ""};
const linksSlise = createSlice({
  name: "links",
  initialState,
  reducers: {lessonerLink: state => {state.lessoner = "/lessoner";},
    startLink: state => {
      state.lessoner = "";
    }}
});
export const {lessonerLink, startLink} = linksSlise.actions;
export default linksSlise.reducer;
