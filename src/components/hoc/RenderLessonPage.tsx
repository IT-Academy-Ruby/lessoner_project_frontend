import "../body/content/my_studio/myStudio.scss";
import { 
  FC, useEffect, useState 
} from "react";
import Add from "../icons/add.svg";
import { BACKEND_URL_LESSONS } from "../../constants";
import Button from "../Button";
import Loader from "../Loader";
import NoLessons from "../body/content/my_studio/img/noLessons.svg";
import { RenderLessonContent } from "./RenderLessonContent";
import { RenderLessonHead } from "./RenderLessonHead";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

interface RenderLessonPageProps {
  classNameWrapper: string;
  classNameInner: string;
  isHead: boolean;
  isRenderLessonHead: boolean;
  isRenderLessonTitle: boolean;
  isRenderLessonButton: boolean;
  isRenderLessonNav: boolean;
  isRenderLessonContentEdited: boolean;
  renderLessonHeadTitle: string;
  renderLessonContentCategoriesUrl: string;
  renderLessonContentLessonsUrl: string;
  renderLessonHeadStatuses: string[];
  renderLessonHeadCategories: string[];
}

export const RenderLessonPage: FC<RenderLessonPageProps> = (renderProps) => {
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
  }, []);

  return (
    <div className={renderProps.classNameWrapper}>
      <div className={renderProps.classNameInner}>
        {isLoader ? (
          <Loader />
        ) : isLesson ? (
          <>
            {renderProps.isHead && (
              <RenderLessonHead
                statuses={renderProps.renderLessonHeadStatuses}
                categories={renderProps.renderLessonHeadCategories}
                title={renderProps.renderLessonHeadTitle}
                isHead={renderProps.isRenderLessonHead}
                isTitle={renderProps.isRenderLessonTitle}
                isButton={renderProps.isRenderLessonButton}
                isNav={renderProps.isRenderLessonNav}
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
            )}
            <RenderLessonContent
              edited={renderProps.isRenderLessonContentEdited}
              classNameWrapper={"mystudiocontent__wrapper"}
              classNameInner={"mystudiocontent__lessons"}
              categoriesUrl={renderProps.renderLessonContentCategoriesUrl}
              lessonsUrl={renderProps.renderLessonContentLessonsUrl}
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
                  {intl.formatMessage({id: "app.myStudio.NoLessonTexp_1"})}
                </span>
                <span>
                  {intl.formatMessage({id: "app.myStudio.NoLessonTexp_2"})}
                </span>
              </p>
              <div className="mystudio__button">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({id: "app.button.addNewLesson"})}
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
