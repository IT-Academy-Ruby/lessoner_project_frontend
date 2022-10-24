import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./loginName/loginSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
  }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;