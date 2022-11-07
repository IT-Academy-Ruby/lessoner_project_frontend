import { Formik, Form, Field } from 'formik';
import { Link } from "react-router-dom";
import { passwordRegex } from "../validationRules";
import "../components/modal/modal.scss";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
import { PASSWORD } from "../constants";

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string
}

const SetNewPasswordPage = () => {

  const initialValues: FormValues = {
    password: '',
    confirmPassword: '',
  }

  const validate = async (values: FormValues) => {
    let errors: FormErrors = {};
    if (!passwordRegex.test(values.password)) {
      errors.password = `An invalid character is present in the password. Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters; upper or lower case Latin letters (a–z, A–Z); numbers from 0 to 9; symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
    }
    if (values.password.length >= PASSWORD.maxLength || values.password.length < PASSWORD.minLength) {
      errors.password = `Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters`;
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  }

  const submitFirstStepForm = (values: FormValues) => {
    console.log(values.password);
  };

  return (
    <div className='field'>
      <div className='modal'>
        <Link to='/users/sign_in/'>
          <span className='close'>
          </span>
        </Link>
        <div>
          <h2 className='title'>Login as username</h2>
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validate={validate}
            onSubmit={submitFirstStepForm}
          >
            {({ errors, touched }) => {
              return (
                <Form className="First-Registration-Form">
                  <Field name='password' component={PasswordAndConfirm} minSymbol={PASSWORD.minLength} maxSymbol={PASSWORD.maxLength} isConfirm={false} error={touched.password ? errors.password : undefined} />
                  <Field name='confirmPassword' component={PasswordAndConfirm} minSymbol={PASSWORD.minLength} maxSymbol={PASSWORD.maxLength} isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined} />
                  <button type="submit">Change password</button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>

  )
}
export default SetNewPasswordPage;