import "./Main.scss";
import {
  Route, Routes, useNavigate
} from "react-router-dom";
import {
  addToken, confirmTokenSlice, editUserEmail, resetUserData
} from "../../../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import About from "./about/About";
import AddCategory from "./categories/actions/AddCategory";
import Categories from "./categories/Categories";
import { EditVideoLessonTitle } from "../../editVideoLesson/EditVideoLessonTitle";
import FacebookButton from "../../../components/FacebookButton";
import GoogleButton from "../../../components/GoogleButton";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Lessoner from "./lessoner/Lessoner";
import Lessons from "./lessons/Lessons";
import MyStudio from "./my_studio/MyStudio";
import NewLesson from "./add_new_lesson/NewLesson";
import Pages from "../../../components/Pages";
import Terms from "../../../pages/Terms";
import UserPage from "./userPage/UserPage";
import VKButton from "../../../components/VKButton";
import {nameDecodedUser} from "../../../store/header/decodeJwtSlice";
import {useEffect} from "react";

const Content = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const decodeUserName = useAppSelector(state => state.userDecodedName.session.name);
  const url = window.location.href;
  const findTokenWordInURL = "token=";
  let controlRendering = 1;
  useEffect(() => {
    const registrationToken = url.lastIndexOf("confirm_email?token=");
    const resetPasswordToken = url.lastIndexOf("password/reset?token=");
    const updateEmaiToken = url.lastIndexOf("update_email?token=");

    if (registrationToken > 0 && controlRendering === 1) {
      const token = url.slice(url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length);
      dispatch(confirmTokenSlice(token));
      navigate("/user/sign_in");
      controlRendering++;
    }
    if (resetPasswordToken > 0 && controlRendering === 1) {
      const token = url.slice(url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length);
      dispatch(addToken(token));
      navigate("/user/sign_in/reset_password/new_password");
      controlRendering++;
    }
    if (updateEmaiToken > 0 && controlRendering === 1) {
      const token = url.slice(url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length);
      dispatch(editUserEmail(token));
      navigate("/user/sign_in");
      localStorage.setItem("JWT", "");
      dispatch(nameDecodedUser());
      dispatch(resetUserData());
      controlRendering++;
    }
  }, [controlRendering, dispatch, navigate, url]);


  return (
    <div className="main">
      <Routes>
        <Route path="/lessons/:id" element={<EditVideoLessonTitle />} />
        <Route path="/" element={<Lessoner/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/lessons" element={<Lessons/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/myStudio/add_new_lesson" element={<NewLesson />} />
        <Route path="/myStudio" element={<MyStudio />} />
        <Route
          path="/categories/addCategory"
          element={<AddCategory add={true} />}
        />
        <Route
          path="/categories/updateCategory/:id"
          element={<AddCategory add={false} />}
        />
        {decodeUserName &&
          <Route
            path={decodeUserName?"/user/userPage":"/"}
            element={<UserPage />}
          />
        }
        <Route
          path="/user/sign_up"
          element={<Pages pageType={"FirstRegistrationForm"}/>}
        />
        <Route
          path="/user/reg_in/information"
          element={<Pages pageType={"YourselfPage"} registration={false}/>}
        />
        <Route
          path="/user/reg_in/information/modR"
          element={<Pages pageType={"ConfirmReg"} registration={true}/>}
        />
        <Route
          path="/user/sign_in/phone_numberR"
          element={<Pages pageType={"PhoneNumberPage"} registration={true}/>}
        />
        <Route
          path="/user/sign_in/phone_numberR/code"
          element={<Pages pageType={"Code"} registration={true}/>}
        />
        <Route
          path="/user/sign_in"
          element={<Pages pageType={"Login"}/>}
        />
        <Route
          path="/user/sign_in/phone_numberA"
          element={<Pages pageType={"PhoneNumberPage"} registration={false}/>}
        />
        <Route
          path="/user/sign_in/reset_password/reset"
          element={<Pages pageType={"ConfirmReg"} registration={false}/>}
        />
        <Route
          path="/user/sign_in/phone_numberA/code"
          element={<Pages pageType={"Code"} registration={false}/>}
        />
        <Route
          path="/user/sign_in/reset_password"
          element={<Pages pageType={"ResetPage"}/>}
        />
        <Route
          path="/user/sign_in/reset_password/new_password"
          element={<Pages pageType={"SetNewPassword"}/>}
        />
        <Route
          path="/user/google"
          element={<GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_ID}>
            <GoogleButton/>
          </GoogleOAuthProvider>}
        />
        <Route
          path="/user/facebook"
          element={<FacebookButton/>}
        />
        <Route
          path="/user/vk"
          element={<VKButton/>}
        />
        <Route
          path={"/user/sign_up/terms"}
          element={<Terms/>}
        />
      </Routes>
    </div>
  );
};

export default Content;
