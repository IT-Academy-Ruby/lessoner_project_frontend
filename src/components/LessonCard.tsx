import "./LessonCard.scss";
import Kebab from "../assets/kebab.png";
import { LetterSvg } from "../components/svg/LetterSvg";
import { Link } from "react-router-dom";
import Rating from "./body/content/Rating/Rating";
import React, { useState } from "react";
import Tag from "./body/Tags/Tag";

type ThumbnailImageUrlProps = {
  imagePreview: string;
};

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

{
  /* <Link to="/lessons/edit">
      
    </Link> */
}

const MenuKebab = (currentCard: any, onClick: any) => {
  const getCardInfo = () => {
    onClick(currentCard);
    /* console.log(
       `id: ${bodyCard.idCard.id}, IT: ${bodyCard.idCard.category}, image: ${bodyCard.idCard.imagePreview}, name: ${bodyCard.idCard.title},`
    ); */
  };

  return (
    <div className="kebab__menu" onClick={getCardInfo}>
      <img src={Kebab} alt="kebab" />
    </div>
  );
};

type PublishedDataProps = {
  published: null | string;
};

const Published: React.FC<PublishedDataProps> = (props) => {
  return (
    <div className="details__date">
      <p>Published: {props.published}</p>
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
  imagePreview: string;
  status: string;
  duration: string;
  title: string;
  published: string | null;
  view: number;
  category: string;
  rating: string;
  totalVotes: string;
};

const LessonCard: React.FC<LessonCardsProps> = (props) => {
  const [curCard, setCurCard] = useState();
  const getCurCardInfo = (curCard: any) => {
    /* setCurCard(curCard); */
    console.log(curCard);
  };
  
  return (
    <div className="wrapper">
      <div className="card">
        <div className="card__icon">
          <ThumbnailImageUrl imagePreview={props.imagePreview} />
          <Tag
            type="status"
            className="video__status"
            text={props.status}
            iconLeft={props.status == "Draft" ? <LetterSvg /> : ""}
            videoStatus={true}
          />
          <Tag className="video__time" type="time" text={props.duration} />
        </div>
        <div className="card__info">
          <div className="card__info-top">
            <Title title={props.title} />
            <MenuKebab idCard={props} onclick={getCurCardInfo} />
          </div>
          <div className="details">
            <Published published={props.published} />
            <View view={props.view} />
          </div>
          <div className="categories__raiting">
            <Tag className="categories" type="category" text={props.category} />
            <Rating rating={props.rating} totalVotes={props.totalVotes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
