import classes from './Checkbox.module.scss';

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
            I agree to the processing of my personal data in accordance with the <a href='#!'>Terms</a>
          </p>
        </div>
        {error && <div><span className='error-Message'>{error}</span></div>}
      </label>
    </div>
  );
}

export default Checkbox;