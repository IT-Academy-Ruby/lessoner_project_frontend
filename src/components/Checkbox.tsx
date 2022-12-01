import "./Checkbox.scss";
import { FormattedMessage } from "react-intl";

type CheckboxProps = {
  field?: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}
const Checkbox = ({ field, error }: CheckboxProps): JSX.Element => {
  return (
    <label className="checkbox__label">
      <div className="checkbox__content">
        <input
          className="checkbox__input"
          type='checkbox'
          {...field}
        />
        <p className="checkbox__text">
          <FormattedMessage id="app.checkbox" /> <a href='#!'>
            <FormattedMessage id="app.checkbox.terms" /> </a>
        </p>
      </div>
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Checkbox;