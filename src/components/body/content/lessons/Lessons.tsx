import "./index.scss";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../constants";
import { FormattedMessage } from "react-intl";
import { GetDataWithCategoryNames } from "./LessonsHelper";
import LessonCard from "../../../LessonCard";
import requestApi from "../../../../services/request";

const categoriesUrl = `${BACKEND_URL}/categories`;
const lessonsUrl = `${BACKEND_URL}/lessons`;
export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration?: string;
  video_link: string;
  status: string;
  author_id: number;
  category_id: number;
  created_at: string;
  imagePreview?: string;
  view?: number;
  rating?: number;
  totalVotes?: number;
  categoryName?: string;
}
export interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
}

const Lessons: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Lesson[]>([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    if (!categoriesIsLoaded) {
      const fetchSuccess = (data: Category[]) => {
        setCategories(data);
        setCategoriesIsLoaded(true);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(categoriesUrl, "GET");
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data);
        }
      };
      fetchData();
    }
  }, [categories, categoriesIsLoaded]);

  useEffect(() => {
    if (!dataIsLoaded && categoriesIsLoaded) {
      const fetchSuccess = (data: Lesson[]) => {
        data.map((elem) => {
          elem.imagePreview =
            "https://i.ytimg.com/vi/jS4aFq5-91M/maxresdefault.jpg";
        });
        const dataWithCategoryName = GetDataWithCategoryNames(categories, data);
        setData(dataWithCategoryName);
        setDataIsLoaded(true);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(lessonsUrl, "GET");
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data);
        }
      };
      fetchData();
    }
  }, [data, categories, categoriesIsLoaded, dataIsLoaded]);

  if (!categoriesIsLoaded || !dataIsLoaded)
    return (
      <div>
        <FormattedMessage id="app.lessons.loading" />
      </div>
    );

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
            category={obj.categoryName}
            rating={obj.rating}
            totalVotes={obj.totalVotes}
          />
        ))}
      </div>
    </div>
  );
};
export default Lessons;
