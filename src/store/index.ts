import {configureStore} from "@reduxjs/toolkit";
import decodeReducer from "./header/decodeJwtSlice";
import headerReducer from "./header/headerSlice";
import loginReducer from "./loginName/loginSlice";
import useReducer from "./loginName/userSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: useReducer,
    value: headerReducer,
    userDecodeName: decodeReducer,
    userDecodeExp: decodeReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;