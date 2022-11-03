import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/body/Body";
import LoginPage from './pages/LoginPage';
import FirstRegistrationForm from "./components/FirstRegistrationForm";
import { useState } from 'react';
import { IntlProvider } from 'react-intl'; 
import TranslationHelpers from './components/translations/translationHelpers';

function App(): JSX.Element {
  const [languageCode, setLanguageCode] = useState(TranslationHelpers.getCurrentLanguageCode());
  const messages = TranslationHelpers.getLanguageMessages(languageCode);

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Body onLanguageSwitch={setLanguageCode} />
          <Routes>
            <Route path='/users/sign_in' element={<LoginPage/>} />
            <Route path='/users/sign_up' element={<FirstRegistrationForm/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
