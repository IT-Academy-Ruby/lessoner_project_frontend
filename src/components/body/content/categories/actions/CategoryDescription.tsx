import "./addCategory.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {DESCRIPTION_CATEGORY} from "../../../../../constants";
import classNames from "classnames";
import {useState} from "react";

type CategoryDescriptionProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    value: string;
  },
  placeholder:string;
  error?: string;
}

const CategoryDescription = (
  {field, placeholder, error}: CategoryDescriptionProps): JSX.Element => {
  const intl = useIntl();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.description"/>
      <textarea
        className={classNames("category-input category-textarea", {"invalid-input": error})}
        placeholder={placeholder}
        onBlur={() => setIsFocus(false)}
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
    </label>
  );
};
export default CategoryDescription;