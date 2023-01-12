import "./myStudio.scss";
import Add from "../../../icons/add.svg";
import Button from "../../../Button";
import MyStudioContent from "./MyStudioContent";
import MyStudioHead from "./MyStudioHead";
import NoLessons from "./img/noLessons.svg";
import { useIntl } from "react-intl"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL_LESSONS } from "../../../../constants";
import Loader  from "../../../Loader"; 
import { RenderLessonContent } from "../../../hoc/RenderLessonContent";
import { RenderLessonHead } from "../../../hoc/RenderLessonHead";

const MyStudio = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [isLesson, setIsLesson] = useState(false);
  const [isNoLesson, setIsNoLesson] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    fetch(BACKEND_URL_LESSONS)
      .then((response) => response.json())
      .then((lesson) =>
        lesson !== undefined && lesson.records.length > 0
          ? (setIsLesson(true), setIsLoader(false))
          : (lesson.records.length === 0 && setIsNoLesson(true),
            setIsLoader(false))
      )
      .catch((error) => console.log(error));
  }, [BACKEND_URL_LESSONS]);

  return (
    <div className="mystudio__wrapper">
      <div className="mystudio__inner">
        {isLoader ? (
          <Loader />
        ) : isLesson ? (
          <>
            {/* <MyStudioHead /> */}
            <RenderLessonHead
              statuses={[
                intl.formatMessage({ id: "app.myStudio.statusAllLessons" }),
                intl.formatMessage({ id: "app.myStudio.statusActive" }),
                intl.formatMessage({ id: "app.myStudio.statusArchived" }),
              ]}
              categories={[
                intl.formatMessage({ id: "app.myStudio.categoryAllLessons" }),
                intl.formatMessage({ id: "app.myStudio.categoryIT" }),
                intl.formatMessage({ id: "app.myStudio.categoryMusic" }),
                intl.formatMessage({ id: "app.myStudio.categoryDesign" }),
              ]}
              title={"app.My lessons"}
              isButton={true}
              buttonType={"button"}
              buttonText={"app.button.addNewLesson"}
              buttonClassName={"button__fs16"}
              buttonImage={Add}
              buttonImageStyle={"mystudiohead__svg-add"}
              buttonNavigatePath={"/myStudio/add_new_lesson"}
              setStatusActive={"All lessons"}
              setCategoryActive={"All categories"}
              classNameWrapper={"mystudiohead__wrapper"}
              classNameHead={"mystudiohead__head"}
              classNameTitle={"mystudiohead__title"}
              classNameButton={"mystudiohead__button"}
              classNameNav={"mystudiohead__nav"}
              classNameStatus={"mystudiohead__status"}
              classNameCategories={"mystudiohead__categories"}
              classNameCategoriesSelect={"mystudiohead__categories-select"}
              classNameLessonItem={"mystudiohead__lessons-item"}
              classNameLessonItemActive={"mystudiohead__lessons-item-active"}
              classNameLessonItemUnderline={
                "mystudiohead__lessons-item-underline"
              }
            />
            {/* <MyStudioContent /> */}
            <RenderLessonContent
              edited={true}
              classNameWrapper={"mystudiocontent__wrapper"}
              classNameInner={"mystudiocontent__lessons"}
              categoriesUrl={"/categories"}
              lessonsUrl={"/my_studio/lessons"}
            />
          </>
        ) : (
          isNoLesson && (
            <div className="mystudio__nolessons">
              <div className="mystudio__nolessons-picture">
                <img src={NoLessons} alt="no Lessons" />
              </div>
              <p className="mystudio__nolessons-text">
                <span>
                  {intl.formatMessage({
                    id: "app.myStudio.NoLessonTexp_1",
                  })}
                </span>
                <span>
                  {intl.formatMessage({
                    id: "app.myStudio.NoLessonTexp_2",
                  })}
                </span>
              </p>
              <div className="mystudio__button">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({
                    id: "app.button.addNewLesson",
                  })}
                  className="button__fs16"
                  buttonImage={Add}
                  imageStyle="mystudiohead__svg-add"
                  onClick={() => navigate("/myStudio/add_new_lesson")}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyStudio;
