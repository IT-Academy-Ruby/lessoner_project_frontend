// import "../components/Pages.scss";
import {
  Field, Form, Formik
} from "formik";
import { emailInvalidationRules, passwordRegex } from "../validationRules";
import Button from "../components/Button";
import Email from "../components/Email";
import { Link } from "react-router-dom";
import { PASSWORD } from "../constants";
import Password from "../components/PasswordAndConfirm";
import { getLogin } from "../store/loginName/loginSlice";
import { useAppDispatch } from "../store/hooks";
import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  [key: string]: string
}

const validate = async (values: FormValues) => {
  const errors: FormErrors = {};
  if (emailInvalidationRules.some(rule => rule.test(values.email))) {
    errors.email = "Please enter a valid email address";
  }
  if (!passwordRegex.test(values.password)) {
    errors.password = `An invalid character is present in the password. Password must be between 
    ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters;
     upper or lower case Latin letters (a–z, A–Z);
      numbers from 0 to 9; symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
  }
  if (values.password.length >= PASSWORD.maxLength || values.password.length < PASSWORD.minLength) {
    errors.password = `Password must be between 
    ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters`;
  }
  return errors;
};

const LoginPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: "",
    password: "",
    remember: isChecked,
  };

  return (
    <div className="reg__content">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values: { email: string, password: string }) => {
          dispatch(getLogin(values));
          console.log(values); //for example that working
        }}>
        {({ errors, touched }) => {
          return (
            <Form>
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
                  className="button__page"
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
                <p className="text">
                  Don`t you have an account?
                  <Link
                    to={"/users/sign_up"}
                    className="sign-link"
                  >
                    Sign up
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