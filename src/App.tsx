import "./App.scss";
import {
  BrowserRouter,Link, Route, Routes
} from "react-router-dom";
import Body from "./components/body/Body";
import {IntlProvider} from "react-intl";
import Pages from "./components/Pages";
import TranslationHelpers from "./translations/translationHelpers";
import {useEffect, useState} from "react";

function App(): JSX.Element {

  const [languageCode, setLanguageCode] = useState(
    TranslationHelpers.getCurrentLanguageCode()
  );
  const messages = TranslationHelpers.getLanguageMessages(languageCode);

  const signOut = () => {
    localStorage.setItem("JWT", "");
  };

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Body onLanguageSwitch={setLanguageCode} languageCode={languageCode}/>
          <Routes>
            <Route
              path="/login"
              element={<Pages pageType={"Login"}/>}/>
            <Route
              path="/code"
              element={<Pages pageType={"Code"}/>}/>
            <Route
              path="/resetPassword"
              element={<Pages pageType={"ResetPage"}/>}/>
            <Route
              path="/setNewPassword"
              element={<Pages pageType={"SetNewPassword"}/>}/>
            <Route
              path="/RegPhoneNumberPage"
              element={<Pages pageType={"PhoneNumberPage"} registration={true}/>}/>
            <Route
              path="/AuthPhoneNumberPage"
              element={<Pages pageType={"PhoneNumberPage"} registration={false}/>}/>
            <Route
              path="/confirmReg"
              element={<Pages pageType={"ConfirmReg"}/>}/>
            <Route
              path="/firstRegistrationForm"
              element={<Pages pageType={"FirstRegistrationForm"}/>}/>
            <Route
              path="/yourselfPage"
              element={<Pages pageType={"YourselfPage"}/>}/>
          </Routes>
          <div style={{display: "flex", flexDirection: "column"}}>
            <button onClick={signOut}>Not authorized</button>
            <Link to="/user/userPage"><h2>User page</h2></Link>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;