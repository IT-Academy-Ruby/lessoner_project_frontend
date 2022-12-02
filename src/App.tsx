import "./App.css";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import {
  showDefaultPage, showMyPage, showSectionPage, showStudentPage
} from "./store/header/headerSlice";
import Body from "./components/body/Body";
import CodePage from "./pages/CodePage";
import { IntlProvider } from "react-intl"; 
import LoginPage from "./pages/LoginPage";
import {Link} from "react-router-dom";
import Pages  from "./components/Pages";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Search from "./components/Search";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";
import TranslationHelpers from "./translations/translationHelpers";
import YourselfPage from "./pages/YourselfPage";
import { useAppDispatch } from "./store/hooks";
import { useState } from "react";


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [languageCode, setLanguageCode] = useState(TranslationHelpers.getCurrentLanguageCode());
  const messages = TranslationHelpers.getLanguageMessages(languageCode);
  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Body onLanguageSwitch={setLanguageCode} />
          <Routes>
            <Route path="/users/sign_in" element={<LoginPage />} />
            <Route path="/login" element={<Pages pageType={"Login"}/>}/>
            <Route path="/code" element={<Pages pageType={"Code"}/>}/>
            <Route path="/resetPassword" element={<Pages pageType={"ResetPage"}/>}/>
            <Route path="/setNewPassword" element={<Pages pageType={"SetNewPassword"}/>}/>
            <Route path="/RegPhoneNumberPage" element={<Pages pageType={"PhoneNumberPage"} registration={true}/>}/>
            <Route path="/AuthPhoneNumberPage" element={<Pages pageType={"PhoneNumberPage"} registration={false}/>}/>
            <Route path="/confirmReg" element={<Pages pageType={"ConfirmReg"}/>}/>
            <Route path="/firstRegistrationForm" element={<Pages pageType={"FirstRegistrationForm"}/>}/>
            <Route path="/yourselfPage" element={<Pages pageType={"YourselfPage"}/>}/>
            <Route path="/users/sign_in/phone_number" element={<PhoneNumberPage registration={false}/>} />
            <Route path="/users/sign_in/phone_number/code" element={<CodePage />} />
            <Route path="/search" element={<Search />} />
            <Route path='/users/sign_in/reset_password' element={<ResetPasswordPage />} />
            <Route path='/users/sign_in/reset_password/new_password'
              element={<SetNewPasswordPage />} />
          </Routes>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link to={"/login"} >
            Login
            </Link>
            <Link to={"/code"} >
              Code
            </Link>
            <Link to={"/resetPassword"} >
              ResetPassword
            </Link>
            <Link to={"/setNewPassword"} >
              SetNewPassword
            </Link>
            <Link to={"/RegPhoneNumberPage"} >
              PhoneNumberPage with Registration
            </Link>
            <Link to={"/AuthPhoneNumberPage"}>
            PhoneNumberPage with Autorization
          </Link>
            <Link to={"/firstRegistrationForm"} >
              FirstRegistrationForm
            </Link>
            <Link to={"/yourselfPage"} >
              YourselfPage
            </Link>
            <Link to={"/confirmReg"} >
              ConfirmReg
            </Link>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;