import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Button from "../components/Button";
import {PASSWORD} from "../constants";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
import {changePassword} from "../store/loginName/loginSlice";
import {passwordRegex} from "../validationRules";
import {useNavigate} from "react-router-dom";

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string
}

const SetNewPasswordPage = () => {
  const minSymbol = PASSWORD.minLength;
  const maxSymbol = PASSWORD.maxLength;
  const symbols = PASSWORD.symbols;
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate =useNavigate();
  const token = useAppSelector(state => state.login.token);
  const initialValues: FormValues = {password: "", confirmPassword: ""};

  const validate = async (values: FormValues) => {
    const errors: FormErrors = {};
    if (!passwordRegex.test(values.password)) {
      errors.password = errors.code =
        intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"}, {
          minSymbol: minSymbol, maxSymbol: maxSymbol, symbols: symbols
        });
    }
    if (values.password.length > PASSWORD.maxLength ||
      values.password.length < minSymbol) {
      errors.password = errors.code =
        intl.formatMessage(
          {id: "app.firstRegistrationForm.passwordLength"},
          {minSymbol: minSymbol, maxSymbol: maxSymbol});
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = errors.code =
        intl.formatMessage({id: "app.firstRegistrationForm.passwordConfrim"});
    }
    return errors;
  };

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validate={validate}
        onSubmit={(values: FormValues) => {
          const value = {token: token, password: values.password,};
          dispatch(changePassword(value));
          navigate("/");
        }}
      >
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.setNewPasswordPage.title"/>
              </h2>
              <Field
                name="password" component={PasswordAndConfirm}
                minSymbol={minSymbol}
                maxSymbol={maxSymbol}
                isConfirm={false}
                error={touched.password ? errors.password : undefined}/>
              <Field
                name="confirmPassword"
                component={PasswordAndConfirm}
                minSymbol={minSymbol}
                maxSymbol={maxSymbol}
                isConfirm={true}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}/>
              <Button
                buttonType="submit"
                buttonText={intl.formatMessage({id: "app.resetPasswordPage.resetPassword"})}
                className="button__page"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default SetNewPasswordPage;