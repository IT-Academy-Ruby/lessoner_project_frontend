import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {UserRegex, emailInvalidationRules} from "../validationRules";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import BirthdayPicker from "../components/BirthdayPicker";
import Button from "../components/Button";
import Email from "../components/Email";
import GenderSelector from "../components/GenderSelector";
import {USERNAME} from "../constants";
import UserName from "../components/UserName";
import {signUpSlice} from "../store/loginName/loginSlice";
import {useNavigate} from "react-router-dom";
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
  userName: string;
  gender: string;
  email: string;
  birthday: string;
  password: string
  phone:string;
}

interface FormErrors {
  [key: string]: string
}

type YourselfPageProps = {
  registration: boolean | undefined;
  userPassword: string;
  userEmail: string;
};

const YourselfPage = ({registration, userEmail, userPassword}: YourselfPageProps) => {
  const minSymbol = USERNAME.minLength;
  const maxSymbol = USERNAME.maxLength;
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmail = useAppSelector(state => state.login.isEmail);
  const isUser = useAppSelector((state) => state.user.isLogged);
  const loading = useAppSelector(state => state.login.loading);

  const [isWrapper, setIsWrapper] = useState(false);

  const validate = async (values: FormValues) => {
    const errors: FormErrors = {};
    if (emailInvalidationRules.some(rule => values.email ? rule.test(values.email) : null)) {
      errors.email = intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
    }

    if (isEmail) {
      errors.email = intl.formatMessage({id: "app.firstRegistrationForm.existsInDb"});
    }
    if (!UserRegex.test(values.userName)) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorIncorrectName"});
    }
    if (values.userName.length === 0) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
    }
    if (values.userName.length < USERNAME.minLength && values.userName.length > 0) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorSmallName"}, {
        minSymbol: minSymbol
      });
    }
    if (values.userName.length > USERNAME.maxLength) {
      errors.userName = intl.formatMessage({id: "app.YourselfPage.errorBigName"}, {
        maxSymbol: maxSymbol
      });
    }
    if (isUser) {
      errors.userName = intl.formatMessage({id: "app.userName.nameExists"});
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
          userName: "",
          phone:" ",
          gender: "",
          email: userEmail ? userEmail : "",
          birthday: "",
          password: userPassword,

        }}
        validate={validate}
        onSubmit={(values: FormValues) => {
          dispatch(signUpSlice(values));
          loading ? navigate("/user/reg_in/information/modR") : null;
        }}
      >
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.pagesTitle.aboutYourself"/>
              </h2>
              {registration && <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
              />}
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