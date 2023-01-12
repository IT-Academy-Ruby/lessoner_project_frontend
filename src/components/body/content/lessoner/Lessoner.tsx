import "./lessoner.scss";
import { Hero } from "../../../hero/hero";
import { RenderLessonPage } from "../../../hoc/RenderLessonPage";
import { useIntl } from "react-intl";

const Lessoner = () => {
  const intl = useIntl();
  
  return (
    <div className="lessoner__wrapper">
      <Hero />
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
    </div>
  );
};

export default Lessoner;
