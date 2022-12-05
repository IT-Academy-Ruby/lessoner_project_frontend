import "./EditVideoLessonTitle.scss";
import React from "react";
import LessonName from "./LessonName";

export const EditVideoLessonTitle = () => {
  return (
    <div className="evl__wrapper">
      <div className="evl__inner">
        <div className="evl__content">
          <h2 className="evl__title">
            Edit the lesson
          </h2>
          <LessonName minSymbol={1} maxSymbol={64} labelName="Name" />
        </div>
      </div>
    </div> 
  );
};
