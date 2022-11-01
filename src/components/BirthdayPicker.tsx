import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import "./birthday.scss";


type BirthdayPickerProps = {
  field: {
    name: string,
    onBlur: () => {},
    onChange: () => {},
    value: any,
  };
  error: string;
}

const BirthdayPicker = ({field, error}: BirthdayPickerProps): JSX.Element => {
  const [birthday, setBirthday] = useState<Date | null>(null);

  const fieldHandler = (date: Date) => {
    setBirthday(date);
    field.value = date
    console.log('lo')
  }
  const minYear = new Date((new Date()).getTime() -
    120 * 365.2 * 86400000 - 6 * 86400000 + 29.7 * 60000); // this date 120 years ago

  return (
    <div className='birthday'>
      <label className='birthdaylabel'>When is your birthday?
        <DatePicker
          selected={birthday}
          placeholderText='--.--.----'
          dateFormat='dd.MM.yyyy'
          maxDate={new Date()}
          minDate={minYear}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className='birthdayInput'
          {...field}
          onChange={(e: Date) => fieldHandler(e)}
        />
      </label>
      {error && <span className='error'>{error}</span>}

    </div>
  )
}
export default BirthdayPicker;