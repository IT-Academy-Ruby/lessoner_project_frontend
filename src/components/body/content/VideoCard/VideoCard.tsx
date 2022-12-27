import "./VideoCard.scss";
import { MenuKebab, Published, Title } from "../../../../components/LessonCard";

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
          <MenuKebab className="VideoCardKebab" />
        </div>
        <Published published={published} className="VideoCardPublished" />
      </div>
    </>
  );
};
