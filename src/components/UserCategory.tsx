import "./UserCategory.scss";
import React from "react";
import classNames from "classnames";

type CategoryImageProps = {
  imagePreview: string;
  opacity: boolean;
};
const CategoryImage: React.FC<CategoryImageProps> = (props) => {
  return (
    <div className={props.opacity ? "category__image-transparent" : ""}>
      <img src={props.imagePreview} alt='category'/>
    </div>
  );
};

type CategoryNameProps = {
  name: string;
  className: string;
};

const CategoryName: React.FC<CategoryNameProps> = (props) => {
  return (
    <div className={props.className}>{props.name}</div>
  );
};

type CategoryInfoProps = {
  text: string;
};

const CategoryInfo: React.FC<CategoryInfoProps> = (props) => {
  return (
    <div className="category__info">{props.text}</div>
  );
};

type UserCategoryProps = {
  // id: number; use only for admin
  imagePreview: string;
  name: string;
  text: string;
  bgColor: "blue" | "pink" | "grey" | "orange";
  key: string;
};

const UserCategory: React.FC<UserCategoryProps> = (props) => {
  const {bgColor} = props;
  const [isHovered, setIsHovered] = React.useState(false);
  const userCardClassName = classNames({
    "user_card": true,
    "user_card-blue": bgColor === "blue",
    "user_card-pink": bgColor === "pink",
    "user_card-grey": bgColor === "grey",
    "user_card-orange": bgColor === "orange",
  });

  const titleClassName = classNames(
    {"user_card-title": true,
      "user_card-title--hovered": isHovered,}
  );

  return (
    <div className="user_wrapper" key={props.key}>
      <div
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)} className={userCardClassName}>
        {isHovered && <div className="bg__hover"/>}
        <CategoryImage imagePreview={props.imagePreview} opacity={isHovered}/>
        <CategoryName className={titleClassName} name={props.name}/>
        {isHovered && (<CategoryInfo text={props.text}/>)}
      </div>
    </div>
  );
};

export default UserCategory;
