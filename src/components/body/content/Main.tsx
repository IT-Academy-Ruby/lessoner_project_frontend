import { Route, Routes } from "react-router-dom";
import Lessoner from "./lessoner/Lessoner";
import Categories from "./categories/Categories";
import Lessons from "./lessons/Lessons";
import About from "./about/About";
import LoginPage from "../../../pages/LoginPage";
import FirstRegistrationForm from "../../FirstRegistrationForm";

const Content = () => {
 return (
    <div className="main">
      <Routes>
        <Route path='/users/sign_in' element={<LoginPage/>}/>
        <Route path='/users/sign_up' element={<FirstRegistrationForm/>}/>
        <Route path="/" element={<Lessoner />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};
export default Content;
