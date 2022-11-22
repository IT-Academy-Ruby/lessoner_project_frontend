import "../components/modal/modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {
  buttonEvent, getLogin, lookEvent
} from "../store/loginName/loginSlice";
import { emailInvalidationRules, passwordRegex } from "../validationRules";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Button from "../components/Button";
import Email from "../components/Email";
import { Link } from "react-router-dom";
import { PASSWORD } from "../constants";
import Password from "../components/PasswordAndConfirm";
import {useState} from "react";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const LoginPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const loading = useAppSelector(state => state.login.loading);

  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: isChecked,
  };

  return (
    <div className="field">
      {loading &&
        <h1 style={
          {
            position: "fixed", left: "50%", transform: "translate(-50%, -40%)", color: "grey"
          }
        }>Loading...</h1>}
      <Formik
        initialValues={initialValues}

        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (emailInvalidationRules.some(rule => rule.test(values.email))) {
            errors.email = "Please enter a valid email address";
          }
          if (!passwordRegex.test(values.password)) {
            errors.password = `An invalid character is present in the password. 
            Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} 
            characters; upper or lower case Latin letters (a–z, A–Z); numbers from 0 to 9;
             symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
          }
          if (values.password.length > PASSWORD.maxLength
            || values.password.length < PASSWORD.minLength) {
            errors.password = `Password must be between ${PASSWORD.minLength} 
            and ${PASSWORD.maxLength} characters`;
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          dispatch(getLogin(values));
          dispatch(buttonEvent());
          dispatch(lookEvent());
          console.log(values); //for example that working
        }}>
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="modal">
                <Link to="/">
                  <span className="close">
                  </span>
                </Link>
                <h2 className="title">Login to the Lessoner</h2>
                <Field
                  name="email"
                  component={Email}
                  error={touched.email ? errors.email : undefined}
                />
                <Field
                  name="password"
                  component={Password}
                  minSymbol={PASSWORD.minLength}
                  maxSymbol={PASSWORD.maxLength}
                  isConfirm={false}
                  error={touched.password ? errors.password : undefined}
                />
                <div className="checkbox">
                  <Field
                    name="remember"
                    type="checkbox"
                    id="remember"
                    onClick={() => {
                      setIsChecked(!isChecked);
                    }}
                    className={isChecked ? "checked" : "unchecked"}
                  />
                  <label
                    htmlFor="remember"
                    className="label-checkbox"
                  >
                    Stay logged in
                  </label>
                </div>
                <Button
                  buttonType="submit"
                  buttonText="Sign in"
                  className="button"
                />
                <Link to={"/users/sign_in/reset_password"} className='passwordLink'>
                  Forgot your password?
                </Link>
                <Link
                  to={"/users/sign_in/phone_number"}
                  className="button-link"
                >
                  Continue by phone number
                </Link>
                <a
                  href="/"
                  className="button-link"
                >
                  Continue with Google
                </a>
                <a
                  href="/"
                  className="button-link"
                >
                  Continue with Facebook
                </a>
                <a
                  href="/"
                  className="button-link"
                >
                  Continue with VK
                </a>
                <p className="text">
                  Don`t you have an account?
                  <Link
                    to={"/users/sign_up"}
                    className="sign-link"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default LoginPage;