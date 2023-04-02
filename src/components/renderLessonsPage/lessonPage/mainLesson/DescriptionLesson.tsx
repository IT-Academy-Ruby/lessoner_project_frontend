import classnames from "classnames";
import {useState} from "react";

type DescriptionLessonProps = {
  description: string;
};

const DescriptionLesson = ({description}: DescriptionLessonProps) => {
  const [isShowDescription, setIsShowDescription] = useState(true);
  const showDescription = () => {
    if (isShowDescription) {
      setIsShowDescription(false);
    } else {
      setIsShowDescription(true);
    }
  };
  return (
    <>
      <div
        className={classnames("mainLesson__description",
          {"mainLesson__description-more": isShowDescription})}
      >
        <p>{description}</p>
      </div>
      <span
        onClick={showDescription}
        className="mainLesson__showDescription"
      >
        {isShowDescription ? "Show more" : "Show less"}
      </span>
    </>
  );
};

export default DescriptionLesson;