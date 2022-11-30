import {configureStore} from "@reduxjs/toolkit";
import decodeReducer from "./header/decodeJwtSlice";
import headerReducer from "./header/headerSlice";
import linksReducer from "./links/linksSlise";
import loginReducer from "./loginName/loginSlice";
import userReducer from "./loginName/userSlice";

const store = configureStore(
  { reducer: {
    login: loginReducer,
    user: userReducer,
    value: headerReducer,
    userDecodedName: decodeReducer,
    userDecodedExp: decodeReducer,
    link: linksReducer,
  }}
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;