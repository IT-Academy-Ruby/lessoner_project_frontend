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
      isRenderLessonHeadStatuses={true}
      isRenderLessonHeadCategories={true}
      renderLessonHeadTitle={"app.lessonsPageLessons"}
      renderLessonHeadStatuses={[
        intl.formatMessage({ id: "app.lessons.statusAllLessons" }),
        intl.formatMessage({ id: "app.lessons.statusNew" }),
        intl.formatMessage({ id: "app.lessons.statusPopular" }),
      ]}
      renderLessonHeadCategories={[
        intl.formatMessage({ id: "app.lessons.categoryAllLessons" }),
        intl.formatMessage({ id: "app.lessons.categoryDesign" }),
        intl.formatMessage({ id: "app.lessons.categoryIT" }),
        intl.formatMessage({ id: "app.lessons.categoryMusic" }),
        intl.formatMessage({ id: "app.lessons.categoryBusiness" }),
        intl.formatMessage({ id: "app.lessons.categoryFitness" }),
        intl.formatMessage({ id: "app.lessons.categoryMarketing" }),
        intl.formatMessage({ id: "app.lessons.categoryFinance" }),
        intl.formatMessage({ id: "app.lessons.categoryPsychology" }),
        intl.formatMessage({ id: "app.lessons.categoryLanguages" }),
      ]}
      isRenderLessonContentEdited={false}
      renderLessonContentCategoriesUrl={"/categories"}
      renderLessonContentLessonsUrl={"/lessons"}
    />
  );
};
