import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import "./birthday.scss";
import { registerLocale} from  "react-datepicker";
import {enGB} from 'date-fns/locale';
registerLocale('enGB', enGB)

type BirthdayPickerProps = {
  field: {
    name: string,
    onChange: ()=>{},
    // onBlur:React.FocusEventHandler<HTMLInputElement>,
    value: string,
  };
  error: any;
}

const BirthdayPicker = ({field, error}: BirthdayPickerProps): JSX.Element => {

  const [birthday, setBirthday] = useState<Date>(new Date());
  const [value, setValue] = useState('');

  const fieldHandler = (date: Date) => {
    setValue(JSON.parse(JSON.stringify(date)))
    setBirthday(date)
    // field.value=value
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
          locale='enGB'
          // selected={birthday}
          {...field}
          onChange={(value:Date) => fieldHandler(value)}
          value={value}
        />
      </label>
      {error && <span className='error'>{error}</span>}
    </div>
  )
}
export default BirthdayPicker;