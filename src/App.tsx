import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/body/Body";
import LoginPage from './pages/LoginPage';
import FirstRegistrationForm from "./components/FirstRegistrationForm";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import CodePage from "./pages/CodePage";
import {showDefaultPage, showMyPage, showSectionPage, showStudentPage} from "./store/header/headerSlice";
import {IntlProvider} from "react-intl";
import Search from "./components/Search";
import TranslationHelpers from "./translations/translationHelpers";
import {useAppDispatch} from "./store/hooks";
import {useState} from "react";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [languageCode, setLanguageCode] = useState(TranslationHelpers.getCurrentLanguageCode());
  const messages = TranslationHelpers.getLanguageMessages(languageCode);
  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Body onLanguageSwitch={setLanguageCode}/>
          <Routes>
            <Route path='/users/sign_in' element={<LoginPage/>}/>
            <Route path='/users/sign_up' element={<FirstRegistrationForm/>}/>
            <Route path='/users/sign_in/phone_number' element={<PhoneNumberPage/>}/>
            <Route path='/users/sign_in/phone_number/code' element={<CodePage/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <button onClick={() => dispatch(showDefaultPage())}>
            Not authorized
          </button>
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
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;