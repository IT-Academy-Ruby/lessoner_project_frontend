import {Route, Routes} from "react-router-dom";
import About from "./about/About";
import Categories from "./categories/Categories";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import MyStudio from "./my_studio/MyStudio";
import NavbarStudyStudio from "../../NavbarStudyStudio";
import SignIn from "./SignIn/SignIn";
import SignUp from "./lessoner/SignUp/SignUp";
import {useAppSelector} from "../../../store/hooks";

const Content = () => {
  const lessoner = useAppSelector(state => state.link.lessoner);
  return (
    <div className="main">
      <NavbarStudyStudio menuType={"autorised"}/>
      <Routes>
        <Route path={lessoner} element={<Lessoner/>}/>
        <Route path="/myStudio" element={<MyStudio />} />
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

