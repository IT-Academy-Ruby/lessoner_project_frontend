import "./addCategory.scss";
import { DESCRIPTION_CATEGORY } from "../../../../../constants";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { useState } from "react";

type CategoryDescriptionProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    value: string;
  },
  placeholder:string;
  error?: string;
  descriptionRef?:()=>void;
  isOccupiedDescription?:string;
}

export const CategoryDescription = ({
  field, placeholder, error, descriptionRef, isOccupiedDescription
}: CategoryDescriptionProps): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.description"/>
      <textarea
        className={classNames("category-input category-textarea",
          {"invalid-input": error || isOccupiedDescription})}
        placeholder={placeholder}
        onBlur={() => setIsFocus(false)}
        ref={descriptionRef}
        {...field}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlurCapture={() => {
          setIsFocus(false);
        }}
      />
      {isFocus && <span className={
        classNames("amount-symbols",
          {"error": error})}>{field.value.length}/{DESCRIPTION_CATEGORY.maxSymbols}</span>}
      {error && <span className="message error">{error}</span>}
      {isOccupiedDescription && <span className="message error">{isOccupiedDescription}</span>}
    </label>
  );
};