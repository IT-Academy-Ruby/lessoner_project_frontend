import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import BirthdayPicker from "../components/BirthdayPicker";
import Button from "../components/Button";
import Email from "../components/Email";
import GenderSelector from "../components/GenderSelector";
import {USERNAME} from "../constants";
import UserName from "../components/UserName";
import {UserRegex} from "../validationRules";
import {signUpSlice} from "../store/loginName/loginSlice";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const gender = [
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.male" />,
    genderValue: "male"
  },
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.female" />,
    genderValue: "female"
  },
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.other" />,
    genderValue: "other"
  }];

interface FormValues {
  name: string;
  gender: string;
  email: string;
  birthday: string;
  password: string
  phone: string;
}

interface FormErrors {
  [key: string]: string
}

type YourselfPageProps = {
  registration: boolean | undefined;
  userPassword: string;
  userEmail: string;
};

const YourselfPage = ({
  registration, userEmail, userPassword
}: YourselfPageProps) => {
  const minSymbol = USERNAME.minLength;
  const maxSymbol = USERNAME.maxLength;
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.login.isLogged);
  const [isWrapper, setIsWrapper] = useState(false);
  const formatter = new Intl.DateTimeFormat("ru");

  const validate = async (values: FormValues) => {
    const errors: FormErrors = {};
    if (UserRegex.test(values.name)) {
      errors.name = intl.formatMessage({id: "app.YourselfPage.errorIncorrectName"});
    }
    if (values.name.length === 0) {
      errors.name = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
    }
    if (values.name.length < minSymbol && values.name.length) {
      errors.name = intl.formatMessage(
        {id: "app.YourselfPage.errorSmallName"}, {minSymbol: minSymbol});
    }
    if (values.name.length > maxSymbol) {
      errors.name = intl.formatMessage(
        {id: "app.YourselfPage.errorBigName"}, {maxSymbol: maxSymbol});
    }
    if (isUser) {
      errors.name = intl.formatMessage({id: "app.userName.nameExists"});
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
          name: "",
          phone: "",
          gender: "",
          email: userEmail ? userEmail : "",
          birthday: "",
          password: userPassword,
        }}
        validate={validate}
        onSubmit={(values: FormValues) => {
          values.birthday=formatter.format(new Date(values.birthday));
          dispatch(signUpSlice(values));
          navigate("/user/reg_in/information");
        }}
      >
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.pagesTitle.aboutYourself" />
              </h2>
              {registration && <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
              />}
              <Field
                name="name"
                component={UserName}
                error={touched.name ? errors.name : undefined}
              />
              <Field
                name="birthday"
                component={BirthdayPicker}
                error={touched.birthday ? errors.birthday : undefined}
                setIsWrapper={setIsWrapper}
                isWrapper={isWrapper}
                text={intl.formatMessage({id: "app.birthdaylabel"})}
              />
              <Field
                name="gender"
                options={gender}
                component={GenderSelector}
                error={touched.gender ? errors.gender : undefined}
                text={intl.formatMessage({id: "app.genderSelector.gender"})}
              />
              <Button
                buttonType="submit"
                buttonText={intl.formatMessage({id: "app.button.finish"})}
                className="button__page"
              />
              {isWrapper ? <div className="date-wrapper"></div> : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default YourselfPage;