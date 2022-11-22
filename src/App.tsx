import "./App.css";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import {
  showDefaultPage, showMyPage, showSectionPage, showStudentPage
} from "./store/header/headerSlice";
import Body from "./components/body/Body";
import CodePage from "./pages/CodePage";
import FirstRegistrationForm from "./components/FirstRegistrationForm";
import { IntlProvider } from "react-intl";
import LoginPage from "./pages/LoginPage";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Search from "./components/Search";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";
import TranslationHelpers from "./translations/translationHelpers";
import {useAppDispatch} from "./store/hooks";
import {useState} from "react";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [languageCode, setLanguageCode] = useState(TranslationHelpers.getCurrentLanguageCode());
  const messages = TranslationHelpers.getLanguageMessages(languageCode);

  const signOut = () => {
    dispatch(showDefaultPage());
    localStorage.setItem("JWT", "");
  };

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Body onLanguageSwitch={setLanguageCode} />
          <Routes>
            <Route path="/users/sign_in" element={<LoginPage />} />
            <Route path="/users/sign_up" element={<FirstRegistrationForm />} />
            <Route path="/users/sign_in/phone_number" element={<PhoneNumberPage />} />
            <Route path="/users/sign_in/phone_number/code" element={<CodePage />} />
            <Route path="/search" element={<Search />} />
            <Route path='/users/sign_in/reset_password' element={<ResetPasswordPage />} />
            <Route path='/users/sign_in/reset_password/new_password'
            element={<SetNewPasswordPage />} />
          </Routes>
          <div style={{display: "flex", flexDirection: "column"}}>
            <button onClick={signOut}>Not authorized</button>
            <button onClick={() => dispatch(showStudentPage())}>
              Authorized student in study section
            </button>
            <button onClick={() => dispatch(showSectionPage())}>
              Authorized student/creator in study section
            </button>
            <button onClick={() => dispatch(showMyPage())}>
              Authorized creator in my studio section
            </button>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
