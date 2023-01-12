import "./lessoner.scss";
import { Hero } from "../../../hero/hero";
import { LessonPage } from "../../../renderLessonsPage/lessonPage";

const Lessoner = () => {
  return (
    <div className="lessoner__wrapper">
      <Hero />
      <LessonPage />
    </div>
  );
};

export default Lessoner;
