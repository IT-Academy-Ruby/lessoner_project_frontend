import "./Main.scss";
import { Route, Routes } from "react-router-dom";
import About from "./about/About";
import Categories from "./categories/Categories";
import { EditVideoLessonTitle } from "../../editVideoLesson/EditVideoLessonTitle";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import MyStudio from "./my_studio/MyStudio";
import NavbarStudyStudio from "../../NavbarStudyStudio";
import SignIn from "./SignIn/SignIn";
import SignUp from "./lessoner/SignUp/SignUp";

const Content = () => {
  const typeOfNavbar = 
  { study: <NavbarStudyStudio menuType={"study"}/>, 
    studio: <NavbarStudyStudio menuType={"studio"}/> }; 
  return (
    <div className="main">
      <Routes>
        <Route
          path="myStudio"
          element={
            <>
              <MyStudio />
              {typeOfNavbar.studio}
            </>
          }
        />
        <Route path="/" element={<Lessoner />} />
        <Route
          path="/categories"
          element={
            <>
              <Categories />
              {typeOfNavbar.study}
            </>
          }
        />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<EditVideoLessonTitle/>} />
        <Route path="/about" element={<About />} />
        <Route path="/users/sign_in" element={<SignIn />} />
        <Route path="/users/sign_up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Content;

