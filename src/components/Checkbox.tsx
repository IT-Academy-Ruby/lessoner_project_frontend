import { FormattedMessage } from "react-intl";
import classes from "./Checkbox.module.scss";

type CheckboxProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
}
const Checkbox = ({ field, error }: CheckboxProps): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <label className={classes.label}>
        <div>
          <input
            className={classes.input}
            type='checkbox'
            {...field}
          />
          <p>
            <FormattedMessage id="app.checkbox" /> <a href='#!'>
              <FormattedMessage id="app.checkbox.terms" /> </a>
          </p>
        </div>
        {error && <div><span className='error-Message'>{error}</span></div>}
      </label>
    </div>
  );
};

export default Checkbox;