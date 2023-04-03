import "./checkbox.scss";
import {Terms} from "../pages/terms/Terms";
import { useState } from "react";

type CheckboxProps = {
  field?: {
    name: string;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
  };
  information: string;
  link: string;
  error?: string;
};

export const Checkbox = ({
  field,
  error,
  information,
  link,
}: CheckboxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
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
      <label htmlFor="checkbox" className="label-checkbox">
        {information}
        {link ? (
          <span onClick={() => setIsOpenTerms(true)} className="link">
            {link}
          </span>
        ) : null}
        {error && <span className="error-message">{error}</span>}
      </label>
      {isOpenTerms && (
        <Terms setIsOpenTerms={setIsOpenTerms} isPolitic={false} />
      )}
    </span>
  );
};