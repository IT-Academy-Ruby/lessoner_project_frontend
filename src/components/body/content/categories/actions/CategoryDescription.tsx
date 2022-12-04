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
    <label className="">
      <FormattedMessage id="app.categories.description"/>
      <textarea
        className=""
        placeholder={intl.formatMessage({id: "app.categories.placeholder.description"})}
        cols={40}
        rows={5}
        {...field}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value)
        }}
      ></textarea>
      {(error) && <span className="error">{error}</span>}
    </label>
  )
}
export default CategoryDescription;