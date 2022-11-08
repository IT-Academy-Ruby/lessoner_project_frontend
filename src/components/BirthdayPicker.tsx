import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import "./birthday.scss";
import {enGB} from "date-fns/locale";
import {FieldInputProps, FormikProps} from "formik";

type BirthdayPickerProps<V = any, FormValues = any> = {
  field: FieldInputProps<V>;
  form: FormikProps<FormValues>;
  error: string;
}
const BirthdayPicker = ({form, field, error}: BirthdayPickerProps): JSX.Element => {
  registerLocale('enGB', enGB);

  const [birthday, setBirthday] = useState<Date | null>(null);

  const handleChange = (selectedDate: Date) => {
    const {setFieldValue} = form;
    const {name: fieldName} = field;

    setBirthday(selectedDate);
    setFieldValue(fieldName, selectedDate, true);
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
          selected={birthday}
          onChange={(value: Date) => handleChange(value)}
        />
      </label>
      {error && <span className='error'>{error}</span>}
    </div>
  )
}
export default BirthdayPicker;