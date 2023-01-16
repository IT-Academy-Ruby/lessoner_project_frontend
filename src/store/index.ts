import categoriesReducer from "./categorySlice/categorySlice";
import {configureStore} from "@reduxjs/toolkit";
import decodeReducer from "./header/decodeJwtSlice";
import lessonsReducer from "./lessonSlice/lessonSlice";
import linksReducer from "./links/linksSlise";
import loginReducer from "./loginName/loginSlice";

const store = configureStore(
  {reducer: {
    login: loginReducer,
    dataUser: loginReducer,
    userDecodedName: decodeReducer,
    userDecodedExp: decodeReducer,
    link: linksReducer,
    categories: categoriesReducer,
    lessons:lessonsReducer,
  }}
);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;