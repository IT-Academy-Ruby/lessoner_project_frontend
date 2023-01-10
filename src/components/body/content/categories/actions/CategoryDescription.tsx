import "./addCategory.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { DESCRIPTION_CATEGORY } from "../../../../../constants";
import classNames from "classnames";
import { useState } from "react";

type CategoryDescriptionProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    value: string;
  },
  error?: string;
}

const CategoryDescription = (
  { field, error }: CategoryDescriptionProps): JSX.Element => {
  const intl = useIntl();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.description" />
      <div className="input-field">
        <textarea
          className={classNames("category-input category-textarea", { "invalid-input": error })}
          placeholder={intl.formatMessage({ id: "app.categories.placeholder.description" })}
          onBlur={() => setIsFocus(false)}
          {...field}
          onBlurCapture={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
        />
        {isFocus && <span className={classNames("field-length-description", { "error": error })}>
          {`${field.value.length}/${DESCRIPTION_CATEGORY.maxSymbols}`}
        </span>}
      </div>
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};
export default CategoryDescription;