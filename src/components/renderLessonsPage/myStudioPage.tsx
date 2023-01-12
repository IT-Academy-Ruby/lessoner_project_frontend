import { RenderLessonPage } from "./renderLessonsPage";
import { useIntl } from "react-intl";

export const MyStudioPage = () => {
  const intl = useIntl();
  return (
    <RenderLessonPage
      classNameWrapper={"mystudio__wrapper"}
      classNameInner={"mystudio__inner"}
      isHead={true}
      isRenderLessonHead={true}
      isRenderLessonTitle={true}
      isRenderLessonButton={true}
      isRenderLessonNav={true}
      isRenderLessonHeadStatuses={false}
      isRenderLessonHeadCategories={true}
      renderLessonHeadTitle={"app.lessonsPageMyLessons"}
      renderLessonHeadStatuses={[
        intl.formatMessage({ id: "app.lessons.statusAllLessons" }),
        intl.formatMessage({ id: "app.lessons.statusActive" }),
        intl.formatMessage({ id: "app.lessons.statusArchived" }),
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
      isRenderLessonContentEdited={true}
      renderLessonContentCategoriesUrl={"/categories"}
      renderLessonContentLessonsUrl={"/my_studio/lessons"}
    />
  );
};
