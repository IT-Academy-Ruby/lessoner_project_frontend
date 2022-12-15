import "./modal.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {
  buttonEvent, getLogin, lookEvent
} from "../store/loginName/loginSlice";
import {emailInvalidationRules, passwordRegex} from "../validationRules";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Email from "../components/Email";
import Facebook from "../components/icons/facebook.svg";
import Google from "../components/icons/google.svg";
import {PASSWORD} from "../constants";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
import Phone from "../components/icons/phone.svg";
import VK from "../components/icons/vk.svg";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const LoginPage = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isEmail = useAppSelector(state => state.login.isEmail);

  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: false,
  };

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (emailInvalidationRules.some(rule => rule.test(values.email))) {
            errors.email =
              intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
          }
          if (!isEmail && values.email.length > 0) {
            errors.email = intl.formatMessage({id: "app.email.notFound"});
          }
          if (!passwordRegex.test(values.password)) {
            errors.password =
              intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"});
          }
          if (values.password.length > PASSWORD.maxLength
            || values.password.length < PASSWORD.minLength) {
            errors.password =
              intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"});
          }
          return errors;
        }}
        onSubmit={(values: { email: string, password: string }) => {
          dispatch(getLogin(values));

          dispatch(buttonEvent());
          dispatch(lookEvent());
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
              <Link to="/user/sign_in/reset_password" className="">
                <FormattedMessage id="app.loginPage.password"/>
              </Link>
              <Link to="/user/sign_in/reset_password" className="password-link">
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
                <Link to="/user/sign_in/phone_numberA" className="app-logo">
                  <img src={Phone} alt="phone"/>
                </Link>
              </div>
              <p className="text">
                <FormattedMessage id="app.don'tAccount"/>
                <Link
                  to={"/user/sign_up"}
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