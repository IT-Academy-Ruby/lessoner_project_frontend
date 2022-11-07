import {Link} from "react-router-dom";
import UserName from "../components/UserName";
import BirthdayPicker from "../components/BirthdayPicker";
import {USERNAME} from "../constants";
import GenderSelector from "../components/GenderSelector";
import Button from "../components/Button";
import {Formik, Field, Form} from "formik";

const gender=[
{name:'gender',label:'Male',genderValue:'male'},
{name:'gender',label:'Female',genderValue:'female'},
{name:'gender',label:'Other',genderValue:'other'},
];

interface FormValues {
  userName: string;
  birthday: string;
  gender: string;
}

interface FormErrors {
  [key: string]: string
}

const userRegex = new RegExp("[a-z0-9]", "i");

const validate = async (values: FormValues) => {
  let errors: FormErrors = {};
  if (!userRegex.test(values.userName)) {
    errors.userName = 'UserName is incorrect';
  }
  if (values.userName.length < USERNAME.minLength) {
    errors.userName = `UserName should be more ${USERNAME.minLength}`;
  }
  if (values.userName.length > USERNAME.maxLength) {
    errors.userName = `UserName should be less ${USERNAME.maxLength}`;
  }
  if (!values.birthday) {
    errors.birthday = 'Select Date';
  }
  if (!values.gender) {
    errors.gender = 'Select Gender';
  }
  return errors;
}

const YourselfPage = () => {
  return (
    <div className='field'>
      <Formik
        initialValues={{
          userName: '',
          birthday: '',
          gender: '',
        }}
        onSubmit={(values) => {
          console.log(values)
          // alert('Hello word!')
        }}
        validate={validate}
      >
        {({errors, touched}) => {
          return (
            <Form>
              <div className='modal'>
                <Link to='/'>
                  <span className='close'>
                  </span>
                </Link>
                <h2 className='title'>Tell us about yourself</h2>
                <Field name='userName'
                       component={UserName}
                       maxSymbol={USERNAME.maxLength}
                       minSymbol={USERNAME.minLength}
                       error={touched.userName ? errors.userName : undefined}/>
                <Field name='birthday'
                       component={BirthdayPicker}
                       error={touched.birthday ? errors.birthday : undefined}/>
                <Field name='gender'
                       options={gender}
                       component={GenderSelector}
                       error={touched.gender ? errors.gender : undefined}/>
                <Button buttonType='submit' buttonText='Finish' className='button'/>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default YourselfPage;