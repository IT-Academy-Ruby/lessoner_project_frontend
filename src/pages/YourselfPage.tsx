import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {UserRegex, emailInvalidationRules} from "../validationRules";
import BirthdayPicker from "../components/BirthdayPicker";
import Button from "../components/Button";
import Email from "../components/Email";
import GenderSelector from "../components/GenderSelector";
import {USERNAME} from "../constants";
import UserName from "../components/UserName";
import {useState} from "react";

const gender = [
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.male"/>,
    genderValue: "male"
  },
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.female"/>,
    genderValue: "female"
  },
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.other"/>,
    genderValue: "other"
  }];

interface FormValues {
  email: string;
  userName: string;
  birthday: string;
  gender: string;
}

interface FormErrors {
  [key: string]: string
}

const YourselfPage = () => {
  const intl = useIntl();
  const [isWrapper, setIsWrapper] = useState(false);

  const validate = async (values: FormValues) => {
    const errors: FormErrors = {};
    if (emailInvalidationRules.some(rule => rule.test(values.email))) {
      errors.email = intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
    }
    if (!UserRegex.test(values.userName)) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorIncorrectName"});
    }
    if (values.userName.length === 0) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
    }
    if (values.userName.length < USERNAME.minLength && values.userName.length > 0) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorSmalName"},{
        minSymbol:USERNAME.minLength
      });
    }
    if (values.userName.length > USERNAME.maxLength) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorBigName"},{
        maxSymbol:USERNAME.maxLength
      });
    }
    if (!values.birthday) {
      errors.birthday = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
    }
    if (!values.gender) {
      errors.gender = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
    }
    return errors;
  };
  return (
    <div className="log-content">
      <Formik
        initialValues={{
          email: "",
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
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.pagesTitle.aboutYourself"/>
              </h2>
              <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
              />
              <Field
                name="userName"
                component={UserName}
                error={touched.userName ? errors.userName : undefined}/>
              <Field
                name="birthday"
                component={BirthdayPicker}
                error={touched.birthday ? errors.birthday : undefined}
                setIsWrapper={setIsWrapper}
                isWrapper={isWrapper}
              />
              <Field
                name="gender"
                options={gender}
                component={GenderSelector}
                error={touched.gender ? errors.gender : undefined}/>
              <Button
                buttonType="submit"
                buttonText={intl.formatMessage({id: "app.button.finish"})}
                className="button__page"/>
              {isWrapper ? <div className="date-wrapper"></div> : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default YourselfPage;