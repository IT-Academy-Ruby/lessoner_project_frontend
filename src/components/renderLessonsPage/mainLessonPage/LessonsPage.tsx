import "./lessonsPage.scss";
import {ContentLessonsPage} from "./contentLessonPage/ContentLessonsPage";
import {HeaderLessonsPage} from "./headerLessonsPage/HeaderLessonsPage";
import {Hero} from "../../hero/Hero";

type LessonContentProps={
  type: string;
};

export const LessonsPage = ({type}:LessonContentProps) => {
  return(
    <div className="lessons__page">
      {type === "lessonsPage" && <Hero/>}
      <HeaderLessonsPage type={type}/>
      <ContentLessonsPage type={type}/>
    </div>
  );
};