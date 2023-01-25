import "./VideoCard.scss";
import { Published, Title } from "../../../../components/LessonCard";
import { Link } from "react-router-dom";
import placeHolder from "../../../../assets/category-placeholder.png";

interface VideoCardProps {
  id: number;
  img?: string;
  title: string;
  published: string;
  changeIdState: (id: number) => void;
}

export const VideoCard = ({
  id,
  img,
  title,
  published,
  changeIdState,
}: VideoCardProps) => {
  return (
    <>
      <Link to={`/lessons/${id}`}>
        <div className="preview__img" 
          onClick={() => {
            changeIdState(id);
          }}
        >
          {img ? <img src={img} /> : <img src={placeHolder} />}
        </div>
      </Link>
      <div className="info">
        <div className="info__title"
          onClick={() => {
            changeIdState(id);
          }}
        >
          <Title title={title} id={id} className="VideoCardTitle" />
          {/* <MenuKebab className="VideoCardKebab" /> */}
        </div>
        <Published published={published} className="VideoCardPublished" />
      </div>
    </>
  );
};
