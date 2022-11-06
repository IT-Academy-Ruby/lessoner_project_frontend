import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/body/Body";
import NavbarStudy from "./components/NavbarStudy";
import PhoneNumberPage from "./pages/PhoneNumberPage";
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
        <NavbarStudy/>
        <Body onLanguageSwitch={setLanguageCode} />
        <Routes>
          <Route path='/users/sign_in' element={<PhoneNumberPage/>}/>
          <Route path='/users/sign_up' element={<FirstRegistrationForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
   </IntlProvider>
  );
}
export default App;
