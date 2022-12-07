import "./index.scss";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import LessonCard from "../../../LessonCard";
import items from "../../../../assets/lessonCard.json";
import requestApi from "../../../../services/request";

const url = "https://lessoner-prod.herokuapp.com/categories";

const Lessons: React.FC = () => {
  interface lesson {
    id: number;
    title: string;
    description: string;
    duration: string;
    video_link: string;
    status: string;
    author_id: number;
    category_id: string;
    created_at: string;
    imagePreview: string;
    view: number;
    rating: string;
    totalVotes: string;
  }
  //  сделать Helper, который делает дополнительный fetch-запрос и  по айдишнику вытягивает имя кат
  const [data, setData] = useState<lesson[]>(items);

  return (
    <div className="wrapper__lessons">
      <FormattedMessage id="app.lessons" />
      <div className="lessons">
        {data.map((obj) => (
          <LessonCard
            key={obj.id}
            title={obj.title}
            status={obj.status}
            duration={obj.duration}
            imagePreview={obj.imagePreview}
            id={obj.id}
            published={obj.created_at}
            view={obj.view}
            category={obj.category_id}
            rating={obj.rating}
            totalVotes={obj.totalVotes}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
