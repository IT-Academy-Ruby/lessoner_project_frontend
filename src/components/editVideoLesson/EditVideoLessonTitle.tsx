import "./EditVideoLessonTitle.scss";
import { EVLTest } from "./EVLTest";

export const EditVideoLessonTitle = () => {
  return (
    <div className="evl__wrapper">
      <div className="evl__inner">
        <div className="evl__content">
          <h2 className="evl__title">
            Edit the lesson
          </h2>
          <EVLTest/>
        </div>
      </div>
    </div> 
  );
};
