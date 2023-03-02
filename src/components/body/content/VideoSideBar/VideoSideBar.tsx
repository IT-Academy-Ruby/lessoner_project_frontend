import "./VideoSideBar.scss";
import { useEffect, useState } from "react";
import { Lesson } from "../lessons/Lessons";
import { VideoCard } from "../VideoCard/VideoCard";
import { VideoSideBarButton } from "./VideoSideBarButton";

export interface VideoSideBarProps {
  tabs: {
    label: string;
    id: number;
    data: Lesson[];
  }[];
  changeIdState: (id: number) => void;
}

export const VideoSideBar = (props: VideoSideBarProps) => {
  const { tabs, changeIdState } = props;
  const initialTabId = tabs[0]?.id;
  const initialData = tabs[0]?.data;
  const [activeTabId, setActiveTabId] = useState(initialTabId);
  const [activeData, setActiveData] = useState<Lesson[] | undefined>(
    initialData
  );
  
  useEffect(() => {
    if (activeTabId != null) {
      setActiveData(tabs.find((tab) => tab.id === activeTabId)?.data);
    }
  }, [activeTabId, tabs]);

  const handleActiveTabIdSwitch = (newId: number) => {
    setActiveTabId(newId);
  };
  if (!activeData || !tabs) {
    return <h1>Загрузка данных...</h1>;
  }

  return (
    <>
      <div className="sideBar__buttons_wrapper">
        {tabs.map((tab) => {
          return (
            <VideoSideBarButton
              key={tab.id}
              label={tab.label}
              onClick={() => {
                handleActiveTabIdSwitch(tab.id);
              }}
              isActive={activeTabId === tab.id}
            />
          );
        })}
      </div>
      {activeData.map((lessonItem) => {
        return (
          <div className="video__card_wrapper" key={lessonItem.id}>
            <VideoCard
              id={lessonItem.id}
              img={lessonItem.image_link}
              title={lessonItem.title}
              published={lessonItem.created_at}
              viewsCount={lessonItem.views_count}
              rating={lessonItem.rating && + lessonItem.rating.toFixed(1)}
              votes_count={lessonItem.votes_count}
              changeIdState={changeIdState}
            />
          </div>
        );
      })}
    </>
  );
};
