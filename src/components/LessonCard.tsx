import "./LessonCard.scss";
import { KebabSvg } from "./svg/KebabSvg";
import { LetterSvg } from "../components/svg/LetterSvg";
import Moment from "react-moment";
import PopupMenu from "./PopupMenu";
import Rating from "./body/content/Rating/Rating";
import React from "react";
import Tag from "./body/Tags/Tag";

type ThumbnailImageUrlProps = {
  imagePreview: string;
};

const POPUP_ITEMS = [
  {
    label: "Archive",
    url: "#",
    id: 1,
  },
  {
    label: "Edit",
    url: "#",
    id: 2,
  },
  {
    label: "Send to review",
    url: "#",
    id: 3,
  },
];

const ThumbnailImageUrl: React.FC<ThumbnailImageUrlProps> = (props) => {
  return (
    <div>
      <a href="/lessons">
        <img src={props.imagePreview} alt="Videopreview" />
      </a>
    </div>
  );
};

type TitleProps = {
  title: string;
};

const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="video__title">
      <a href="#">
        <p>{props.title}</p>
      </a>
    </div>
  );
};

const MenuKebab = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleKebabClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={handleKebabClick} className="kebab__menu">
        <KebabSvg />
      </div>
      <PopupMenu
        isOpen={isOpen}
        onClickOutside={() => setIsOpen(false)}
        items={POPUP_ITEMS}
      />
    </>
  );
};

type PublishedDataProps = {
  published: string;
};

const Published: React.FC<PublishedDataProps> = (props) => {
  return (
    <div className="details__date">
      <p>
        Published:
        <Moment element="span" format="YYYY.MM.DD" date={props.published} />
      </p>
    </div>
  );
};

type ViewProps = {
  view: number;
};

const View: React.FC<ViewProps> = (props) => {
  return (
    <div className="details__view">
      <p>{props.view} views</p>
    </div>
  );
};

type LessonCardsProps = {
  id: number;
  imagePreview?: string;
  status: string;
  duration?: string;
  title: string;
  published: string;
  view?: number;
  category: string;
  rating?: number;
  totalVotes?: number;
};

// "created_at": "2022-12-01 14:11:33 +0300"
// }
// key={obj.id}
// title={obj.title}
// status={obj.status}
// duration={obj.duration}
// imagePreview={obj.imagePreview}
// id={obj.id}
// published={obj.created_at}
// view={obj.view}
// category={obj.category_id}
// rating={obj.rating}
// totalVotes={obj.totalVotes}

const LessonCard: React.FC<LessonCardsProps> = (props) => {
  return (
    <div className="wrapper">
      <div className="card">
        <div className="card__icon">
          {props.imagePreview && (
            <ThumbnailImageUrl imagePreview={props.imagePreview} />
          )}

          <Tag
            type="status"
            className="video__status"
            text={props.status}
            iconLeft={props.status == "Draft" ? <LetterSvg /> : ""}
            videoStatus={true}
          />
          {props.duration && (
            <Tag className="video__time" type="time" text={props.duration} />
          )}
        </div>
        <div className="card__info">
          <div className="card__info-top">
            <Title title={props.title} />
            <MenuKebab />
          </div>
          <div className="details">
            <Published published={props.published} />
            {props.view && <View view={props.view} />}
          </div>
          <div className="categories__raiting">
            <Tag className="categories" type="category" text={props.category} />
            {props.rating && props.totalVotes && (
              <Rating rating={props.rating} totalVotes={props.totalVotes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
