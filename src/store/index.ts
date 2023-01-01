import categoriesReducer from "./categorySlice/categorySlice";
import {configureStore} from "@reduxjs/toolkit";
import decodeReducer from "./header/decodeJwtSlice";
import headerReducer from "./header/headerSlice";
import linksReducer from "./links/linksSlise";
import loginReducer from "./loginName/loginSlice";
import userDataReducer from "./sign_up/signUpSlice";

const store = configureStore(
  {
    reducer: {
      login: loginReducer,
      user: loginReducer,
      value: headerReducer,
      userDecodedName: decodeReducer,
      userDecodedExp: decodeReducer,
      link: linksReducer,
      categories: categoriesReducer,
      userData: loginReducer,
    }
  }
);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;