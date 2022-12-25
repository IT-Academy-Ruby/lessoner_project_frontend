import "./main.scss";
import {Route, Routes} from "react-router-dom";
import About from "./about/About";
import AddCategory from "./categories/actions/AddCategory";
import Categories from "./categories/Categories";
import { EditVideoLessonTitle } from "../../editVideoLesson/EditVideoLessonTitle";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import MyStudio from "./my_studio/MyStudio";
import NewLesson from "./add_new_lesson/NewLesson";
// import NavbarStudyStudio from "../../NavbarStudyStudio";
import SignIn from "./SignIn/SignIn";
import SignUp from "./lessoner/SignUp/SignUp";


const Content = () => {
  return (
    <div className="main">
      <Routes>
        {/* <Route path={lessoner} element={<Lessoner/>}/> */}
        <Route path="/myStudio/add_new_lesson" element={<NewLesson />} />
        <Route path="/myStudio" element={<MyStudio />} />
        <Route path="/" element={<Lessoner />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/sign_in" element={<SignIn />} />
        <Route path="/users/sign_up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Content;

