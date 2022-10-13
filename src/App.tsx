import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import {FormattedMessage } from 'react-intl';
import {IntlProvider } from 'react-intl'; 
import TranslationHelpers from './translations/translationHelpers'
import  LANGUAGES  from './translations/constants';

function App() {
  const [languageCode, setLanguageCode] = useState(TranslationHelpers.getCurrentLanguageCode())
  const messages = TranslationHelpers.getLanguageMessages(languageCode)
  
  return (
    <IntlProvider locale={languageCode} messages={messages}>
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
          <select onChange={event => setLanguageCode(event.target.value)}>
            <option hidden value=''><FormattedMessage id="app.choose-lang" /></option>
            {LANGUAGES.map(lang => {
              return <option value={lang.code} key={lang.code}>{lang.label}</option>
            })}
          </select>
        </header>
      </div>
    </IntlProvider>
  );
}

export default App;
