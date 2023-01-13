import { FC } from "react";
import { RenderLessonPage } from "./renderLessonsPage";

interface LessonsPageProps {
  isHomePage: boolean;
}

export const LessonsPage: FC<LessonsPageProps> = (props) => {
  const HOME_PAGE_STATUSES = [
    "app.lessons.statusAllLessons",
    "app.lessons.statusNew",
    "app.lessons.statusPopular",
  ];
  const MY_STUDIO_STATUSES = [
    "app.lessons.statusAllLessons",
    "app.lessons.statusActive",
    "app.lessons.statusArchived",
  ];
  const CATEGORIES = [
    "app.lessons.categoryAllLessons",
    "app.lessons.categoryDesign",
    "app.lessons.categoryIT",
    "app.lessons.categoryMusic",
    "app.lessons.categoryBusiness",
    "app.lessons.categoryFitness",
    "app.lessons.categoryMarketing",
    "app.lessons.categoryFinance",
    "app.lessons.categoryPsychology",
    "app.lessons.categoryLanguages",
  ];

  const HOME_PAGE_SETTINGS = [
    {
      classNameWrapper: "mystudio__wrapper",
      classNameInner: "mystudio__inner",
      isHead: true,
      isRenderLessonHead: false,
      isRenderLessonTitle: true,
      isRenderLessonButton: false,
      isRenderLessonNav: true,
      isRenderLessonHeadStatuses: true,
      isRenderLessonHeadCategories: true,
      renderLessonHeadTitle: "app.lessonsPageLessons",
      renderLessonHeadStatuses: HOME_PAGE_STATUSES,
      renderLessonHeadCategories: CATEGORIES,
      isRenderLessonContentEdited: false,
      isRenderLessonContentHasStatus: false,
      renderLessonContentCategoriesUrl: "/categories",
      renderLessonContentLessonsUrl: "/lessons",
    },
  ];

  const MY_STUDIO_SETTINGS = [
    {
      classNameWrapper: "mystudio__wrapper",
      classNameInner: "mystudio__inner",
      isHead: true,
      isRenderLessonHead: true,
      isRenderLessonTitle: true,
      isRenderLessonButton: true,
      isRenderLessonNav: true,
      isRenderLessonHeadStatuses: false,
      isRenderLessonHeadCategories: true,
      renderLessonHeadTitle: "app.lessonsPageMyLessons",
      renderLessonHeadStatuses: MY_STUDIO_STATUSES,
      renderLessonHeadCategories: CATEGORIES,
      isRenderLessonContentEdited: true,
      isRenderLessonContentHasStatus: true,
      renderLessonContentCategoriesUrl: "/categories",
      renderLessonContentLessonsUrl: "/my_studio/lessons",
    },
  ];

  const getLessonsPageSettings = () => {
    return props.isHomePage ?  HOME_PAGE_SETTINGS : MY_STUDIO_SETTINGS;
  };
  
  return (
    <>
      {getLessonsPageSettings().map((setting, index) => (
        <RenderLessonPage
          key={index}
          classNameWrapper={setting.classNameWrapper}
          classNameInner={setting.classNameInner}
          isHead={setting.isHead}
          isRenderLessonHead={setting.isRenderLessonHead}
          isRenderLessonTitle={setting.isRenderLessonTitle}
          isRenderLessonButton={setting.isRenderLessonButton}
          isRenderLessonNav={setting.isRenderLessonNav}
          isRenderLessonHeadStatuses={setting.isRenderLessonHeadStatuses}
          isRenderLessonHeadCategories={setting.isRenderLessonHeadCategories}
          renderLessonHeadTitle={setting.renderLessonHeadTitle}
          renderLessonHeadStatuses={setting.renderLessonHeadStatuses}
          renderLessonHeadCategories={setting.renderLessonHeadCategories}
          isRenderLessonContentEdited={setting.isRenderLessonContentEdited}
          isRenderLessonContentHasStatus={
            setting.isRenderLessonContentHasStatus
          }
          renderLessonContentCategoriesUrl={
            setting.renderLessonContentCategoriesUrl
          }
          renderLessonContentLessonsUrl={setting.renderLessonContentLessonsUrl}
        />
      ))}
    </>
  );
};
