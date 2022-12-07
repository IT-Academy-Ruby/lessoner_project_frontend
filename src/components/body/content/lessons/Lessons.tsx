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
  const [data, setData] = useState<lesson[]>(items);
  // useEffect(() => {
  //   const fetchSuccess = (data: lesson[]) => {
  //     setData(data);
  //   };
  //   const fetchError = (errMessage: string) => {
  //     alert(errMessage);
  //   };
  //   const fetchData = async () => {
  //     const response = await requestApi(url, "GET");
  //     if (!response.ok) {
  //       fetchError("fetch error " + response.status);
  //     } else {
  //       const data = await response.json();
  //       fetchSuccess(data);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     console.log("unsubscribe");
  //   };
  // }, []);
  return (
    // {
    //   "id": 1,
    //   "title": "Lesson name",
    //   "description": "Lesson description",  Для карточки не нужен
    //   "video_link": "http://video.com/my-video",
    //   "status": "active",
    //   "author_id": 1,
    //   "category_id": 1,
    //   "created_at": "2022-12-01 14:11:33 +0300"
    // imagePreview: ставим дефолтную картинку
    // props.published Преобразовать библиотека moment.js
    // view={obj.view} если undefined, то не рендерим
    // rating если undefined, то не рендерим
    //  totalVotes={obj.totalVotes} если undefined, то не рендерим
    <div className="wrapper__lessons">
      <FormattedMessage id="app.lessons" />
      <div className="lessons">
        {data.map((obj) => (
          <LessonCard
            key={obj.id}
            title={obj.title}
            description={obj.description}
            status={obj.status}
            duration={obj.duration}
            imagePreview={obj.imagePreview}
            id={obj.id}
            published={obj.created_at}
            view={obj.view}
            category={obj.category_id}
            rating={obj.rating}
            totalVotes={obj.totalVotes}
            author_id={obj.author_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
