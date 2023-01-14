import "./addCategory.scss";
import {FormattedMessage} from "react-intl";
import {NAME_CATEGORY} from "../../../../../constants";
import classNames from "classnames";
import {useState} from "react";

type CategoryNameProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
  },
  label: string;
  placeholder: string;
  error?: string;
  disabled?:boolean
}
const CategoryName = ({field, error, label, placeholder,disabled}: CategoryNameProps): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <label className="category-label">
      {label}
      <input
        type="text"
        className={classNames("category-input", {"invalid-input": error})}
        placeholder={placeholder}
        {...field}
        onFocus={() => {setIsFocus(true);}}
        onBlurCapture={() => {setIsFocus(false);}}
        disabled={disabled}
      />
      {isFocus && <span
        className={classNames("amount-symbols",
          {"error": error})}>{field.value.length}/{NAME_CATEGORY.maxSymbols}</span>}
      {error && <span className="message error">{error}</span>}
    </label>
  );
};
export default CategoryName;