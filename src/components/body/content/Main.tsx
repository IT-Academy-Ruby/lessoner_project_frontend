import { Route, Routes } from "react-router-dom";
import About from "./about/About";
import Categories from "./categories/Categories";
import FirstRegistrationForm from "../../FirstRegistrationForm";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import LoginPage from "../../../pages/LoginPage";

const Content = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/users/sign_in" element={<LoginPage />} />
        <Route path="/users/sign_up" element={<FirstRegistrationForm />} />
        <Route path="/" element={<Lessoner />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};
export default Content;
