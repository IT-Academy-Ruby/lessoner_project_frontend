import "./index.scss";
import { 
  FC, useEffect, useState 
} from "react";
import { BACKEND_URL_LESSONS } from "../../../../constants";
import { FormattedMessage } from "react-intl";
import LessonCard from "../../../LessonCard";
import { LessonCardsProps } from "../../../types/types";

const Lessons: FC = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    return () => {
      fetch(BACKEND_URL_LESSONS)
        .then((response) => response.json())
        .then((lessons) => setLessons(lessons.records))
        .catch((error) => console.log(error));
    };
  }, []);

  return (
    <div className="wrapper__lessons">
      <FormattedMessage id="app.lessons" />
      <div className="lessons">
        {lessons.map((obj: LessonCardsProps ) => (
          <LessonCard
            key={obj.id}
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
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
