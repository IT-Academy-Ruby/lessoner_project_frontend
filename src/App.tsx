import "./App.scss";
import {
  BrowserRouter, Link, Route, Routes
} from "react-router-dom";
import Body from "./components/body/Body";
import CodePage from "./pages/CodePage";
import {IntlProvider} from "react-intl";
import LoginPage from "./pages/LoginPage";
import Pages from "./components/Pages";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";
import TranslationHelpers from "./translations/translationHelpers";
import {addToken, confirmTokenSlice} from "./store/loginName/loginSlice";
import {useAppDispatch} from "./store/hooks";
import {useEffect, useState} from "react";
import getParameterValue from "./helpers/parseUrl";

function App(): JSX.Element {
  const [languageCode, setLanguageCode] = useState(
    TranslationHelpers.getCurrentLanguageCode()
  );
  const dispatch = useAppDispatch();
  const messages = TranslationHelpers.getLanguageMessages(languageCode);
  const url = window.location.href;
  let count = 1;

  useEffect(() => {
    const registrationToken = url.lastIndexOf("confirm_email?token=");
    const resetPasswordToken = url.lastIndexOf("reset_password?token=");
    if (registrationToken > 0 && count === 1) {
      const token = url.slice(url.lastIndexOf("token=") + 6);
      dispatch(confirmTokenSlice(token));
      window.location.href = "/user/sign_in"
      count++
    }
    if (registrationToken > 0 && count === 1) {
      const token = url.slice(url.lastIndexOf("token=") + 6)
      dispatch(addToken(token));
      window.location.href = "/user/sign_in/reset_password/new_password"
    }
  }, [count]);


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
            <Link to={"/login"}>
              Login
            </Link>
            <Link to={"/code"}>
              Code
            </Link>
            <Link to={"/resetPassword"}>
              ResetPassword
            </Link>
            <Link to={"/setNewPassword"}>
              SetNewPassword
            </Link>
            <Link to={"/RegPhoneNumberPage"}>
              PhoneNumberPage with Registration
            </Link>
            <Link to={"/AuthPhoneNumberPage"}>
              PhoneNumberPage with Autorization
            </Link>
            <Link to={"/firstRegistrationForm"}>
              FirstRegistrationForm
            </Link>
            <Link to={"/yourselfPage"}>
              YourselfPage
            </Link>
            <Link to={"/confirmReg"}>
              ConfirmReg
            </Link>
            <button onClick={signOut}>Not authorized</button>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;