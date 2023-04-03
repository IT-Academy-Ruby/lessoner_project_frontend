import "./modal.module.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {changePassword, clearError} from "../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {Button} from "../components/Button";
import {PASSWORD} from "../constants";
import {PasswordAndConfirm} from "../components/PasswordAndConfirm";
import {passwordRegex} from "../validationRules";
import {uploadModalData} from "../store/modalSlice/modalSlice";
import {useEffect} from "react";

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string
}

export const SetNewPasswordPage = () => {
  const minSymbol = PASSWORD.minLength;
  const maxSymbol = PASSWORD.maxLength;
  const symbols = PASSWORD.symbols;
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.login.token);
  const responsePassword = useAppSelector(state => state.login.responsePassword);
  const initialValues: FormValues = {password: "", confirmPassword: ""};

  useEffect(() => {
    if (responsePassword.error) {
      dispatch(uploadModalData({
        text: responsePassword.error,
        typeModal: true,
        isopen: true,
        urlNavigate: "/user/sign_in/reset_password"
      }));
      dispatch(clearError());
    }
    if (responsePassword.status) {
      dispatch(uploadModalData({
        text: responsePassword.status,
        typeModal: undefined,
        isopen: true,
        urlNavigate: "/user/sign_in"
      }));
      dispatch(clearError());
    }
  }, [dispatch, responsePassword]);

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
        onSubmit={async (values: FormValues) => {
          const value = {token: token, password: values.password,};
          await dispatch(changePassword(value));
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
                isConfirm={true}
                error={touched.password ? errors.password : undefined}/>
              <Field
                name="confirmPassword"
                component={PasswordAndConfirm}
                minSymbol={minSymbol}
                maxSymbol={maxSymbol}
                isConfirm={false}
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