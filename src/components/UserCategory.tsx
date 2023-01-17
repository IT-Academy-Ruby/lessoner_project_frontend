import "./UserCategory.scss";
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import classNames from "classnames";

type CategoryImageProps = {
  imagePreview: string;
  opacity: boolean;
};

const CATEGORY_IMAGE_PLACEHOLDER = "https://lessoner.s3.amazonaws.com/category-placeholder.png";

const CategoryImage: React.FC<CategoryImageProps> = (props) => {
  const hasPlaceholder = !props.imagePreview;
  const className = `category__image ${props.opacity ? "category__image-transparent" : ""}`;
  if (hasPlaceholder) {
    return (
      <div className={className}>
        <img src={CATEGORY_IMAGE_PLACEHOLDER} width="100%" height="100%" alt=''/>
      </div>
    );
  }
  return (
    <div className={className}>
      <img src={props.imagePreview} width="100%" height="100%" alt=''/>
    </div>
  );
};

type CategoryNameProps = {
  name: string;
  className: string;
};

const CategoryName: React.FC<CategoryNameProps> = (props) => {
  return (
    <div className={props.className}>
      {<FormattedMessage id={"app.nameCategory."+props.name} />}
    </div>
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
  id: number;
  imagePreview: string;
  name: string;
  description: string;
};

const UserCategory: React.FC<UserCategoryProps> = (props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const userCardClassName = classNames({"user_card": true,});
  const titleClassName = classNames({"user_card-title": true,
    "user_card-title--hovered": isHovered,});
  
  return (
    <div className="user_wrapper">
      <div
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)} className={userCardClassName}>
        {isHovered && <div className="bg__hover" />}
        <CategoryImage  imagePreview={props.imagePreview} opacity={isHovered} />
        <CategoryName className={titleClassName} name={props.name} />
        {isHovered && (<CategoryInfo text={props.description} />)}
      </div>
    </div>
  );
};

export default UserCategory;
