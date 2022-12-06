import "./checkbox.scss";
import {Link} from "react-router-dom";
import {useState} from "react";

type CheckboxProps = {
  field?: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  error?: string;
  information: string;
  link: string;
}
const Checkbox = ({
  field, error, information, link
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <span className="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        className={isChecked ? "checked" : "unchecked"}
        {...field}
      />
      <label
        htmlFor="checkbox"
        className="label-checkbox"
      >
        {information}
        {link ? <Link to={"/users/sign_in/terms"} className="link">{link}</Link> : null}
        {error && <span className="error-message">{error}</span>}
      </label>
    </span>
  );
};

export default Checkbox;