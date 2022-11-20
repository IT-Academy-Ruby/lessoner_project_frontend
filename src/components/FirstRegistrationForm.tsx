/* eslint-disable max-len */
import "./FirstRegistrationForm.scss";
import {
  Field, Form, Formik 
} from "formik";
import { FormattedMessage , useIntl } from "react-intl";
import Checkbox from "./Checkbox";
import Email from "./Email";
import PasswordAndConfirm from "./PasswordAndConfirm";
import { isEmailExists } from "../services/api/isEmailExists";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  hasTermsAndConditions: boolean;
}

interface FormErrors {
  [key: string]: string
}

const emailInvalidationRules = [
  /^\s*$/, // check string not empty
  /^[^@]+$/, // @ should exist
  /@[^@]*@/, // onle one @ is admissible
  /^\./, // '.' can't be first symbol
  /\.{2,}.+(?=@)/, // '.' can't repeat more than once in a row
  /\.(?=@)/, // '.' can't be before @
  /[^A-Za-z0-9_!#$%&'.*+\-/=?^`{|}~].*(?=@)/, // include only valid symbols before @
  /(?<=@).*[^a-z0-9\-.]/, // include only valid symbols before @
];

const minSymbol = 6;
const maxSymbol = 256;
const allowPasswordSymbols= "! # $ % & ' * + - / = ? ^ _  { | } ~";
const passwordRegex = new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" + minSymbol + "," + maxSymbol + "}$", "i");
const FirstRegistrationForm = () => {
  const intl = useIntl();
  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    hasTermsAndConditions: false
  };

  const validate = async (values: FormValues) => {
    const isEmailExistsInDB = await isEmailExists(values.email);

    const errors: FormErrors = {};
    if (isEmailExistsInDB) {

      errors.email = intl.formatMessage({ id: "app.firstRegistrationForm.existsInDb" });
    }
    if (emailInvalidationRules.some(rule => rule.test(values.email))) {
      errors.email = intl.formatMessage({ id: "app.firstRegistrationForm.invalidationRules" });
    }
    if (!passwordRegex.test(values.password)) {
      errors.password = intl.formatMessage({ id: "app.firstRegistrationForm.passwordRegEx" }, {
        minSymbol, maxSymbol, symbols: allowPasswordSymbols 
      });
    }
    if (values.password.length >= maxSymbol || values.password.length < minSymbol) {
      errors.password = intl.formatMessage({ id: "app.firstRegistrationForm.passwordLength" }, { minSymbol, maxSymbol });
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = intl.formatMessage({ id: "app.firstRegistrationForm.passwordConfrim" });
    }
    if (!(values.hasTermsAndConditions)) {
      errors.hasTermsAndConditions = intl.formatMessage({ id: "app.firstRegistrationForm.termsAndConditions" });
    }
    return errors;
  };

  const submitFirstStepForm = (values: FormValues) => {
    console.log("all values are correct", values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validate={validate}
        onSubmit={submitFirstStepForm}
      >
        {({ errors, touched }) => {
          return (
            <Form className="First-Registration-Form">
              <Field name='email' component={Email} error={touched.email ? errors.email : undefined} />
              <Field name='password' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol} isConfirm={false} error={touched.password ? errors.password : undefined} />
              <Field name='confirmPassword' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol} isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined} />
              <Field name='hasTermsAndConditions' component={Checkbox} error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined} />
              <button type="submit">
                <FormattedMessage id="app.firstRegistrationForm.button" />
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FirstRegistrationForm;
