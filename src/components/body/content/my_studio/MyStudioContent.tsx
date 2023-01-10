import "./myStudioContent.scss";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { GetDataWithCategoryNames } from "../lessons/LessonsHelper";
import LessonCard from "../../../LessonCard";
import requestApi from "../../../../services/request";

export const categoriesUrl = `${process.env.REACT_APP_BACKEND_URL}/categories`;
export const lessonsUrl = `${process.env.REACT_APP_BACKEND_URL}/lessons`;
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
  image_link?: string;
  view?: number;
  rating?: number;
  votes_count?: number;
  categoryName?: string;
  author_avatar_url?: string;
  author_name?: string;
}
export interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface CategoriesResponce {
  records: Category[];
  pagy_metadata: {
    count_pages: number;
    page: number;
    per_page: number;
  };
}

const MyStudioContent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Lesson[]>([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    if (!categoriesIsLoaded) {
      const fetchSuccess = (responseData: CategoriesResponce) => {
        setCategories(responseData?.records || []);
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
          elem.image_link =
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
          fetchSuccess(data.records);
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
    <div className="mystudiocontent__wrapper">
      <div className="mystudiocontent__lessons">
        {data.map((obj) => (
          <LessonCard
            key={obj.id}
            title={obj.title}
            status={obj.status}
            duration={obj.duration}
            imagePreview={obj.image_link}
            id={obj.id}
            published={obj.created_at}
            view={obj.view}
            category={obj.categoryName}
            rating={obj.rating}
            totalVotes={obj.votes_count}
          />
        ))}
      </div>
    </div>
  );
};

export default MyStudioContent;
