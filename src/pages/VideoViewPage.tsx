import "./VideoViewPage.scss";
import {
  Category,
  Lesson,
  categoriesUrl,
  lessonsUrl,
} from "../components/body/content/lessons/Lessons";
import { useEffect, useState } from "react";
import { VideoPlayer } from "../../src/components/body/content/videoplayer/Videoplayer";
import { VideoSideBar } from "../../src/components/body/content/VideoSideBar/VideoSideBar";
import requestApi from "../services/request";
import { useParams } from "react-router-dom";

export const VideoViewPage = () => {
  const { id } = useParams();
  const [lessonData, setLessonData] = useState<Lesson>();
  const [lessonCategoryId, setLessonCategoryId] = useState<number>();
  const [lessonsArr, setLessonsArr] = useState<Lesson[]>([]);
  const [newLessonsArr, setNewLessonsArr] = useState<Lesson[]>([]);
  const [popularLessonsArr, setPopularLessonsArr] = useState<Lesson[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  useEffect(() => {
    if (!lessonData) {
      const fetchSuccess = (data: Lesson) => {
        setLessonData(data);
        setLessonCategoryId(data.category_id);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(lessonsUrl + "/" + id, "GET");
        if (!response.ok) {
          fetchError("fetch error " + response.status);
        } else {
          const data = await response.json();
          fetchSuccess(data);
        }
      };
      fetchData();
    }
  }, [lessonData, id]);

  useEffect(() => {
    if (!lessonsArr.length) {
      const fetchSuccess = (data: Lesson[]) => {
        setLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&category_id=${lessonCategoryId}`,
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
  }, [lessonsArr, lessonCategoryId]);

  useEffect(() => {
    if (!newLessonsArr.length) {
      const fetchSuccess = (data: Lesson[]) => {
        setNewLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&sort_field=created_at`,
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
  }, [newLessonsArr]);
  useEffect(() => {
    if (!popularLessonsArr.length) {
      const fetchSuccess = (data: Lesson[]) => {
        setPopularLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&sort_field=views_count`,
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
  }, [popularLessonsArr]);
  useEffect(() => {
    if (!popularLessonsArr.length) {
      const fetchSuccess = (data: Lesson[]) => {
        setPopularLessonsArr(data);
      };
      const fetchError = (errMessage: string) => {
        alert(errMessage);
      };
      const fetchData = async () => {
        const response = await requestApi(
          `${process.env.REACT_APP_BACKEND_URL}/lessons?page=1&sort_field=views_count`,
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
  }, [popularLessonsArr]);

  useEffect(() => {
    if (lessonCategoryId) {
      const fetchSuccess = (data: Category[]) => {
        console.log(lessonCategoryId);
        const categoryName = data.find(
          (elem) => elem.id === lessonCategoryId
        )?.name;
        if (categoryName) setCategoryName(categoryName);
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
  }, [lessonCategoryId]);

  if (
    !id ||
    !lessonData ||
    !lessonsArr ||
    !newLessonsArr ||
    !popularLessonsArr
    // !categoryName
  ) {
    return null;
  }

  return (
    <div className="video__page_wrapper">
      <div className="videoplayer__wrapper">
        <VideoPlayer src={lessonData.video_link} />
      </div>
      <div className="video__side_bar">
        <VideoSideBar
          id={+id}
          lessonsArr={lessonsArr}
          newLessonsArr={newLessonsArr}
          popularLessonsArr={popularLessonsArr}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
};
