import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import "./birthday.scss";

const BirthdayPicker = () => {
  const [value, setValue] = useState<Date | null>(null);
  const fieldHandler = (date: Date) => {
    setValue(date);
  }
  const minYear = new Date((new Date()).getTime() -
    120 * 365.2 * 86400000 - 6 * 86400000 + 29.7 * 60000); // this date 120 years ago

  return (
    <div className='birthday'>
      <label className='birthdaylabel'>When is your birthday?
        <DatePicker onChange={(e: Date) => fieldHandler(e)}
                    selected={value}
                    placeholderText='--.--.----'
                    dateFormat='dd.MM.yyyy'
                    maxDate={new Date()}
                    minDate={minYear}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className='birthdayInput'
                    required/>
      </label>
    </div>
  )
}
export default BirthdayPicker;