import "./renderLessonsContent.scss";
import "./renderLessonsPage.scss";
import "./renderLessonsHead.scss";
import React, { useEffect, useState } from "react";
import { GetDataWithCategoryNames } from "../body/content/lessons/LessonsHelper";
import LessonCard from "../LessonCard";
import { NoLessonsPage } from "./noLessonsPage";
import { SKELETON_LESSONS_AMOUT } from "../../constants";
import SkeletonLessons from "../SkeletonLessons";
import placeHolder from "../../assets/category-placeholder.png";
import requestApi from "../../services/request";

export const REACT_APP_BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
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

interface RenderLessonContentProps {
  isEditable: boolean;
  hasStatus: boolean;
  classNameWrapper: string;
  classNameInner: string;
  categoriesUrl: string;
  lessonsUrl: string;
  category?: string;
}

export const RenderLessonContent: React.FC<RenderLessonContentProps> = (renderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Lesson[]>([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const lessonsByCategory = data.filter(
    (categoryName) => categoryName.categoryName === renderProps.category
  );

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
        const response = await requestApi(
          REACT_APP_BACKEND_URL + `${renderProps.categoriesUrl}`,
          "GET"
        );
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data);
        }
      };
      fetchData();
    }
  }, [renderProps.categoriesUrl, categoriesIsLoaded]);

  useEffect(() => {
    if (!dataIsLoaded && categoriesIsLoaded) {
      const fetchSuccess = (data: Lesson[]) => {
        const dataWithCategoryName = GetDataWithCategoryNames(categories, data);
        setData(dataWithCategoryName);
        setDataIsLoaded(true);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          REACT_APP_BACKEND_URL + `${renderProps.lessonsUrl}`,
          "GET"
        );
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data.records);
        }
      };
      fetchData();
    }
  }, [
    data,
    categories,
    renderProps.lessonsUrl,
    categoriesIsLoaded,
    dataIsLoaded,
  ]);

  const skeleton = [...new Array(SKELETON_LESSONS_AMOUT)].map((_, index) => (
    <SkeletonLessons key={index} />
  ));

  if (!categoriesIsLoaded || !dataIsLoaded)
    return <div className="lessons">{skeleton}</div>;

    
  const getRenderParameter = () => renderProps.category ? lessonsByCategory : data;

  return (
    <div className={renderProps.classNameWrapper}>
      <div className={renderProps.classNameInner}>
        {(renderProps.category && lessonsByCategory.length === 0) 
          ? 
          <NoLessonsPage isOnLessonsPage={false}/> 
          :
          getRenderParameter().map((obj) => (
            <LessonCard
              key={obj.id}
              title={obj.title}
              status={obj.status}
              duration={obj.duration}
              imagePreview={obj.image_link ? obj.image_link : placeHolder}
              id={obj.id}
              published={obj.created_at}
              view={obj.view}
              category={obj.categoryName}
              rating={obj.rating}
              totalVotes={obj.votes_count}
              isEditable={renderProps.isEditable}
              hasStatus={renderProps.hasStatus}
            />
          ))}
      </div>
    </div>
  );
};
