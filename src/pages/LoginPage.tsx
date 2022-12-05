import "./modal.scss";
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
import {getLogin} from "../store/loginName/loginSlice";
import {useAppDispatch} from "../store/hooks";
import {useState} from "react";
import Google from "../components/icons/google.svg";
import Facebook from "../components/icons/facebook.svg";
import VK from "../components/icons/vk.svg";
import Phone from "../components/icons/phone.svg";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  [key: string]: string
}

const minSymbol = PASSWORD.minLength;
const maxSymbol = PASSWORD.maxLength;
const symbols = "! # $ % & ' * + - / = ? ^ _  { | } ~";

const LoginPage = () => {
  const intl = useIntl();
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: isChecked,
  };

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (emailInvalidationRules.some(rule => rule.test(values.email))) {
            errors.email = intl.formatMessage({ id: "app.firstRegistrationForm.invalidationRules" });
          }
          if (!passwordRegex.test(values.password)) {
            errors.password = intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"});
          }
          if (values.password.length > PASSWORD.maxLength
            || values.password.length < PASSWORD.minLength) {
            errors.password = intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"});
          }
          return errors;
        }}
        onSubmit={(values: { email: string, password: string }) => {
          dispatch(getLogin(values));
          console.log(values); //for example that working
        }}>
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.login.title"/>
              </h2>
              <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
              />
              <Field
                name="password"
                component={PasswordAndConfirm}
                minSymbol={PASSWORD.minLength}
                maxSymbol={PASSWORD.maxLength}
                isConfirm={false}
                error={touched.password ? errors.password : undefined}
              />
              <Field
                name="remember"
                component={Checkbox}
                information={intl.formatMessage({id: "app.loginPage.checkbox"})}
              />
              <Button
                buttonType="submit"
                buttonText={intl.formatMessage({id: "app.button.signIn"})}
                className="button__page"
              />
              <Link to={"/users/sign_in/reset_password"} className="password-link">
                <FormattedMessage id="app.loginPage.password"/>
              </Link>
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
                <FormattedMessage id="app.don'tAccount"/>
                <Link
                  to={"/users/sign_up"}
                  className="link"
                >
                  <FormattedMessage id="app.signUp"/>
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default LoginPage;