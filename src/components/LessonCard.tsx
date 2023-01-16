import "./LessonCard.scss";
import { Link , useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LetterSvg } from "../components/svg/LetterSvg";
import Moment from "react-moment";
import {ReactComponent as PencilEdit } from "./icons/pencilEdit.svg";
import { PopupMenu } from "./PopupMenu";
import Rating from "./body/content/Rating/Rating";
import Tag from "./body/Tags/Tag";

type ThumbnailImageUrlProps = {
  imagePreview: string;
  id?: number;
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
      <Link to={`/lessons/${props.id}`}>
        <img src={props.imagePreview} alt="Videopreview" />
      </Link>
    </div>
  );
};

type TitleProps = {
  title: string;
  id?: number;
  className?: string;
};

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className={`video__title ${props.className}`}>
      <Link to={`/lessons/${props.id}`}>
        <p title={props.title}>{props.title}</p>
      </Link>
    </div>
  );
};

export type MenuKebabProps = {
  className?: string;
  idCard?: number;
};

export const MenuKebab: React.FC<MenuKebabProps> = ({ className, idCard }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleKebabClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    navigate("/myStudio/lesson/" + idCard);
  };

  return (
    <>
      <div onClick={handleKebabClick} className={`kebab__menu ${className}`}>
        <PencilEdit />
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
  className?: string;
};

export const Published: React.FC<PublishedDataProps> = (props) => {
  return (
    <div className={`details__date ${props.className}`}>
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
  category?: string;
  rating?: number;
  totalVotes?: number;
  isEditable: boolean;
  hasStatus: boolean;
};

const LessonCard: React.FC<LessonCardsProps> = (props) => {
  return (
    <div className="wrapper">
      <div className="card">
        <div className="card__icon">
          {props.imagePreview && (
            <ThumbnailImageUrl  id={props.id} imagePreview={props.imagePreview} />
          )}
          {props.hasStatus &&
            <Tag
              type="status"
              className="video__status"
              text={props.status}
              iconLeft={props.status == "Draft" ? <LetterSvg /> : ""}
              videoStatus={true}
            />}
          {props.duration && (
            <Tag className="video__time" type="time" text={props.duration} />
          )}
        </div>
        <div className="card__info">
          <div className="card__info-top">
            <Title title={props.title} id={props.id} />
            {props.isEditable && <MenuKebab idCard={props.id} />}
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
