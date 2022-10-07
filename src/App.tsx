import React from 'react';
import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import {FormattedMessage} from 'react-intl';
import { IntlProvider } from 'react-intl'; 
import Russian from './lang/ru.json';
import English from './lang/en.json';
const locale = navigator.language;
let lang:any

function App() {
  let [value, setValue] = useState('')
  let [currentLocale, setCurrentLocale] = useState('')
  useEffect(() => {
    setCurrentLocale(navigator.language)
    console.log("currentLocale",currentLocale)
    // if (locale === "ru") {
    //   setCurrentLang(Russian)
    // }

    // if (locale === "en"){
    //   setCurrentLang(English)
    // }

  }, [navigator.language])
  // // console.log(locale)
  // if(value==="English"){
  //   lang=English
  // }
  // if(value==="Русский"){
  //   lang=Russian
  // }

  return (
    <IntlProvider locale={currentLocale} messages={currentLocale === "en" ? English : Russian}>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         <FormattedMessage
         id = "app.header"
         defaultMessage="Edit the files and save to reload"
       />
       </p>
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         <FormattedMessage
           id = "app.content"
           defaultMessage="Learn React"
         />
        </a>
        <FormattedMessage
         id = "app.channel.plug"
         defaultMessage="Tutorial brought to you by Medium"
       />
       <div className="dropdown">
          <select onChange={event => setValue(event.target.value)}>
            <option hidden>{currentLocale === "en" ? "Choose your language" : "Выберите язык"}</option> 
            <option>English</option>
            <option>Русский</option>
          </select>
       </div>
      </header>
    </div>
    </IntlProvider>
    
  );
  
}

export default App;


