import categoriesReducer from "./categorySlice/categorySlice";
import {configureStore} from "@reduxjs/toolkit";
import headerReducer from "./header/headerSlice";
import loginReducer from "./loginName/loginSlice";
import useReducer from "./loginName/userSlice";

const store = configureStore(
  {reducer: {
    login: loginReducer,
    user: useReducer,
    value: headerReducer,
    categories: categoriesReducer,
  }}
);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;