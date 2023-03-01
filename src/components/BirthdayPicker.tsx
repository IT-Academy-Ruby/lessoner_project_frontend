import "./input.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./birthday.scss";
import DatePicker, {registerLocale} from "react-datepicker";
import {FieldInputProps, FormikProps} from "formik";
import Birthday from "./icons/Date.svg";
import {enGB, ru} from "date-fns/locale";
import {useIntl} from "react-intl";
import {useState} from "react";

type BirthdayPickerProps<V = string, FormValues = string> = {
  field: FieldInputProps<V>;
  form: FormikProps<FormValues>;
  error: string;
  setIsWrapper: (a: boolean) => void;
  isWrapper: boolean;
  text: string;
}

const BirthdayPicker = ({
  form, field, error, setIsWrapper, text
}: BirthdayPickerProps): JSX.Element => {
  const intl = useIntl();
  if (intl.locale === "en") {
    registerLocale("lang", enGB);
  } else {
    registerLocale("lang", ru);
  }

  const [birthday, setBirthday] = useState<Date | null>(null);

  const handleChange = (selectedDate: Date) => {
    const {setFieldValue} = form;
    const {name: fieldName} = field;
    setBirthday(selectedDate);
    setFieldValue(fieldName, selectedDate, true);
  };

  const minYear = new Date((new Date()).getTime() -
    120 * 365.2 * 86400000 - 6 * 86400000 + 29.7 * 60000); // this date 120 years ago

  return (
    <label className="input-label">
      {text}
      <DatePicker
        placeholderText="--.--.----"
        dateFormat="dd.MM.yyyy"
        maxDate={new Date()}
        minDate={minYear}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="input"
        locale="lang"
        selected={birthday}
        onChange={(value: Date) => handleChange(value)}
        onInputClick={() => {
          setIsWrapper(true);
        }}
        onCalendarClose={() => {
          setIsWrapper(false);
        }}
      />
      <img className="image-input" alt="Date" src={Birthday}/>
      {error && <span className="error-message">{error}</span>}
    </label>

  );
};

export default BirthdayPicker;