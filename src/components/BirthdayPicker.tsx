import "./input.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./birthday.scss";
import DatePicker, {registerLocale} from "react-datepicker";
import {FieldInputProps, FormikProps} from "formik";
import Birthday from "./icons/Date.svg";
import {FormattedMessage} from "react-intl";
import {enGB} from "date-fns/locale";
import {useState} from "react";

type BirthdayPickerProps<V = string, FormValues = string> = {
  field: FieldInputProps<V>;
  form: FormikProps<FormValues>;
  error: string;
  setIsWrapper: (a:boolean)=>void;
  isWrapper:boolean;
}
const BirthdayPicker = ({
  form, field, error,setIsWrapper
}: BirthdayPickerProps): JSX.Element => {
  registerLocale("enGB", enGB);

  const [birthday, setBirthday] = useState<Date | null>(null);

  const handleChange = (selectedDate: Date) => {
    const {setFieldValue} = form;
    const {name: fieldName} = field;
    setBirthday(selectedDate);
    setFieldValue(fieldName, selectedDate, true);
    console.log((selectedDate.toDateString()))
    // console.log(selectedDate.getFullYear()+"-"+(selectedDate.getMonth()+1)+"-"+selectedDate.getDate())
  };

  const minYear = new Date((new Date()).getTime() -
    120 * 365.2 * 86400000 - 6 * 86400000 + 29.7 * 60000); // this date 120 years ago

  return (
    <label className="input-label">
      <FormattedMessage id="app.birthdaylabel"/>
      <DatePicker
        placeholderText="--.--.----"
        dateFormat="dd.MM.yyyy"
        maxDate={new Date()}
        minDate={minYear}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="input"
        locale="enGB"
        selected={birthday}
        onChange={(value: Date) => handleChange(value)}
        onInputClick={()=>{setIsWrapper(true);}}
        onCalendarClose={()=>{setIsWrapper(false);}}
      />
      <img className="image-input" alt="Date" src={Birthday}/>
      {error && <span className="error-message">{error}</span>}
    </label>

  );
};

export default BirthdayPicker;