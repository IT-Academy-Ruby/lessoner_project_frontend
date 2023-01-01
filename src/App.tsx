import "./App.scss";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import {addToken, confirmTokenSlice} from "./store/loginName/loginSlice";
import Body from "./components/body/Body";
import {useEffect, useState} from "react";
import FacebookButton from "./components/FacebookButton";
import GoogleButton from "./components/GoogleButton";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {IntlProvider} from "react-intl";
import Pages from "./components/Pages";
import { Snowfall } from "./components/Snowfall";
import TranslationHelpers from "./translations/translationHelpers";
import VKButton from "./components/VKButton";
import {useAppDispatch} from "./store/hooks";

function App(): JSX.Element {

  const [languageCode, setLanguageCode] = useState(
    TranslationHelpers.getCurrentLanguageCode()
  );

  const dispatch = useAppDispatch();
  const [opacity, setOpacity] = useState<number>(1);
  const [display, setDisplay] = useState<boolean>(true);

  const messages = TranslationHelpers.getLanguageMessages(languageCode);
  const url = window.location.href;
  const findTokenWordInURL = "token=";
  let controlRendering = 1;

  useEffect(() => {
    const registrationToken = url.lastIndexOf("confirm_email?token=");
    const resetPasswordToken = url.lastIndexOf("reset_password?token=");
    if (registrationToken > 0 && controlRendering === 1) {
      const token = url.slice(url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length);
      dispatch(confirmTokenSlice(token));
      window.location.href = "/user/sign_in";
      controlRendering++;
    }
    if (resetPasswordToken > 0 && controlRendering === 1) {
      const token = url.slice(url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length);
      dispatch(addToken(token));
      window.location.href = "/user/sign_in/reset_password/new_password";
      controlRendering++;
    }

  }, [controlRendering, dispatch, url]);

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <Snowfall setOpacity={setOpacity} setDisplay={setDisplay}/>
        <div className="App" style={{
          transition: "opacity 5s",
          opacity,
          display: display ? undefined : "none",
        }}>
          <Body onLanguageSwitch={setLanguageCode} languageCode={languageCode}/>
          <Routes>
            <Route
              path="/user/sign_up"
              element={<Pages pageType={"FirstRegistrationForm"}/>}/>
            <Route
              path="/user/reg_in/information"
              element={<Pages pageType={"YourselfPage"} registration={false}/>}/>
            <Route
              path="/user/reg_in/information/modR"
              element={<Pages pageType={"ConfirmReg"} registration={true}/>}/>
            <Route
              path="/user/sign_in/phone_numberR"
              element={<Pages pageType={"PhoneNumberPage"} registration={true}/>}/>
            <Route
              path="/user/sign_in/phone_numberR/code"
              element={<Pages pageType={"Code"} registration={true}/>}/>
            <Route
              path="/user/sign_in"
              element={<Pages pageType={"Login"}/>}/>
            <Route
              path="/user/sign_in/phone_numberA"
              element={<Pages pageType={"PhoneNumberPage"} registration={false}/>}/>
            <Route
              path="/user/sign_in/reset_password/reset"
              element={<Pages pageType={"ConfirmReg"} registration={false}/>}/>
            <Route
              path="/user/sign_in/phone_numberA/code"
              element={<Pages pageType={"Code"} registration={false}/>}/>
            <Route
              path="/user/sign_in/reset_password"
              element={<Pages pageType={"ResetPage"}/>}/>
            <Route
              path="/user/sign_in/reset_password/new_password"
              element={<Pages pageType={"SetNewPassword"}/>}/>
            <Route
              path="/user/google"
              element={<GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_ID}>
                <GoogleButton/>
              </GoogleOAuthProvider>}/>
            <Route
              path="/user/facebook"
              element={<FacebookButton/>}/>
            <Route
              path="/user/vk"
              element={<VKButton/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;