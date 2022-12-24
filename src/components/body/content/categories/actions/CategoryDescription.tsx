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
  error?: string;
  descriptionLength: number;
}

const CategoryDescription = ({
                               field, error, descriptionLength
                             }: CategoryDescriptionProps): JSX.Element => {
  const intl = useIntl();
  const [letters, setLetters] =
    useState<number>(DESCRIPTION_CATEGORY.maxSymbols - descriptionLength);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.description"/>
      <textarea
        className={classNames("category-input category-textarea", {"invalid-input": error})}
        placeholder={intl.formatMessage({id: "app.categories.placeholder.description"})}
        onBlur={() => setIsFocus(false)}
        {...field}
        onKeyUp={() => setLetters(DESCRIPTION_CATEGORY.maxSymbols - field.value.length)}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlurCapture={() => {
          setIsFocus(false)
        }}
      />
      {isFocus && <span className={classNames("amount-symbols",{"error":error})}>{field.value.length}/{DESCRIPTION_CATEGORY.maxSymbols}</span>}
      {error && <span className="message error">{error}</span>}
        </label>
        );
      };
      export default CategoryDescription;