import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./loginName/loginSlice";
import useReducer from "./loginName/userSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: useReducer,
  }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;