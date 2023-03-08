import "./VideoCard.scss";
import {
  Published, Title, View 
} from "../../../../components/LessonCard";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import placeHolder from "../../../../assets/category-placeholder.png";

interface VideoCardProps {
  id: number;
  img?: string;
  title: string;
  published: string;
  rating?: number;
  votes_count?: number;
  viewsCount?: number;
  changeIdState: (id: number) => void;
}

export const VideoCard = ({
  id,
  img,
  title,
  published,
  rating,
  votes_count,
  viewsCount,
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
        <div className="videoCard-view">
          <View viewsCount={viewsCount}  />
        </div>
        <div className="card__rating">
          <Rating  rating={rating} 
            totalVotes={votes_count}/>
        </div>
        
      </div>
    </>
  );
};
