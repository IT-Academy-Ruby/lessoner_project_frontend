import "./VideoCard.scss";
import { Published } from "../../../../components/LessonCard";
import { Title } from "../../../../components/LessonCard";
import { MenuKebab } from "../../../../../src/components/LessonCard";

interface VideoCardProps {
  id: number;
  img?: string;
  title: string;
  published: string;
}

export const VideoCard = ({ id, img, title, published }: VideoCardProps) => {
  return (
    <>
      <div className="preview__img">
        <img src={img} />
      </div>
      <div className="info">
        <div className="info__title">
          <Title title={title} id={id} className="VideoCardTitle" />
          <MenuKebab />
        </div>
        <Published published={published} />
      </div>
    </>
  );
};
