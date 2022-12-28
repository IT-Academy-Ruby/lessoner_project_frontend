import "./addCategory.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { NAME_CATEGORY } from "../../../../../constants";
import classNames from "classnames";
import { useState } from "react";


type CategoryNameProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string;
  },
  error?: string;
  nameLength: number;
}
const CategoryName = ({
  field, error, nameLength
}: CategoryNameProps): JSX.Element => {
  const intl = useIntl();
  const [letters, setLetters] = useState<number>(NAME_CATEGORY.maxSymbols - nameLength);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.name" />
      <div className="input-field">
        <input
          type="text"
          className={classNames("category-input", { "invalid-input": error })}
          placeholder={intl.formatMessage({ id: "app.categories.name" })}

          {...field}
          onKeyUp={() => setLetters(NAME_CATEGORY.maxSymbols - field.value.length)}
          onFocus={() => setIsFocus(true)}
        />
        <span className={classNames("field-length", { "error": error })}>
          {`${field.value.length}/${NAME_CATEGORY.maxSymbols}`}
        </span>
      </div >
      {error && <span className="message error">{error}</span>}
      {!error && <span className={classNames("message help", { "invisible": !isFocus })}>
        {intl.formatMessage({ id: "app.categories.name.helper" }, { letters: letters })}
      </span>}
    </label>
  );
};
export default CategoryName;