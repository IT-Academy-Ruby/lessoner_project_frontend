import "./categoryDescription.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {useState} from "react";

type CategoryDescriptionProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    value: string;
  },
  error?: string;
}

const CategoryDescription = ({field, error}: CategoryDescriptionProps): JSX.Element => {
  const intl = useIntl();
  const [value, setValue] = useState("")
  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.description"/>
      <textarea
        className="category-textarea"
        placeholder={intl.formatMessage({id: "app.categories.placeholder.description"})}
        {...field}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value)
        }}
      ></textarea>
      {(error) && <span className="error-massage">{error}</span>}
    </label>
  )
}
export default CategoryDescription;