import "./App.scss";

import {
  Route, Routes
} from "react-router-dom";
import {useState} from "react";
import Body from "./components/body/Body";
import {IntlProvider} from "react-intl";
import { Snowfall } from "./components/Snowfall";
import TranslationHelpers from "./translations/translationHelpers";


function App(): JSX.Element {
  const [languageCode, setLanguageCode] = useState(
    TranslationHelpers.getCurrentLanguageCode()
  );


  const [opacity, setOpacity] = useState<number>(1);
  const [display, setDisplay] = useState<boolean>(true);

  const messages = TranslationHelpers.getLanguageMessages(languageCode);

  return (
    <IntlProvider locale={languageCode} messages={messages}>
        <Snowfall setOpacity={setOpacity} setDisplay={setDisplay}/>
        <div className="App" style={{
          transition: "opacity 5s",
          opacity,
          display: display ? undefined : "none",
        }}>
          <Body onLanguageSwitch={setLanguageCode} />
          <Routes>
          </Routes>
        </div>
    </IntlProvider>
  );
}

export default App;