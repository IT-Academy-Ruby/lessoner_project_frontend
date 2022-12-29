import "./formUserPage.scss";
import {BACKEND_URL, CODE, DEFAULT_COUNTRY_CODE, PASSWORD, USERNAME} from "../../../../constants";
import {CodeRegex, emailInvalidationRules, passwordRegex, UserRegex} from "../../../../validationRules";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {getUserData, editUserData} from "../../../../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import Birthday from "../../../BirthdayPicker";
import Button from "../../../Button";
import Code from "../../../Code";
import Gender from "../../../GenderSelector";
import Email from "../../../Email";
import {Link} from "react-router-dom";
import PasswordAndConfirm from "../../../PasswordAndConfirm";
import Phone from "../../../PhoneNumber";
import UserName from "../../../UserName";
import classNames from "classnames";

import requestApi from "../../../../services/request";

import {useEffect, useState} from "react";

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
  name: string;
  birthday: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  code: string;
}

interface FormErrors {
  [key: string]: string;
}

type FormProps = {
  component: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const FormUserPage = ({component, isVisible, setIsVisible}: FormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isWrapper, setIsWrapper] = useState(false);
  const [error, setError] = useState("Phone number incorrect");
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_COUNTRY_CODE);
  const [isError, setIsError] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const user = useAppSelector(state => state.userData.user);
  const userInformation = {
    title: "", button: "",
  }
  useEffect(() => {
    if (component === "Phone number") {
      if (!error && phoneNumber) {
        setIsDisable(false);
      } else {
        setIsDisable(true)
        // setPhoneNumber("")
      }
    }
  }, [phoneNumber])
  const initialValues: FormValues = {
    name: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    code: "",
  };
  const handleClose = () => {
    setIsVisible(false);
    setIsDisable(true);
  }
  return (
    <div className={classNames("wrapper-form-user-page", {"inVisible": !isVisible})}>
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {}

          if (component === "Username") {
            if (!UserRegex.test(values.name)) {
              errors.name = intl.formatMessage({id: "app.YourselfPage.errorIncorrectName"});
            }
            if (values.name.length === 0) {
              errors.name = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
            }
            if (values.name.length < USERNAME.minLength && values.name.length > 0) {
              errors.name = intl.formatMessage({id: "app.YourselfPage.errorSmalName"});
            }
            if (values.name.length > USERNAME.maxLength) {
              errors.name = intl.formatMessage({id: "app.YourselfPage.errorBigName"});
            }
            if (values.name && !errors.name) {
              setIsDisable(false)
            } else {
              setIsDisable(true)
            }
          }

          if (component === "Your birthday") {
            if (!values.birthday) {
              errors.birthday = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
            }
            if (values.birthday && !errors.birthday) {
              setIsDisable(false)
            } else {
              setIsDisable(true)
            }
          }

          if (component === "Gender") {
            if (!values.gender) {
              errors.gender = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
            }
            if (values.gender && !errors.gender) {
              setIsDisable(false)
            } else {
              setIsDisable(true)
            }
          }

          if (component === "Email") {
            if (emailInvalidationRules.some(rule => rule.test(values.email))) {
              errors.email =
                intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
            }
            if (values.email && !errors.email) {
              setIsDisable(false)
            } else {
              setIsDisable(true)
            }
          }

          if (component === "Password") {
            if (!passwordRegex.test(values.password)) {
              errors.password = errors.code =
                intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"});
            }
            if (values.password.length > PASSWORD.maxLength ||
              values.password.length < PASSWORD.minLength) {
              errors.password = errors.code =
                intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"},
                  {minSymbols: PASSWORD.minLength, maxSymbols: PASSWORD.maxLength});
            }
            if (values.password !== values.confirmPassword) {
              errors.confirmPassword = errors.code =
                intl.formatMessage({id: "app.firstRegistrationForm.passwordConfrim"});
            }
            if (values.password && !errors.password && values.confirmPassword && !errors.confirmPassword) {
              setIsDisable(false)
            } else {
              setIsDisable(true)
            }
          }

          if (component === "Code") {
            if (!CodeRegex.test(values.code)) {
              errors.code = intl.formatMessage({id: "app.code.invalidationRules"});
            }
            if (values.code.length < CODE.maxLength) {
              errors.code += intl.formatMessage({id: "app.code.errorLength"});
            }
            if (values.code && !errors.code) {
              setIsDisable(false)
            } else {
              setIsDisable(true)
            }
          }
          return errors;
        }}

        onSubmit={(values) => {
          const items = {
            name: user.name,
            object: {name: values.name}
          };
          dispatch(editUserData(items));
          dispatch(getUserData(user.name));
          handleClose();
        }}>
        {({errors, touched}) => {

          const element = () => {
            switch (component) {
              case "Username":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.username"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form..button.username"});
                return <Field
                  name="name"
                  component={UserName}
                  error={touched.name ? errors.name : undefined}
                />
                  ;
              case "Your birthday":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.birthday"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form..button.birthday"});
                return <Field
                  name="birthday"
                  component={Birthday}
                  error={touched.birthday ? errors.birthday : undefined}
                  setIsWrapper={setIsWrapper}
                  isWrapper={isWrapper}
                />;
              case "Gender":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.gender"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form..button.gender"});
                return <Field
                  name="gender"
                  options={gender}
                  component={Gender}
                  error={touched.gender ? errors.gender : undefined}
                />;
              case "Email":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.email"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form.button.email"});
                return <Field
                  name="email"
                  component={Email}
                  error={touched.email ? errors.email : undefined}
                  needEmail={true}
                />;
              case "Phone number":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.phone"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form.button.phone"});
                return <Phone
                  setError={setError}
                  error={error}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  isError={isError}
                />;
              case "Password":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.password"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form.button.password"});
                return <>
                  <label className="input-label">
                    <FormattedMessage id="app.userPage.form.currentPassword"/>
                    <input className="input"/>
                  </label>
                  <Field
                    name="password"
                    component={PasswordAndConfirm}
                    minSymbol={PASSWORD.minLength}
                    maxSymbol={PASSWORD.maxLength}
                    isConfirm={false}
                    error={touched.password ? errors.password : undefined}
                  />
                  <Field
                    name="confirmPassword"
                    component={PasswordAndConfirm}
                    minSymbol={PASSWORD.minLength}
                    maxSymbol={PASSWORD.maxLength}
                    isConfirm={true}
                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                  />
                </>;
              case "Code":
                userInformation.title = intl.formatMessage({id: "app.userPage.form.code"});
                userInformation.button = intl.formatMessage({id: "app.userPage.form.button.code"});
                return <>
                  <p className="text">
                    <FormattedMessage id="app.code.inform"/>
                    <Link to="/users/sign_in/phone_number" className="link">
                      <FormattedMessage id="app.code.phoneNumber"/>
                    </Link>
                  </p>
                  <Field
                    name="code"
                    component={Code}
                    error={touched.code ? errors.code : undefined}
                  />
                  <Button
                    buttonType="button"
                    buttonText={intl.formatMessage({id: "app.button.code"})}
                    className="button"
                  />
                </>
            }
          }
          return (
            <Form className="form-user-page">
              <div className="close-modal-form" onClick={() => handleClose()}>
                <span className="close-form"></span>
              </div>
              <h2 className="form-title-user-page">
                {userInformation.title}
              </h2>
              <div>{element()}</div>
              <Button
                buttonType="submit"
                buttonText={userInformation.button}
                className="button__page button-form-user__page"
                disabled={isDisable}/>
            </Form>)
        }}
      </Formik>
    </div>
  )
}
export default FormUserPage;