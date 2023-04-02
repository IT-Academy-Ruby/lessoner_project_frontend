import "./Main.scss";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  addToken,
  confirmTokenSlice,
  editUserEmail,
  resetUserData,
} from "../../../store/loginName/loginSlice";
import {nameDecodedUser, resetDecodeUser} from "../../../store/header/decodeJwtSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import About from "./about/About";
import AddCategory from "./categories/actions/AddCategory";
import AddLesson from "./my_studio/AddLesson";
import CategoriesForAdmin from "./categories/CategoriesForAdmin";
import CategoriesUser from "./categories/CategoriesUser";
import {EditVideoLessonTitle} from "../../editVideoLesson/EditVideoLessonTitle";
import FacebookButton from "../../../components/FacebookButton";
import GoogleButton from "../../../components/GoogleButton";
import {GoogleOAuthProvider} from "@react-oauth/google";
import LessonPage from "../../renderLessonsPage/lessonPage/LessonPage";
import LessonsPage from "../../renderLessonsPage/mainLessonPage/LessonsPage";
import Loader from "../../Loader";
import ModalResponse from "../../modalResponse/ModalResponse";
import Pages from "../../../components/Pages";
import Terms from "../../../pages/terms/Terms";
import UserPage from "./userPage/UserPage";
import VKButton from "../../../components/VKButton";
import {getCategory} from "../../../store/categorySlice/categorySlice";
import {resetError} from "../../../store/lessonSlice/lessonSlice";
import {uploadModalData} from "../../../store/modalSlice/modalSlice";
import {useEffect} from "react";

const Content = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingCategories = useAppSelector((state) => state.categories.loading);
  const dataLessons = useAppSelector((state) => state.lessons);
  const dataUser = useAppSelector((state) => state.login);
  const dataModal = useAppSelector((state) => state.modalData.data);

  const url = window.location.href;
  const findTokenWordInURL = "token=";
  let controlRendering = 1;

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    const registrationToken = url.lastIndexOf("confirm_email?token=");
    const resetPasswordToken = url.lastIndexOf("password/reset?token=");
    const updateEmaiToken = url.lastIndexOf("update_email?token=");

    if (registrationToken > 0 && controlRendering === 1) {
      const token = url.slice(
        url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length
      );
      (async () => {
        await dispatch(confirmTokenSlice(token));
        navigate("/");
      })();
      controlRendering++;
    }
    if (resetPasswordToken > 0 && controlRendering === 1) {
      const token = url.slice(
        url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length
      );
      dispatch(addToken(token));
      navigate("/user/sign_in/reset_password/new_password");
      controlRendering++;
    }
    if (updateEmaiToken > 0 && controlRendering === 1) {
      const token = url.slice(
        url.lastIndexOf(findTokenWordInURL) + findTokenWordInURL.length
      );
      dispatch(editUserEmail(token));
      navigate("/user/sign_in");
      if (localStorage.getItem("JWT")) {
        localStorage.setItem("JWT", "");
      }
      if (sessionStorage.getItem("JWT")) {
        sessionStorage.setItem("JWT", "");
      }
      dispatch(nameDecodedUser());
      dispatch(resetUserData());
      controlRendering++;
    }
  }, [controlRendering, dispatch, navigate, url,]);

  useEffect(() => {
    if (dataUser.userToken.jwt) {
      sessionStorage.setItem("JWT", dataUser.userToken.jwt);
    }
    if (dataUser.userToken.error) {
      dispatch(uploadModalData({
        isOpen: true,
        text: dataUser.userToken.error,
        typeModal: true
      }));
    }
  }, [dispatch, dataUser.userToken]);

  useEffect(() => {
    if (dataLessons.error || dataUser.user.error === "unregistered user") {
      dispatch(resetDecodeUser());
      dispatch(resetUserData());
      dispatch(resetError());
      localStorage.removeItem("JWT");
      sessionStorage.removeItem("JWT");
    }
  }, [dispatch, dataLessons.error, dataUser]);

  return (
    <div className="main">
      {(dataUser.loading || loadingCategories || dataLessons.loading) && <Loader/>}
      <Routes>
        <Route path="/" element={<LessonsPage type={"lessonsPage"}/>}/>
        <Route path="/terms" element={<Terms isPolitic={true}/>}/>
        <Route path="/lessons/:id" element={<LessonPage/>}/>
        <Route
          path="/myStudio/add_new_lesson"
          element={<AddLesson add={true}/>}
        />
        <Route
          path="/myStudio/update_lesson/:id"
          element={<AddLesson add={false}/>}
        />
        {/*<Route path="/" element={<NoLessonsPage isOnLessonsPage={true}/>}/>*/}
        <Route path="/categories/management" element={<CategoriesForAdmin/>}/>
        <Route path="/categories" element={<CategoriesUser/>}/>
        <Route path="/categories/:id" element={<LessonsPage type={"lessonsPage"}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/myStudio" element={<LessonsPage type={"myStudio"}/>}/>
        <Route path="/myStudio/lesson/:id" element={<EditVideoLessonTitle/>}/>
        <Route
          path="/categories/addCategory"
          element={<AddCategory add={true}/>}
        />
        <Route
          path="/categories/updateCategory/:id"
          element={<AddCategory add={false}/>}
        />
        <Route
          path="/user/userPage"
          element={<UserPage/>}
        />
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
        <Route path="/user/sign_in" element={<Pages pageType={"Login"}/>}/>
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
          element={
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
              <GoogleButton/>
            </GoogleOAuthProvider>
          }
        />
        <Route path="/user/facebook" element={<FacebookButton/>}/>
        <Route path="/user/vk" element={<VKButton/>}/>
      </Routes>
      {dataModal.isOpen && <ModalResponse/>}
    </div>
  );
};

export default Content;
