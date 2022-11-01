import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/body/Body";
import LoginPage from './pages/LoginPage'
import FirstRegistrationForm from "./components/FirstRegistrationForm";
import YourselfPage from "./pages/YourselfPage";

function App(): any {
  return (
    <BrowserRouter>
      <div className="App">
        <Body />
        <Routes>
        <Route path='/users/sign_in' element={<LoginPage/>}/>
        <Route path='/users/sign_up' element={<FirstRegistrationForm/>}/>
      </Routes>
        <YourselfPage/>
      </div>
    </BrowserRouter>
  );
}

export default App;
