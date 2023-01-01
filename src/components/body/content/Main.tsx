import "./main.scss";
import {Route, Routes} from "react-router-dom";
import About from "./about/About";
import AddCategory from "./categories/actions/AddCategory";
import Categories from "./categories/Categories";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import MyStudio from "./my_studio/MyStudio";
import SignIn from "./SignIn/SignIn";
import SignUp from "./lessoner/SignUp/SignUp";
import UserPage from "./userPage/UserPage";
import {useAppSelector} from "../../../store/hooks";

type ContentProps={
  languageCode:string;
}
const Content = ({languageCode}:ContentProps) => {
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  return (
    <div className="main">
      <Routes>
        <Route path="/myStudio" element={<MyStudio/>}/>
        <Route path="/" element={<Lessoner/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/lessons" element={<Lessons/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/users/sign_in" element={<SignIn/>}/>
        <Route path="/users/sign_up" element={<SignUp/>}/>
        <Route
          path="/categories/addCategory"
          element={<AddCategory add={true} />}
        />
        <Route
          path="/categories/updateCategory/:id"
          element={<AddCategory add={false} />}
        />
        {decodeUserName && <Route path={decodeUserName?"/user/userPage":"/"} element={<UserPage languageCode={languageCode}/>}/>}
      </Routes>
    </div>
  );
};

export default Content;

