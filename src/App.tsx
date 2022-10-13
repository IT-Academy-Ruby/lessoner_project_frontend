import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ModalEnterPhone from './components/ModalEnterPhone';
import './components/ModalEnterPhone'

function App() {
  const [modalActive, setModalActive] = useState<boolean>(true);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <phone>src/App.tsx</phone> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button 
        className='open-btn' 
        onClick={() => setModalActive(true)}
      >
        Open modal
      </button>
      <ModalEnterPhone active={modalActive} setActive={setModalActive}/>
    </div>
  );
}

export default App;
