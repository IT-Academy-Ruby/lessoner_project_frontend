import {Link} from "react-router-dom";
import "../components/modal/modal.scss";
import Button from "../components/Button";
import Code from "../components/Code";
import {Formik, Field, Form} from "formik";
import {CODE} from "../constants";

interface FormErrors {
  [key: string]: string;
}

interface FormValue {
  code: string;
}

const CodeRegex = new RegExp('[0-9a-z]{5}', 'i');

const validate = async (values: FormValue) => {
  let errors: FormErrors = {code: ''};
  if (!CodeRegex.test(values.code)) {
    errors.code += 'An invalid character is present in the Code. ';
  }
  if (values.code.length < CODE.maxLength) {
    errors.code += 'Code should be 5 characters. ';
  }
  return errors;
}
const CodePage = () => {
  return (
    <div className='field'>
      <Formik
        initialValues={{
          code: ''
        }}
        validate={validate}
        onSubmit={(values) => {
          console.log(values) //for example that working
        }}>
        {({errors, touched}) => {
          return (
            <Form>
              <div className='modal'>
                <Link to='/users/sign_in'>
                  <span className='close'>
                  </span>
                </Link>
                <h2 className='title'>Enter the code</h2>
                <p className='modalText'>
                  Now a code will come to your phone. Enter it in a line.
                  <span>
                    <Link to='/users/sign_in/phone_number' className='link'>
                      To change number
                    </Link>
                  </span>
                </p>
                <Field name='code'
                       component={Code}
                       error={touched.code ? errors.code : undefined}/>
                <button type='button' className='link resendCode'>
                  Resend code
                </button>
                <Button buttonType={'submit'} buttonText={'Finish'} className={'button'}/>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default CodePage;