import "./VideoSideBar.scss";
import { Lesson, lessonsUrl } from "../lessons/Lessons";
import { useEffect, useState } from "react";
import { VideoCard } from "../VideoCard/VideoCard";
import requestApi from "../../../../services/request";

interface VideoSideBarProps {
  id?: number;
}

export const VideoSideBar = (prop: VideoSideBarProps) => {
  const { id } = prop;
  const [lessonsArr, setLessonsArr] = useState<Lesson[]>([]);
  const [lessonsArrisLoaded, setLessonsArrIsLoaded] = useState(false);
  const [videoCardsArr, setVideoCardsArr] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!lessonsArrisLoaded) {
      const fetchSuccess = (lessonsArr: Lesson[]) => {
        setLessonsArr(lessonsArr);
        setLessonsArrIsLoaded(true);
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
  }, [lessonsArr, lessonsArrisLoaded]);
  useEffect(() => {
    if (lessonsArrisLoaded) {
      console.log(lessonsArr);
      const foundElem = lessonsArr.find((elem) => elem.id === id);
      const foundCategoryid = foundElem?.category_id;
      const updatedData = [...lessonsArr];
      const newVideoCardsArr = updatedData.filter(
        (elem) => elem.category_id === foundCategoryid
      );
      setVideoCardsArr(newVideoCardsArr);
    }
  }, [lessonsArr, id, lessonsArrisLoaded]);
  console.log(videoCardsArr);
  if (!videoCardsArr) {
    return <h1>Загрузка данных...</h1>;
  }

  return (
    <>
      {videoCardsArr.map((elem, index) => {
        return (
          <div className="video__card_wrapper" key={index}>
            <VideoCard img={elem.imagePreview} />
          </div>
        );
      })}
    </>
  );
};
