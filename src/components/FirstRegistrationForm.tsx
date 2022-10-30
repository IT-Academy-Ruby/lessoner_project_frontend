import { Formik, Form, Field } from 'formik';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Email from "./Email";
import PasswordAndConfirm from './PasswordAndConfirm';
import Checkbox from './Checkbox';
import { isEmailExists } from '../services/api/isEmailExists';
import VKButton from './VKButton';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import { GOOGLE_APP } from '../constants';
import './FirstRegistrationForm.scss';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  hasTermsAndConditions: boolean;
}

interface FormErrors {
  [key: string]: string
}

const emailInvalidationRules = [
  /^\s*$/, // check string not empty
  /^[^@]+$/, // @ should exist
  /@[^@]*@/, // onle one @ is admissible
  /^\./, // '.' can't be first symbol
  /\.{2,}.+(?=@)/, // '.' can't repeat more than once in a row
  /\.(?=@)/, // '.' can't be before @
  /[^A-Za-z0-9_!#$%&'.*+\-/=?^`{|}~].*(?=@)/, // include only valid symbols before @
  /(?<=@).*[^a-z0-9\-.]/, // include only valid symbols before @
];

const minSymbol = 6;
const maxSymbol = 256;
const passwordRegex = new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" + minSymbol + "," + maxSymbol + "}$", "i");

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
      errors.password = `An invalid character is present in the password. Password must be between ${minSymbol} and ${maxSymbol} characters; upper or lower case Latin letters (a–z, A–Z); numbers from 0 to 9; symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
    }
    if (values.password.length >= maxSymbol || values.password.length < minSymbol) {
      errors.password = `Password must be between ${minSymbol} and ${maxSymbol} characters`;
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
            <div className="First-Registration-Form">
              <Form>
                <Field name='email' component={Email} error={touched.email ? errors.email : undefined} />
                <Field name='password' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol} isConfirm={false} error={touched.password ? errors.password : undefined} />
                <Field name='confirmPassword' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol} isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined} />
                <Field name='hasTermsAndConditions' component={Checkbox} error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined} />
                <button className='Registration-Form-Submit-Button' type="submit">Next</button>
              </Form>
              <GoogleOAuthProvider clientId={GOOGLE_APP.id}><GoogleButton /></GoogleOAuthProvider>
              <FacebookButton />
              <VKButton />
            </div>
          )
        }}
      </Formik>
    </div>
  )
};

export default FirstRegistrationForm;