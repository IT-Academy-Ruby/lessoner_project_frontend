import "./genderSelector.scss";
import {FormattedMessage} from "react-intl";

type GenderProps = {
  options: [];
  field: {
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    label: boolean;
  };
  error: string;
  label: string;
}

const GenderSelector = ({
                          field, error, options, label
                        }: GenderProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    field.value = event.currentTarget.value;
  };
  return (
    <div className="input-label">
      <FormattedMessage id="app.genderSelector.gender"/>
      <div className="radio-wrapper">
      {options ? (
        options.map((option: {
          value: string; label: string; name: string; genderValue: string
        }) => (
          <label
            key={option.genderValue}
          className="radio-label">
            <input
              {...field}
              type="radio"
              className="radio"
              value={option.label}
              onClick={handleChange}
              checked={field.label}
              name={option.name}
            />{option.label}
          </label>
        ))
      ) : null}
      {(error) && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};

export default GenderSelector;