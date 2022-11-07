import { Formik, Form, Field } from 'formik';
import Email from "./Email";
import PasswordAndConfirm from './PasswordAndConfirm';
import Checkbox from './Checkbox';
import './FirstRegistrationForm.scss';
import { isEmailExists } from '../services/api/isEmailExists';
import { emailInvalidationRules, passwordRegex } from '../validationRules';
import { PASSWORD } from '../constants';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  hasTermsAndConditions: boolean;
}

interface FormErrors {
  [key: string]: string
}

const FirstRegistrationForm = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    hasTermsAndConditions: false
  }

  const validate = async (values: FormValues) => {
    const isEmailExistsInDB = await isEmailExists(values.email);

    let errors: FormErrors = {};
    if (isEmailExistsInDB) {
      errors.email = 'This email address is already registered';
    }
    if (emailInvalidationRules.some(rule => rule.test(values.email))) {
      errors.email = 'Please enter a valid email address';
    }
    if (!passwordRegex.test(values.password)) {
      errors.password = `An invalid character is present in the password. Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters; upper or lower case Latin letters (a–z, A–Z); numbers from 0 to 9; symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
    }
    if (values.password.length >= PASSWORD.maxLength || values.password.length < PASSWORD.minLength) {
      errors.password = `Password must be between ${PASSWORD.minLength} and ${PASSWORD.maxLength} characters`;
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!(values.hasTermsAndConditions)) {
      errors.hasTermsAndConditions = 'You must consent to the processing of your personal data, in accordance with the Terms';
    }
    return errors;
  }

  const submitFirstStepForm = (values: FormValues) => {
    console.log('all values are correct');
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
            <Form className="First-Registration-Form">
              <Field name='email' component={Email} error={touched.email ? errors.email : undefined} />
              <Field name='password' component={PasswordAndConfirm} minSymbol={PASSWORD.minLength} maxSymbol={PASSWORD.maxLength} isConfirm={false} error={touched.password ? errors.password : undefined} />
              <Field name='confirmPassword' component={PasswordAndConfirm} minSymbol={PASSWORD.minLength} maxSymbol={PASSWORD.maxLength} isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined} />
              <Field name='hasTermsAndConditions' component={Checkbox} error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined} />
              <button type="submit">Next</button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
};

export default FirstRegistrationForm;