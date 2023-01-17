import "./lessoner.scss";
import { Hero } from "../../../hero/hero";
import { LessonsPage } from "../../../renderLessonsPage/lessonsPage";

const Lessoner = () => {
  return (
    <div className="lessoner__wrapper">
      <Hero />
      <LessonsPage isHomePage={true} />
    </div>
  );
};

export default Lessoner;
