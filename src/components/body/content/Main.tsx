import "./main.scss";
import { Route, Routes } from "react-router-dom";
import About from "./about/About";
import AddCategory from "./categories/actions/AddCoategory";
import Categories from "./categories/Categories";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import MyStudio from "./my_studio/MyStudio";
import SignIn from "./SignIn/SignIn";
import SignUp from "./lessoner/SignUp/SignUp";

const Content = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/myStudio" element={<MyStudio />} />
        <Route path="/" element={<Lessoner />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/sign_in" element={<SignIn />} />
        <Route path="/users/sign_up" element={<SignUp />} />
        <Route
          path="/categories/addCategory"
          element={<AddCategory />}
        />
      </Routes>
    </div>
  );
};

export default Content;

