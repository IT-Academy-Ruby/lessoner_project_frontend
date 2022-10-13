import { useState} from 'react'
import logo from './logo.svg';
import './App.css';
import {FormattedMessage} from 'react-intl';
import { IntlProvider } from 'react-intl'; 
import TranslationHelpers from './translations/translationHelpers'
import  LANGS  from './translations/constants';





function App() {
  const [selectedLang, setSelectedLang] = useState(TranslationHelpers.getCurrentLanguageValue())
  const messages = TranslationHelpers.getLangMessages(selectedLang)
  
  return (
    <IntlProvider locale={selectedLang} messages={messages}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <FormattedMessage
              id="app.text"
              values={{
                what: 'react-intl',
                code: chunks => <code>{chunks}</code>
              }}
            />
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="app.learn-react-link" />
          </a>
          <select onChange={event => setSelectedLang(event.target.value)}>
              <option hidden value=''><FormattedMessage id="app.choose-lang" /></option>
              {LANGS.map(lang => {
                return <option value={lang.value} key={lang.value}>{lang.label}</option>
              })}
            </select>
        </header>
      </div>
    </IntlProvider>
  );
}
export default App;