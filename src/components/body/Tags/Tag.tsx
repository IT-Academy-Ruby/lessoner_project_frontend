import "./index.scss";
import { ReactElement } from "react";
import classNames from "classnames";

type TagProps = {
  text?: string;
  type?: "status" | "time" | "category";
  className?: string;
  iconLeft?: string | ReactElement;
  videoStatus?: boolean | undefined;
};

const Tag: React.FC<TagProps> = (props: TagProps) => {
  const {
    text,
    type = "category",
    className = "",
    iconLeft,
    videoStatus,
  } = props;
  const tagClassName = classNames(
    {
      tag: true,
      "tag-status": type === "status",
      "tag-time": type === "time",
      "tag-category": type === "category",
      draft: text === "Draft",
      archived: text === "Archived",
      in_review: text === "In review",
    },
    className
  );
  // if (isLoggedIn) {
  //   return <UserGreeting />;
  // }
  if (videoStatus) {
    return (
      <div className={tagClassName}>
        <div className="tag-wrapper">
          {iconLeft}
          <span>{text}</span>
        </div>
      </div>
    );
  }
  return <div className={tagClassName}>{text}</div>;
};

export default Tag;
