import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../components/Button";
import {PASSWORD} from "../constants";
import PasswordAndConfirm from "../components/PasswordAndConfirm";
import {changePassword} from "../services/api/changePassword";
import getParameterValue from "../helpers/parseUrl";
import {passwordRegex} from "../validationRules";

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
  const initialValues: FormValues = {password: "", confirmPassword: ""};
  const token = getParameterValue(window.location.href, "token");

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
        intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"}, {
          minSymbol: minSymbol, maxSymbol: maxSymbol
        });
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = errors.code =
        intl.formatMessage({id: "app.firstRegistrationForm.passwordConfrim"});
    }
    return errors;
  };

  const submitFirstStepForm = async (values: FormValues) => {
    if (token) {
      const isStatusSended = await changePassword(token, values.password);
      console.log(isStatusSended);
    }
  };

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validate={validate}
        onSubmit={submitFirstStepForm}
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