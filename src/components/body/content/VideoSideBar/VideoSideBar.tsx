import "./VideoSideBar.scss";
import { Lesson } from "../lessons/Lessons";
import { VideoCard } from "../VideoCard/VideoCard";
import { VideoSideBarButton } from "./VideoSideBarButton";
import { useState } from "react";

interface VideoSideBarProps {
  id: number;
  lessonsArr: Lesson[];
  newLessonsArr: Lesson[];
  popularLessonsArr: Lesson[];
  categoryName: string;
}
export const VideoSideBar = (props: VideoSideBarProps) => {
  const { id, lessonsArr, newLessonsArr, popularLessonsArr, categoryName } =
    props;

  const [newSelectedButton, setNewSelectedButton] = useState(1);
  const sideBarButtonsArr = [
    { name: categoryName, id: 1 },
    { name: "New", id: 2 },
    { name: "Popular", id: 3 },
  ];

  const cbSelectedButton = (newSelectedButton: number) => {
    setNewSelectedButton(newSelectedButton);
  };
  if (!categoryName) {
    return <h1>Загрузка данных...</h1>;
  }
  console.log(lessonsArr);
  return (
    <>
      <div className="sideBar__buttons_wrapper">
        {sideBarButtonsArr.map((button) => {
          return (
            <VideoSideBarButton
              key={button.id}
              name={button.name}
              id={button.id}
              cbSelected={cbSelectedButton}
              newSelectedButton={newSelectedButton}
            />
          );
        })}
      </div>
      {lessonsArr.map((elem, index) => {
        return (
          <div className="video__card_wrapper" key={index}>
            <VideoCard
              id={id}
              img={elem.image_link}
              title={elem.title}
              published={elem.created_at}
            />
          </div>
        );
      })}
    </>
  );
};
