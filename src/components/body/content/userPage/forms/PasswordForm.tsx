import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import {PASSWORD} from "../../../../../constants";
import PasswordAndConfirm from "../../../../PasswordAndConfirm";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {passwordRegex} from "../../../../../validationRules";
import {useAppDispatch} from "../../../../../store/hooks";

interface FormValues {
  current_password: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

type PasswordFormProps = {
  userName: string;
  handleClose: () => void;
}

const PasswordForm = ({userName, handleClose}: PasswordFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    current_password: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (!passwordRegex.test(values.password)) {
          errors.password = errors.code =
            intl.formatMessage({id: "app.firstRegistrationForm.passwordRegEx"}, {
              minSymbol: PASSWORD.minLength,
              maxSymbol: PASSWORD.maxLength,
              symbols: PASSWORD.symbols
            });
        }
        if (values.password.length > PASSWORD.maxLength ||
          values.password.length < PASSWORD.minLength) {
          errors.password = errors.code =
            intl.formatMessage({id: "app.firstRegistrationForm.passwordLength"},
              {minSymbol: PASSWORD.minLength, maxSymbol: PASSWORD.maxLength});
        }
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = errors.code =
            intl.formatMessage(
              {id: "app.firstRegistrationForm.passwordConfrim"});
        }

        return errors;
      }}

      onSubmit = {(values) => {
        const items = {name: userName, object:
          {password: values.password, current_password: values.current_password}};
        dispatch(editUserData(items));
        handleClose();
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => handleClose()}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.password" />
            </h2>
            <Field
              name="current_password"
              component={PasswordAndConfirm}
              minSymbol={PASSWORD.minLength}
              maxSymbol={PASSWORD.maxLength}
              isConfirm={"currentPassword"}
            />
            <Field
              name="password"
              component={PasswordAndConfirm}
              minSymbol={PASSWORD.minLength}
              maxSymbol={PASSWORD.maxLength}
              isConfirm={true}
              error={touched.password ? errors.password : undefined}
            />
            <Field
              name="confirmPassword"
              component={PasswordAndConfirm}
              minSymbol={PASSWORD.minLength}
              maxSymbol={PASSWORD.maxLength}
              isConfirm={false}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.password"})}
              className="button__page button-form-user__page"
            />
          </Form>);
      }}
    </Formik>
  );
};

export default PasswordForm;