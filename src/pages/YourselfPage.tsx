import {
  Field, Form, Formik
} from "formik";
import BirthdayPicker from "../components/BirthdayPicker";
import Button from "../components/Button";
import GenderSelector from "../components/GenderSelector";
import {Link} from "react-router-dom";
import {USERNAME} from "../constants";
import UserName from "../components/UserName";


const gender = [{
  name: "gender", label: "Male", genderValue: "male"
},
  {
    name: "gender", label: "Female", genderValue: "female"
  },
  {
    name: "gender", label: "Other", genderValue: "other"
  }];

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
  const errors: FormErrors = {};
  if (!userRegex.test(values.userName)) {
    errors.userName = "UserName is incorrect";
  }
  if (values.userName.length === 0) {
    errors.userName = "The field must not be empty";
  }
  if (values.userName.length < USERNAME.minLength && values.userName.length > 0) {
    errors.userName = `UserName should be more ${USERNAME.minLength}`;
  }
  if (values.userName.length > USERNAME.maxLength) {
    errors.userName = `UserName should be less ${USERNAME.maxLength}`;
  }
  if (!values.birthday) {
    errors.birthday = "The field must not be empty";
  }
  if (!values.gender) {
    errors.gender = "The field must not be empty";
  }
  return errors;
};

const YourselfPage = () => {
  return (
    <div className="field">
      <Formik
        initialValues={{
          userName: "",
          birthday: "",
          gender: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validate={validate}
      >
        {({errors, touched}) => {
          return (
            <Form>
              <div className="modal">
                <Link to="/">
                  <span className="close">
                  </span>
                </Link>
                <h2 className="title">Tell us about yourself</h2>
                <Field
                  name="userName"
                  component={UserName}
                  maxSymbol={USERNAME.maxLength}
                  minSymbol={USERNAME.minLength}
                  error={touched.userName ? errors.userName : undefined}/>
                <Field
                  name="birthday"
                  component={BirthdayPicker}
                  error={touched.birthday ? errors.birthday : undefined}/>
                <Field
                  name='gender'
                  options={gender}
                  component={GenderSelector}
                  error={touched.gender ? errors.gender : undefined}/>
                <Button buttonType="submit" buttonText="Finish" className="button"/>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default YourselfPage;