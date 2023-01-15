import "./checkbox.scss";
import Terms from "../pages/Terms";
import {useState} from "react";

type CheckboxProps = {
  field?: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
  };
  information: string;
  link: string;
  error?: string;
}
const Checkbox = ({
  field, error, information, link
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
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
        {link ? <span onClick={() => setIsTerms(true)} className="link">{link}</span> : null}
        {error && <span className="error-message">{error}</span>}
      </label>
      {isTerms && <Terms setIsTerms={setIsTerms}/>}
    </span>
  );
};

export default Checkbox;