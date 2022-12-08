import "./categoryDescription.scss";
import {FormattedMessage, useIntl} from "react-intl";

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
  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.description"/>
      <textarea
        className="category-textarea"
        placeholder={intl.formatMessage({id: "app.categories.placeholder.description"})}
        {...field}
      />
      {(error) && <span className="error-message">{error}</span>}
    </label>
  )
}
export default CategoryDescription;