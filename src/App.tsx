import "./App.scss";
import {
  Route, Routes
} from "react-router-dom";
import {  createContext, useState} from "react";
import Body from "./components/body/Body";
import {IntlProvider} from "react-intl";
import { Snowfall } from "./components/Snowfall";
import TranslationHelpers from "./translations/translationHelpers";
import { VideoViewPage } from "./pages/VideoViewPage";

type SetBooleanInnerFunction = (value: boolean) => boolean;

export const snowContext = createContext<{
  snow: boolean;
  setSnow: (value: boolean | SetBooleanInnerFunction) => void;
    } | null>(null);

function App(): JSX.Element {
  const [languageCode, setLanguageCode] = useState(
    TranslationHelpers.getCurrentLanguageCode()
  );

  const [snow, setSnow] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);
  const [display, setDisplay] = useState<boolean>(true);

  const messages = TranslationHelpers.getLanguageMessages(languageCode);

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      <snowContext.Provider value={{ snow, setSnow }}>
          {snow && <Snowfall setOpacity={setOpacity} setDisplay={setDisplay} /> }
        <div className="App" style={{
          transition: "opacity 5s",
          opacity,
          display: display ? undefined : "none",
        }}>
          <Body onLanguageSwitch={setLanguageCode} />
          <Routes>
            <Route path="/lessons/:id" element={<VideoViewPage />} />
          </Routes>
        </div>
      </snowContext.Provider>
    </IntlProvider>
  );
}

export default App;
