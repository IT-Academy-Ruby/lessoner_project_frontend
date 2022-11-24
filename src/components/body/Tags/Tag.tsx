import "./index.scss";
import { ReactElement } from "react";
import classNames from "classnames";

type TagProps = {
  text: string;
  type?: "status" | "time" | "category";
  className?: string;
  iconLeft?: string | ReactElement;
};

const Tag: React.FC<TagProps> = (props: TagProps) => {
  const { 
    text, type = "category", className = "", iconLeft 
  } = props;
  const tagClassName = classNames(
    {
      tag: true,
      "tag-status": type === "status",
      "tag-time": type === "time",
      "tag-category": type === "category",
      "draft": text === "Draft",
      "archived": text === "Archived",
      "in_review": text === "In review",
    },
    className
  );

  return (
    <div className={tagClassName}>
      {iconLeft}
      <span>{text}</span>
    </div>
  );
};

export default Tag;
