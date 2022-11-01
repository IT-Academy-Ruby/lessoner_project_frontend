import React, {useState} from 'react';
import classes from './GenderSelector.module.scss';

type GenderProps = {
  options: [];
  field: {
    name: string;
    onBlur: () => {};
    onChange: () => {};
    value: string;
    label: boolean;
  };
  error: string;
  setFieldValue: any;
  label: string;
}

const GenderSelector = ({field, error, options, label}: GenderProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value)
    field.value = event.currentTarget.value
    console.log(field.name)
    console.log(label)
    // setFieldValue(field.name, event.currentTarget.value);
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
            onChange={handleChange}
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
      )
      }
    </div>
  )
}

export default GenderSelector;

