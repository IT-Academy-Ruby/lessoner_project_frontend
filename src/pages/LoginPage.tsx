import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {clearError, getLogin} from "../store/loginName/loginSlice";
import {emailInvalidationRules, passwordRegex} from "../validationRules";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Email from "../components/Email";
// import Facebook from "../components/icons/facebook.svg";
// import Google from "../components/icons/google.svg";
import {PASSWORD} from "../constants";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
// import Phone from "../components/icons/phone.svg";
// import VK from "../components/icons/vk.svg";
import {uploadModalData} from "../store/modalSlice/modalSlice";

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
  const [isLogEmail, setIslogEmail] = useState(false);
  // const [isModal, setIsModal] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const loginResponse = useAppSelector(state => state.login.userToken);

  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: false,
  };

  useEffect(() => {
    if (loginResponse.error) {
      dispatch(uploadModalData({
        text: loginResponse.error,
        typeModal: true,
        isOpen: true,
      }));
      dispatch(clearError());
      setIslogEmail(true);
    }
    if(loginResponse.jwt){
      if(isRemember){
        localStorage.setItem("JWT", loginResponse.jwt);
      }
      if(!isRemember){
        sessionStorage.setItem("JWT", loginResponse.jwt);
      }
      navigate("/");
      setIslogEmail(false);
    }
  }, [dispatch, isRemember, navigate, loginResponse]);

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (!emailInvalidationRules.test(values.email)) {
            errors.email =
              intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
          }
          if (!passwordRegex.test(values.password)) {
            errors.password =
              intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"}, {
                minSymbol: PASSWORD.minLength, maxSymbol: PASSWORD.maxLength,
                symbols: PASSWORD.symbols
              });
          }
          if (values.password.length > PASSWORD.maxLength
            || values.password.length < PASSWORD.minLength) {
            errors.password =
              intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"},
                {minSymbol: PASSWORD.minLength, maxSymbol: PASSWORD.maxLength});
          }
          if(values.remember){
            setIsRemember(true);
          }

          return errors;
        }}
        onSubmit={(values: FormValues) => {
          dispatch(getLogin(values));
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
                isEmail={isLogEmail}
                textError={intl.formatMessage({id: "app.incorectEmailOrPassword"})}
              />
              <Field
                name="password"
                component={PasswordAndConfirm}
                minSymbol={PASSWORD.minLength}
                maxSymbol={PASSWORD.maxLength}
                isConfirm={true}
                error={touched.password ? errors.password : undefined}
                wrongPassword={isLogEmail}
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
              <Link to="/user/sign_in/reset_password" className="password-link">
                <FormattedMessage id="app.loginPage.password"/>
              </Link>
              {/*<div className="or">*/}
              {/*  <span className="line-right"></span>*/}
              {/*  <FormattedMessage id="app.or" />*/}
              {/*  <span className="line-left"></span>*/}
              {/*</div>*/}
              {/*<div className="apps-logs">*/}
              {/*  <div className="app-logo">*/}
              {/*    <img src={Google} alt="google" />*/}
              {/*  </div>*/}
              {/*  <div className="app-logo">*/}
              {/*    <img src={Facebook} alt="facebook" />*/}
              {/*  </div>*/}
              {/*  <div className="app-logo">*/}
              {/*    <img src={VK} alt="vk" />*/}
              {/*  </div>*/}
              {/*  <Link to="/user/sign_in/phone_numberA" className="app-logo">*/}
              {/*    <img src={Phone} alt="phone" />*/}
              {/*  </Link>*/}
              {/*</div>*/}
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
