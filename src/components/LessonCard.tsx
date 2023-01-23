import "./LessonCard.scss";
import { Link , useNavigate } from "react-router-dom";
import React, { FC, useState } from "react";
import { LetterSvg } from "../components/svg/LetterSvg";
import Moment from "react-moment";
import {ReactComponent as PencilEdit } from "./icons/pencilEdit.svg";
import { PopupMenu } from "./PopupMenu";
import Rating from "./body/content/Rating/Rating";
import Tag from "./body/Tags/Tag";
import { useIntl } from "react-intl";

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

const ThumbnailImageUrl: FC<ThumbnailImageUrlProps> = (props) => {
  return (
    <Link className="card__icon-link" to={`/lessons/${props.id}`}>
      <img className="card__icon-img" src={props.imagePreview} alt="Videopreview" />
    </Link>
  );
};


type AuthorInfoProps = {
  avatar?: string;
  name?: string;
};

export const AuthorInfo: FC<AuthorInfoProps> = (props) => {
  return (
    <>
      <div className="card__author-avatar">
        {props.avatar &&
          (<img className="card__author-img" src={props.avatar} alt="avatar" />)}
      </div>
      <div className="card__author-name">
        <p>{props.name}</p>
      </div>
    </>
  );
};

type TitleProps = {
  title: string;
  id?: number;
  className?: string;
};

export const Title: FC<TitleProps> = (props) => {
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

export const MenuKebab: FC<MenuKebabProps> = ({ className, idCard }) => {
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

export const Published: FC<PublishedDataProps> = (props) => {
  const intl = useIntl();
  return (
    <div className={`details__date ${props.className}`}>
      <p>
        <span className="details__date-name">
          {intl.formatMessage({ id: "app.lessonCard.Published" })}
        </span>
        <Moment element="span" format="YYYY.MM.DD" date={props.published} />
      </p>
    </div>
  );
};

type ViewProps = {
  viewsCount?: number;
};

const View: FC<ViewProps> = (props) => {
  const intl = useIntl();
  return (
    <div className="card__details-view">
      <p>
        <span className="card__details-view-count">
          {props.viewsCount}
        </span>
        {intl.formatMessage({ id: "app.lessonCard.Views" })}
      </p>
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
  authorAvatarUrl?: string;
  authorName?: string;
  viewsCount?: number;
};

const LessonCard: FC<LessonCardsProps> = (props) => {

  return (
    <div className="card__wrapper">
      <div className="card__inner">
        <div className="card__icon">
          {props.imagePreview && (
            <ThumbnailImageUrl
              id={props.id}
              imagePreview={props.imagePreview}
            />
          )}
          {props.hasStatus && (
            <Tag
              type="status"
              className="video__status"
              text={props.status}
              iconLeft={props.status === "Draft" ? <LetterSvg /> : ""}
              videoStatus={true}
            />
          )}
          {props.duration && (
            <Tag className="video__time" type="time" text={props.duration} />
          )}
        </div>
        <div className="card__info">
          <div className="card__info-top">
            {!props.isEditable && (
              <div className="card__info-author">
                <AuthorInfo
                  avatar={props.authorAvatarUrl}
                  name={props.authorName}
                />
              </div>
            )}
            <div className="card__info-title">
              <Title title={props.title} id={props.id} />
              {props.isEditable && props.status !== "archived" && (
                <MenuKebab idCard={props.id} />
              )}
            </div>
          </div>
          <div className="card__info-bottom">
            <div className="card__details">
              <Published published={props.published} />
              {props.viewsCount !== undefined && props.viewsCount >= 0 && (
                <View viewsCount={props.viewsCount} />
              )}
            </div>
            <div className="card__categories-raiting">
              <div className="card__categories-inner">
                <Tag
                  className="categories"
                  type="category"
                  text={props.category}
                />
              </div>
              {props.rating !== undefined &&
                props.rating >= 0 &&
                props.totalVotes !== undefined &&
                props.totalVotes >= 0 && (
                <div className="card__rating-inner">
                  <Rating
                    rating={props.rating && +props.rating.toFixed(1)}
                    totalVotes={props.totalVotes}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
