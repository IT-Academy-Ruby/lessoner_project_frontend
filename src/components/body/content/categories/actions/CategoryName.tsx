import "./addCategory.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {NAME_CATEGORY} from "../../../../../constants";
import classNames from "classnames";
import {useState} from "react";

type CategoryNameProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
  },
  error?: string;
}
const CategoryName = ({field, error}: CategoryNameProps): JSX.Element => {
  const intl = useIntl();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.name"/>
      <input
        type="text"
        className={classNames("category-input", {"invalid-input": error})}
        placeholder={intl.formatMessage({id: "app.categories.name"})}
        {...field}
        onFocus={() => {setIsFocus(true);}}
        onBlurCapture={() => {setIsFocus(false);}}
      />
      {isFocus && <span
        className={classNames("amount-symbols",
          {"error": error})}>{field.value.length}/{NAME_CATEGORY.maxSymbols}</span>}
      {error && <span className="message error">{error}</span>}
    </label>
  );
};
export default CategoryName;