import "./renderLessonsContent.scss";
import "./renderLessonsPage.scss";
import "./renderLessonsHead.scss";
import { 
  FC, useEffect, useState 
} from "react";
import { GetDataWithCategoryNames } from "../body/content/lessons/LessonsHelper";
import LessonCard from "../LessonCard";
import { NoLessonsPage } from "./noLessonsPage";
import { SKELETON_LESSONS_AMOUT } from "../../constants";
import SkeletonLessons from "../SkeletonLessons";
import placeHolder from "../../assets/category-placeholder.png";
import requestApi from "../../services/request";
import { useIntl } from "react-intl";

export const REACT_APP_BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export interface Lesson {
  author_avatar_url?: string;
  author_id: number;
  author_name?: string;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  image_link?: string;
  image_name?: string;
  image_size?: number;
  rating?: number;
  status: string;
  title: string;
  video_link: string;
  view?: number;
  views_count?: number;
  votes_count?: number;
  duration?: string;
  categoryName?: string;
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
  categoryActive?: string;
  statusActive?: string;
  onCategoriesNames: (arg: string[]) => void;
} 

interface Map {
  [key: number]: string;
}

export const RenderLessonContent: FC<RenderLessonContentProps> = (renderProps) => {
  const intl = useIntl();
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Lesson[]>([]);
  const [newLessonsArr, setNewLessonsArr] = useState<Lesson[]>([]);
  const [popularLessonsArr, setPopularLessonsArr] = useState<Lesson[]>([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const onCategoriesNames = renderProps.onCategoriesNames;
  const allLessonsUrlStatus = `${REACT_APP_BACKEND_URL + renderProps.lessonsUrl}`;
  const newUrlStatus = `${
    REACT_APP_BACKEND_URL +
    renderProps.lessonsUrl +
    "?page=1&sort_field=created_at"
  }`;
  const popularUrlStatus = `${
    REACT_APP_BACKEND_URL +
    renderProps.lessonsUrl +
    "?page=1&sort_field=views_count"
  }`;

  useEffect(() => {
    const categoriesMap = categories.reduce((map: Map, cat: Category) => {
      map[cat.id] = cat.name;
      return map;
    }, {});
    const categoryNamesArray: string[] = [];
    for (const categoryName in categoriesMap) {
      categoryNamesArray.push(categoriesMap[categoryName]);
    }
    onCategoriesNames(categoryNamesArray);
  }, [categories, onCategoriesNames]);

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
        const response = await requestApi(`${allLessonsUrlStatus}`, "GET");
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data.records);
        }
      };
      fetchData();
    }
  }, [data, categories, allLessonsUrlStatus, categoriesIsLoaded, dataIsLoaded]);

  useEffect(() => {
    //Get  Array sorted by newest
    if (!newLessonsArr.length && categoriesIsLoaded) {
      const fetchSuccess = (data: Lesson[]) => {
        const dataWithCategoryName = GetDataWithCategoryNames(categories, data);
        setNewLessonsArr(dataWithCategoryName);
        setDataIsLoaded(true);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(`${newUrlStatus}`, "GET");
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
    newUrlStatus,
    categoriesIsLoaded,
    dataIsLoaded,
    newLessonsArr.length,
  ]);

  useEffect(() => {
    //Get  Array sorted by popular
    if (!popularLessonsArr.length && categoriesIsLoaded) {
      const fetchSuccess = (data: Lesson[]) => {
        const dataWithCategoryName = GetDataWithCategoryNames(categories, data);
        setPopularLessonsArr(dataWithCategoryName);
        setDataIsLoaded(true);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(`${popularUrlStatus}`, "GET");
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
    popularUrlStatus,
    categoriesIsLoaded,
    dataIsLoaded,
    popularLessonsArr.length,
  ]);

  const lessonsByCategory = data.filter(
    (item) => item.categoryName === renderProps.category
  );
  const lessonsBycategoryActive = data.filter(
    (item) => item.categoryName === renderProps.categoryActive
  );
  const popularLessonsArrByCategory = popularLessonsArr.filter(
    (item) => item.categoryName === renderProps.category
  );
  const popularLessonsArrByCategoryActive = popularLessonsArr.filter(
    (item) => item.categoryName === renderProps.categoryActive
  );
  const newLessonsArrByCategory = newLessonsArr.filter(
    (item) => item.categoryName === renderProps.category
  );
  const newLessonsArrByCategoryActive = newLessonsArr.filter(
    (item) => item.categoryName === renderProps.categoryActive
  );

  const getLessonsByCurrentCategory = () =>
    renderProps.categoryActive === "All categories"
      ? data
      : renderProps.categoryActive
        ? lessonsBycategoryActive
        : renderProps.category
          ? lessonsByCategory
          : data;

  const getNewLessonsByCurrentCategory = () =>
    renderProps.categoryActive === "All categories"
      ? newLessonsArr
      : renderProps.categoryActive
        ? newLessonsArrByCategoryActive
        : renderProps.category
          ? newLessonsArrByCategory
          : newLessonsArr;

  const getPopularLessonsByCurrentCategory = () =>
    renderProps.categoryActive === "All categories"
      ? popularLessonsArr
      : renderProps.categoryActive
        ? popularLessonsArrByCategoryActive
        : renderProps.category
          ? popularLessonsArrByCategory
          : popularLessonsArr;

  const getRenderByCurrentCategoryAndStatus = () =>
    renderProps.statusActive ===
    intl.formatMessage({ id: "app.lessons.statusAllLessons" })
      ? getLessonsByCurrentCategory()
      : renderProps.statusActive ===
        intl.formatMessage({ id: "app.lessons.statusNew" })
        ? getNewLessonsByCurrentCategory()
        : renderProps.statusActive ===
          intl.formatMessage({ id: "app.lessons.statusPopular" })
          ? getPopularLessonsByCurrentCategory()
          : data;

  const skeleton = [...new Array(SKELETON_LESSONS_AMOUT)].map((_, index) => (
    <SkeletonLessons key={index} />
  ));

  if (!categoriesIsLoaded || !dataIsLoaded)
    return <div className="lessons">{skeleton}</div>;

  return (
    <div className={renderProps.classNameWrapper}>
      <div className={renderProps.classNameInner}>
        {
          (data.length === 0 && dataIsLoaded) 
          ||
          (renderProps.category &&
            renderProps.category === undefined &&
            lessonsByCategory.length === 0) 
          ||
          (renderProps.categoryActive &&
            lessonsBycategoryActive.length === 0 &&
            renderProps.categoryActive === "") 
          ||
          (renderProps.categoryActive &&
            lessonsBycategoryActive.length === 0 &&
            renderProps.categoryActive !== "All categories") 
            ? (<NoLessonsPage isOnLessonsPage={false} />) 
            : (
              getRenderByCurrentCategoryAndStatus().map((obj) => (
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
                  authorAvatarUrl={obj.author_avatar_url}
                  authorName={obj.author_name}
                  viewsCount={obj.views_count}
                  isEditable={renderProps.isEditable}
                  hasStatus={renderProps.hasStatus}
                />
              ))
            )}
      </div>
    </div>
  );
};
