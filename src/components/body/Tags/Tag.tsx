import "./index.scss";
import classNames from "classnames";

type TagProps = {
    text: string; 
    type?: "status" | "time" | "category";
    className?: string;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {
  const {
    text, type = "category", className = ""
  } = props;
  const tagClassName = classNames({
    tag: true,
    "tag-status": type === "status",
    "tag-time": type === "time",
    "tag-category": type === "category",
  }, className);

  return (
    <div className={tagClassName}>{text}</div>
  );
};

export default Tag;
