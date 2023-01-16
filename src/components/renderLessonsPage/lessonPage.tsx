import { RenderLessonPage } from "./renderLessonsPage";
import { useIntl } from "react-intl";

export const LessonPage = () => {
  const intl = useIntl();
  return (
    <RenderLessonPage
      classNameWrapper={"mystudio__wrapper"}
      classNameInner={"mystudio__inner"}
      isHead={true}
      isRenderLessonHead={false}
      isRenderLessonTitle={true}
      isRenderLessonButton={false}
      isRenderLessonNav={true}
      renderLessonHeadTitle={"app.lessonsPageLessons"}
      renderLessonHeadStatuses={[
        intl.formatMessage({ id: "app.myStudio.statusAllLessons" }),
        intl.formatMessage({ id: "app.myStudio.statusActive" }),
        intl.formatMessage({ id: "app.myStudio.statusArchived" }),
      ]}
      renderLessonHeadCategories={[
        intl.formatMessage({ id: "app.myStudio.categoryAllLessons" }),
        intl.formatMessage({ id: "app.myStudio.categoryIT" }),
        intl.formatMessage({ id: "app.myStudio.categoryMusic" }),
        intl.formatMessage({ id: "app.myStudio.categoryDesign" }),
      ]}
      isRenderLessonContentEdited={false}
      renderLessonContentCategoriesUrl={"/categories"}
      renderLessonContentLessonsUrl={"/lessons"}
    />
  );
};
