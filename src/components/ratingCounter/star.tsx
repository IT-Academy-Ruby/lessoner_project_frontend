import "./star.scss";
import React from "react";
import {SvgStar} from "../../assets/svg";
import classNames from "classnames";

type StarProps = {
  onClick?: VoidFunction;
  isEmpty?: boolean;
  isDisabled?: boolean;
}

const Star: React.FC<StarProps> = (props) => {
  const {
    onClick,
    isEmpty,
    isDisabled,
  } = props;

  const className = classNames("star", 
    {"star--empty": isEmpty,
      "star--clickable": !isDisabled && onClick});

  const handleClick = () => !isDisabled && onClick && onClick();

  return (
    <div className={className}>
      <SvgStar onClick={handleClick} />
    </div>
  );
};

export default Star;
