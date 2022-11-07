import "../components/modal/modal.scss";
import Email from "../components/Email";
import Password from "../components/PasswordAndConfirm";
import { Formik, Field, Form } from "formik";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { getLogin } from "../store/loginName/loginSlice";
import { PASSWORD } from "../constants";
import { emailInvalidationRules, passwordRegex } from "../validationRules";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  [key: string]: string
}

const validate = async (values: FormValues) => {
  let errors: FormErrors = {};
  if (emailInvalidationRules.some(rule => rule.test(values.email))) {
    errors.email = 'Please enter a valid email address';
  }
  if (!passwordRegex.test(values.password)) {
    errors.password = `An invalid character is present in the password. Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters; upper or lower case Latin letters (a–z, A–Z); numbers from 0 to 9; symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
  }
  if (values.password.length >= PASSWORD.maxLength || values.password.length < PASSWORD.minLength) {
    errors.password = `Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters`;
  }
  return errors;
}

const LoginPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: '',
    password: '',
    remember: isChecked,
  }

  return (
    <div className='field'>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values: object) => {
          dispatch(getLogin(values))
          console.log(values); //for example that working
        }}>
        {({ errors, touched }) => {
          return (
            <Form>
              <div className='modal'>
                <Link to='/'>
                  <span className='close'>
                  </span>
                </Link>
                <h2 className='title'>Login to the Lessoner</h2>
                <Field
                  name='email'
                  component={Email}
                  error={touched.email ? errors.email : undefined}
                />
                <Field
                  name='password'
                  component={Password}
                  minSymbol={PASSWORD.minLength}
                  maxSymbol={PASSWORD.maxLength}
                  isConfirm={false}
                  error={touched.password ? errors.password : undefined}
                />
                <div className='checkbox'>
                  <Field
                    name='remember'
                    type='checkbox'
                    id='remember'
                    onClick={() => {
                      setIsChecked(!isChecked)
                    }}
                    className={isChecked ? 'checked' : 'unchecked'}
                  />
                  <label
                    htmlFor='remember'
                    className='labelCheckbox'
                  >
                    Stay logged in
                  </label>
                </div>
                <Button
                  buttonType='submit'
                  buttonText='Sign in'
                  className='button'
                />
                <Link to={'/users/sign_in/reset_password'} className='passwordLink'>
                  Forgot your password?
                </Link>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default LoginPage;