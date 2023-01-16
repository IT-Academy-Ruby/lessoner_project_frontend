import "./genderSelector.scss";

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
  text:string;
}

const GenderSelector = ({
  field, error, options, text
}: GenderProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    field.value = event.currentTarget.value;
  };
  return (
    <div className="input-label">
      {text}
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
                value={option.genderValue}
                onClick={handleChange}
                checked={field.label}
                name={option.name}
              />{option.label}
            </label>
          ))
        ) : null}
      </div>
      {(error) && <span className="error-message">{error}</span>}
    </div>
  );
};

export default GenderSelector;