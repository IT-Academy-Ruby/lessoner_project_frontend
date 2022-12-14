import "./index.scss";
import { FormattedMessage } from "react-intl";
import LessonCard from "../../../LessonCard";
import { useEffect, useState, FC } from "react";
import items from "../../../../assets/lessonCard.json";

const Lessons: FC = () => {
  const [lessons, setLessons] = useState([]);
  const getLessonsUrl = "https://lessoner-project-2w3h.onrender.com/lessons";

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = () => {
    fetch(getLessonsUrl)
      .then((response) => response.json())
      .then((lessons) => setLessons(lessons))
      .catch((error) => console.log(error));
  }

  return (
    <div className="wrapper__lessons">
      <FormattedMessage id="app.lessons" />
      <div className="lessons">
        {items.map(
          (obj: {
            id: number;
            view: number;
            title: string;
            status: string;
            duration: string;
            imagePreview: string;
            published: string;
            category: string;
            rating: string;
            totalVotes: string;
          }) => (
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
          )
        )}
        {lessons.map(
          (obj: {
            id: number;
            view: number;
            title: string;
            status: string;
            duration: string;
            imagePreview: string;
            published: string;
            category: string;
            rating: string;
            totalVotes: string;
          }) => (
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
          )
        )}
      </div>
    </div>
  );
};;

export default Lessons;
