import "./categoryName.scss";
import {FormattedMessage, useIntl} from "react-intl";

type CategoryNameProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string;
  },
  error?: string;
}
const CategoryName = ({field,error}:CategoryNameProps): JSX.Element => {
  const intl = useIntl();

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.name"/>
      <input
        type="text"
        className="category-input"
        placeholder={intl.formatMessage({ id: "app.categories.name" })}
        {...field}
      />
      {(error) && <span className="error-message">{error}</span>}
    </label>
  )
}
export default CategoryName;