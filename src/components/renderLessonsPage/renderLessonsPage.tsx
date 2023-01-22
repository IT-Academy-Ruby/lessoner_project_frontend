import "./renderLessonsPage.scss";
import { 
  FC, useEffect, useState 
} from "react";
import Add from "../icons/add.svg";
import { BACKEND_URL_LESSONS } from "../../constants";
import Loader from "../Loader";
import { NoLessonsPage } from "./noLessonsPage";
import { RenderLessonContent } from "./renderLessonsContent";
import { RenderLessonHead } from "./renderLessonsHead";

interface RenderLessonPageProps {
  classNameWrapper: string;
  classNameInner: string;
  isHead: boolean;
  isRenderLessonHead: boolean;
  isRenderLessonTitle: boolean;
  isRenderLessonButton: boolean;
  isRenderLessonNav: boolean;
  isRenderLessonHeadStatuses: boolean;
  isRenderLessonHeadCategories: boolean;
  renderLessonHeadTitle: string;
  renderLessonHeadStatuses: string[];
  renderLessonHeadCategories: string[][];
  isRenderLessonContentEdited: boolean;
  isRenderLessonContentHasStatus: boolean;
  renderLessonContentCategoriesUrl: string;
  renderLessonContentLessonsUrl: string;
  category?: string
}

export const RenderLessonPage: FC<RenderLessonPageProps> = (renderProps) => {
  const [isLesson, setIsLesson] = useState(false);
  const [isNoLesson, setIsNoLesson] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [categoryActive, setCategoryActive] = useState("");

  const handleCategoryChange = (currentCategory: string) => {
    setCategoryActive(currentCategory);
  };

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
        {isLoader && <Loader />}{" "}
        {isLesson ? (
          <>
            {renderProps.isHead && (
              <RenderLessonHead
                onCategoryChange={handleCategoryChange}
                statuses={renderProps.renderLessonHeadStatuses}
                categories={renderProps.renderLessonHeadCategories}
                title={renderProps.renderLessonHeadTitle}
                isHead={renderProps.isRenderLessonHead}
                isTitle={renderProps.isRenderLessonTitle}
                isButton={renderProps.isRenderLessonButton}
                isStatuses={renderProps.isRenderLessonHeadStatuses}
                isCategories={renderProps.isRenderLessonHeadCategories}
                isNav={renderProps.isRenderLessonNav}
                buttonType={"button"}
                buttonText={"app.button.addNewLesson"}
                buttonClassName={"button__fs16"}
                buttonImage={Add}
                buttonImageStyle={"mystudiohead__svg-add"}
                buttonNavigatePath={"/myStudio/add_new_lesson"}
                setStatusActive={"All lessons"}
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
                category={`${renderProps.category}`}
                setCategoryActive={`${categoryActive}`}
              />
            )}
            <RenderLessonContent
              isEditable={renderProps.isRenderLessonContentEdited}
              hasStatus={renderProps.isRenderLessonContentHasStatus}
              classNameWrapper={"mystudiocontent__wrapper"}
              classNameInner={"mystudiocontent__lessons"}
              categoriesUrl={renderProps.renderLessonContentCategoriesUrl}
              lessonsUrl={renderProps.renderLessonContentLessonsUrl}
              category={renderProps.category}
              categoryActive={categoryActive}
            />
          </>
        ) : (
          isNoLesson && <NoLessonsPage isOnLessonsPage={true} />
        )}
      </div>
    </div>
  );
};
