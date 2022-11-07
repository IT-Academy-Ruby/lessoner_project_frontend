import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/body/Body";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import LoginPage from "./pages/LoginPage";
import FirstRegistrationForm from "./components/FirstRegistrationForm";
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import TranslationHelpers from './components/translations/translationHelpers';
import { useAppDispatch } from "./store/hooks";
import { showDefaultPage, showStudentPage, showSectionPage, showMyPage } from "./store/header/headerSlice";
import Search from "./components/Search";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SetNewPasswordPage from "./pages/SetNewPasswordPage";

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
            <Route path='/users/sign_in' element={<LoginPage />} />
            <Route path='/users/sign_in/phone_number' element={<PhoneNumberPage />} />
            <Route path='/users/sign_up' element={<FirstRegistrationForm />} />
            <Route path='/users/sign_in/reset_password' element={<ResetPasswordPage />} />
            <Route path='/users/sign_in/reset_password/new_password' element={<SetNewPasswordPage />} />
            <Route path='/search' element={<Search />} />
          </Routes>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => dispatch(showDefaultPage())}>Not authorized</button>
            <button onClick={() => dispatch(showStudentPage())}>Authorized student in study section</button>
            <button onClick={() => dispatch(showSectionPage())}>Authorized student/creator in study section</button>
            <button onClick={() => dispatch(showMyPage())}>Authorized creator in my studio section</button>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}
export default App;
