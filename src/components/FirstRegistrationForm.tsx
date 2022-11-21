/* eslint-disable max-len */
import "./FirstRegistrationForm.scss";
import {
  Field, Form, Formik
} from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { emailInvalidationRules, passwordRegex } from "../validationRules";
import { GOOGLE_APP, PASSWORD } from "../constants";
import Checkbox from "./Checkbox";
import Email from "./Email";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PasswordAndConfirm from "./PasswordAndConfirm";
import VKButton from "./VKButton";
import {isEmailExists} from "../services/api/isEmailExists";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  hasTermsAndConditions: boolean;
}

interface FormErrors {
  [key: string]: string
}

const minSymbol = PASSWORD.minLength;
const maxSymbol = PASSWORD.maxLength;
const allowPasswordSymbols = "! # $ % & ' * + - / = ? ^ _  { | } ~";

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
    if (values.password.length > maxSymbol || values.password.length < minSymbol) {
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
            <div className="first-registration-form">
              <Form>
                <Field name='email' component={Email} error={touched.email ? errors.email : undefined} />
                <Field
                  name='password' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol}
                  isConfirm={false} error={touched.password ? errors.password : undefined} />
                <Field
                  name='confirmPassword' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol}
                  isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined} />
                <Field
                  name='hasTermsAndConditions' component={Checkbox}
                  error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined} />
                <button className='registration-form-submit-button' type="submit">
                  <FormattedMessage id="app.firstRegistrationForm.button" />
                </button>
                <GoogleOAuthProvider clientId={GOOGLE_APP.id}><GoogleButton /></GoogleOAuthProvider>
                <FacebookButton />
                <VKButton />
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default FirstRegistrationForm;
