import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/body/Body";
import LoginPage from './pages/LoginPage';
import FirstRegistrationForm from "./components/FirstRegistrationForm";
import PhoneNumberPage from "./pages/PhoneNumberPage";
import CodePage from "./pages/CodePage";

function App(){
  return (
    <BrowserRouter>
      <div className="App">
        <Body/>
        <Routes>
          <Route path='/users/sign_in' element={<LoginPage/>}/>
          <Route path='/users/sign_up' element={<FirstRegistrationForm/>}/>
          <Route path='/users/sign_in/phone_number' element={<PhoneNumberPage/>}/>
          <Route path='/users/sign_in/phone_number/code' element={<CodePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
