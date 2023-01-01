/* eslint-disable max-len */
import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {emailInvalidationRules, passwordRegex} from "../validationRules";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Email from "../components/Email";
import Facebook from "../components/icons/facebook.svg";
import Google from "../components/icons/google.svg";
import {PASSWORD} from "../constants";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
import Phone from "../components/icons/phone.svg";
import VK from "../components/icons/vk.svg";
import { useAppSelector } from "../store/hooks";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  hasTermsAndConditions: boolean;
}

interface FormErrors {
  [key: string]: string;
}

type FirstRegistrationFormProps = {
  setUserPassword: (str: string) => void;
  setUserEmail: (str: string) => void;
}

const minSymbol = PASSWORD.minLength;
const maxSymbol = PASSWORD.maxLength;
const symbols = PASSWORD.symbols;

const FirstRegistrationForm = ({setUserPassword, setUserEmail}: FirstRegistrationFormProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const isEmail = useAppSelector(state => state.login.isEmail);
  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    hasTermsAndConditions: false
  };

  const validate = (values: FormValues) => {

    const errors: FormErrors = {};

    if (emailInvalidationRules.some(rule => rule.test(values.email))) {
      errors.email = intl.formatMessage({ id: "app.firstRegistrationForm.invalidationRules" });
    }
    if (isEmail) {
      errors.email = intl.formatMessage({ id: "app.firstRegistrationForm.existsInDb" });
    }
    if (!passwordRegex.test(values.password)) {
      errors.password = intl.formatMessage({ id: "app.firstRegistrationForm.passwordRegEx" }, {
        minSymbol: minSymbol, maxSymbol: maxSymbol, symbols: symbols
      });
    }
    if (values.password.length > maxSymbol || values.password.length < minSymbol) {
      errors.password = intl.formatMessage(
        { id: "app.firstRegistrationForm.passwordLength" }, { minSymbol: minSymbol, maxSymbol: maxSymbol }
      );
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = intl.formatMessage({ id: "app.firstRegistrationForm.passwordConfrim" });
    }
    if (!(values.hasTermsAndConditions)) {
      errors.hasTermsAndConditions = intl.formatMessage({ id: "app.firstRegistrationForm.termsAndConditions" });
    }
    return errors;
  };


  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validate={validate}
        onSubmit={(values: FormValues) => {
          setUserEmail(values.email);
          setUserPassword(values.password);
          navigate("/user/reg_in/information");
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.firstRegistrationForm.title" />
              </h2>
              <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
                needEmail={false}
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
                isConfirm={true}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />
              <Field
                name="hasTermsAndConditions"
                component={Checkbox}
                information={intl.formatMessage({ id: "app.checkbox" })}
                link={intl.formatMessage({ id: "app.checkbox.terms" })}
                error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined}
              />
              <Button
                buttonType="submit"
                buttonText={intl.formatMessage({ id: "app.button.next" })}
                className="button__page"
              />
              <div className="or">
                <span className="line-right"></span>
                <FormattedMessage id="app.or" />
                <span className="line-left"></span>
              </div>
              <div className="apps-logs">
                <Link to="/user/google" className="app-logo">
                  <img src={Google} alt="google"/>
                </Link>
                <Link to="/user/facebook" className="app-logo">
                  <img src={Facebook} alt="facebook"/>
                </Link>
                <Link to="/user/vk" className="app-logo">
                  <img src={VK} alt="vk"/>
                </Link>
                <Link to="/user/sign_in/phone_numberR" className="app-logo">
                  <img src={Phone} alt="phone"/>
                </Link>
              </div>
              <p className="text">
                <FormattedMessage id="app.firstRegistrationForm.haveAccount" />
                <Link
                  to={"/user/sign_in"}
                  className="link"
                >
                  <FormattedMessage id="app.header.login" />
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
