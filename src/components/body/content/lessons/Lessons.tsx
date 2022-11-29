import "./index.scss";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import LessonCard from "../../../LessonCard";
import items from "../../../../assets/lessonCard.json";
import requestApi from "../../../../services/request";

const Lessons: React.FC = () => {
  // interface data {
  //   id: number;
  //   name: string;
  //   description: string;
  //   status: string;
  // }
  // написать type вместо interface
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const url = "https://lessoner-prod.herokuapp.com/categories";
    const fetchSuccess = (data: object) => {
      setData(data);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };
    const fetchData = async () => {
      const response = await requestApi(url, "GET");
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="wrapper__lessons">
      <FormattedMessage id="app.lessons" />
      <div className="lessons">
        {data.map((obj: any) => (
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
