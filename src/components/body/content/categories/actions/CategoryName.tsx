import "./addCategory.scss";
import {NAME_CATEGORY} from "../../../../../constants";
import classNames from "classnames";
import { useState } from "react";

type CategoryNameProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
  };
  label: string;
  placeholder: string;
  error?: string;
  nameRef: ()=>void;
  isOccupiedName: string;
}

const CategoryName = ({
  field, error, label, placeholder, nameRef, isOccupiedName
}: CategoryNameProps): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <label className="category-label">
      {label}
      <input
        type="text"
        className={classNames("category-input", {"invalid-input": error || isOccupiedName})}
        placeholder={placeholder}
        ref={nameRef}
        {...field}
        onFocus={() => {setIsFocus(true);}}
        onBlurCapture={() => {setIsFocus(false);}}
      />
      {isFocus && <span
        className={classNames("amount-symbols",
          {"error": error})}>{field.value.length}/{NAME_CATEGORY.maxSymbols}</span>}
      {error && <span className="message error">{error}</span>}
      {isOccupiedName && <span className="message error">{isOccupiedName}</span>}
    </label>
  );
};

export default CategoryName;