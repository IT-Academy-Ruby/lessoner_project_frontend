import {FormattedMessage, useIntl} from "react-intl";

type CategoryImageProps = {
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string;
  },
  error?: string;
}

const CategoryImage = ({field, error}: CategoryImageProps) => {
  return (
    <label>
      <FormattedMessage id="app.categories.uploadImage"/>
      <input
        type="file"
        className=""
      />
    </label>
  )
}
export default CategoryImage;