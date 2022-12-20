import "./App.scss";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import {addToken, confirmTokenSlice} from "./store/loginName/loginSlice";
import {useEffect, useState} from "react";
import Body from "./components/body/Body";
import {IntlProvider} from "react-intl";
import Pages from "./components/Pages";
import TranslationHelpers from "./translations/translationHelpers";
import {useAppDispatch} from "./store/hooks";

function App(): JSX.Element {
  const [languageCode, setLanguageCode] = useState(
    TranslationHelpers.getCurrentLanguageCode()
  );
  const dispatch = useAppDispatch();
  const messages = TranslationHelpers.getLanguageMessages(languageCode);
  const url = window.location.href;
  const findTokenWordInURL="token=";
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

  }, [controlRendering,dispatch,url]);

  const signOut = () => {
    localStorage.setItem("JWT", "");
  };

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Body onLanguageSwitch={setLanguageCode}/>
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
          </Routes>
          <div style={{display: "flex", flexDirection: "column"}}>
            <button onClick={signOut}>Not authorized</button>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;