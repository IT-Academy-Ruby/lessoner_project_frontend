import "react-phone-input-2/lib/style.css";
import "./input.scss";
import "./phoneNumber.scss";
import {FieldInputProps, FormikProps} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import React, {useState} from "react";
import {DEFAULT_COUNTRY_CODE} from "../constants";
import Magmagnifying from "./icons/magnifying_glass.svg";
import PhoneInput from "react-phone-input-2";
import classNames from "classnames";

const deleteCountry: [string] = ["ke"];

type PhoneNumberProps<V = string, FormValues = string> = {
  field: FieldInputProps<V>;
  form: FormikProps<FormValues>;
  isError: boolean;
  setIsError: (bool: boolean) => void;
  error: string;
  phoneNumber: string,
  setPhoneNumber: (str: string) => void;
}

type countryType = {
  countryCode: string,
  dialCode: string,
  format: string,
  name: string
}

const PhoneNumber = ({
                       field, error, form, isError, setIsError, phoneNumber, setPhoneNumber
                     }: PhoneNumberProps) => {
  const intl = useIntl();

  const checkNumber =
    (value: string, country: countryType, e: React.ChangeEvent<HTMLDivElement>,
     formattedValue: string) => {
      const {setFieldValue} = form;
      const {name: fieldName} = field;
      setFieldValue(fieldName, formattedValue, true);

        if (country.format) {
          if (formattedValue.split(" ").join("").length
            !== country.format.split(" ").join("").length) {
            setIsError(true);
          } else {
            setIsError(false);
          }
        }

      setPhoneNumber(value);
    };

  return (
    <label className="input-label">
      <FormattedMessage id="app.phoneNumber.label"/>
      <img src={Magmagnifying} alt="" className="magmagnifying_glas"/>
      <PhoneInput
        onChange={checkNumber}
        excludeCountries={deleteCountry}
        value={phoneNumber}
        placeholder=""
        enableLongNumbers={true}
        inputProps={{style: error ? {border: "1px solid red"} : null}}
      />
      <div className="symbol">&#10095;</div>
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default PhoneNumber;