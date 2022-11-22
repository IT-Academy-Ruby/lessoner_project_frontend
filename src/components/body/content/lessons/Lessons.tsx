import "./index.scss";
import { FormattedMessage } from "react-intl";
import LessonCard from "../../../LessonCard";
import React from "react";
import items from "../../../../assets/lessonCard.json";

const Lessons: React.FC = () => {
  return (
    <div className="wrapper__lessons">
      <FormattedMessage id="app.lessons" />
      <div className="lessons">
        {items.map((obj) => (
          <LessonCard key={obj.id} 
            title={obj.title} 
            status={obj.status}
            duration={obj.duration}
            imagePreview={obj.imagePreview}
            id={obj.id}
            published={obj.published}
            view={obj.view}
            category={obj.category}
            rating={obj.rating}
            totalVotes={obj.totalVotes}
          />))
        }
      </div>
    </div>
  );
};

export default Lessons;
