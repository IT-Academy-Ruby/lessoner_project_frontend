import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import "./birthday.scss";


type BirthdayPickerProps = {
  field: {
    name: string,
    onChange:React.ChangeEventHandler<HTMLInputElement>,
    // value: string,
  };
  error: string;
}

const BirthdayPicker = ({field, error}: BirthdayPickerProps): JSX.Element => {
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [value, setValue] = useState('');

  const fieldHandler = (date: Date) => {
    setBirthday(date)
  }

  const minYear = new Date((new Date()).getTime() -
    120 * 365.2 * 86400000 - 6 * 86400000 + 29.7 * 60000); // this date 120 years ago

  return (
    <div className='birthday'>
      <label className='birthdaylabel'>When is your birthday?
        <DatePicker
          placeholderText='--.--.----'
          dateFormat='dd.MM.yyyy'
          maxDate={new Date()}
          minDate={minYear}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className='birthdayInput'
          selected={birthday}
          {...field}
          name='birthday'
          onChange={(e: Date) => fieldHandler(e)}
        />
      </label>
      {error && <span className='error'>{error}</span>}
    </div>
  )
}
export default BirthdayPicker;