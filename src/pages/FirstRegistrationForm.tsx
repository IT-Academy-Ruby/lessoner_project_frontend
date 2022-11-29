/* eslint-disable max-len */
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {emailInvalidationRules, passwordRegex} from "../validationRules";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Email from "../components/Email";
import {Link} from "react-router-dom";
import {PASSWORD} from "../constants";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
import {isEmailExists} from "../services/api/isEmailExists";
import Google from "../components/icons/google.svg";
import Facebook from "../components/icons/facebook.svg";
import VK from "../components/icons/vk.svg";
import Phone from "../components/icons/phone.svg";

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
      errors.email = intl.formatMessage({id: "app.firstRegistrationForm.existsInDb"});
    }
    if (emailInvalidationRules.some(rule => rule.test(values.email))) {
      errors.email = intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
    }
    if (!passwordRegex.test(values.password)) {
      errors.password = intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"}, {
        minSymbol, maxSymbol, symbols:  PASSWORD.symbols
      });
    }
    if (values.password.length > maxSymbol || values.password.length < minSymbol) {
      errors.password = intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"}, {minSymbol, maxSymbol});
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = intl.formatMessage({id: "app.firstRegistrationForm.passwordConfrim"});
    }
    if (!(values.hasTermsAndConditions)) {
      errors.hasTermsAndConditions = intl.formatMessage({id: "app.firstRegistrationForm.termsAndConditions"});
    }
    return errors;
  };

  const submitFirstStepForm = (values: FormValues) => {
    console.log("all values are correct", values);
  };

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validate={validate}
        onSubmit={submitFirstStepForm}
      >
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.firstRegistrationForm.title"/>
              </h2>
              <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
              />
              <Field
                name="password"
                component={PasswordAndConfirm}
                minSymbol={minSymbol}
                maxSymbol={maxSymbol}
                isConfirm={false}
                error={touched.password ? errors.password : undefined}
              />
              <Field
                name="confirmPassword"
                component={PasswordAndConfirm}
                minSymbol={minSymbol}
                maxSymbol={maxSymbol}
                isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />
              <Field
                name="hasTermsAndConditions"
                component={Checkbox}
                information={intl.formatMessage({id: "app.checkbox"})}
                link={intl.formatMessage({id: "app.checkbox.terms"})}
                error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined}
              />
              <Button
                buttonType="submit"
                buttonText={intl.formatMessage({id: "app.button.next"})}
                className="button__page"
              />
              <div className="or">
                <span className="line-right"></span>
                <FormattedMessage id="app.or"/>
                <span className="line-left"></span>
              </div>
              <div className="apps-logs">
                <div className="app-logo">
                  <img src={Google} alt="google"/>
                </div>
                <div className="app-logo">
                  <img src={Facebook} alt="facebook"/>
                </div>
                <div className="app-logo">
                  <img src={VK} alt="vk"/>
                </div>
                <div className="app-logo">
                  <img src={Phone} alt="phone"/>
                </div>
              </div>
              <p className="text">
                <FormattedMessage id="app.firstRegistrationForm.haveAccount"/>
                <Link
                  to={"/users/sign_in"}
                  className="link"
                >
                  <FormattedMessage id="app.header.login"/>
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FirstRegistrationForm;
