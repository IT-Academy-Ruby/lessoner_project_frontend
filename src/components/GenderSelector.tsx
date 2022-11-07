import './GenderSelector.module.scss';

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

const GenderSelector = ({field, error, options, label}: GenderProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    field.value = event.currentTarget.value;
  }
  return (
    <div>
      {options ? (
        options.map((option: { value: string; label: string; name: string; genderValue: string }) => (
          <span key={option.genderValue}>
          <label>
          <input
            {...field}
            type='radio'
            value={option.label}
            onClick={handleChange}
            checked={field.label}
            name={option.name}
          />{option.label}
            </label>
        </span>
        ))
      ) : (
        <div>
          <label>
            <input
              {...field}
              type='radio'/>{label}
          </label>
        </div>
      )}
      {(error) && <span className='error'>{error}</span>}
    </div>
  )
}

export default GenderSelector;

