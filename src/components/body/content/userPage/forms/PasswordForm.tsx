import "../userPage.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Button} from "../../../../Button";
import {PASSWORD} from "../../../../../constants";
import {PasswordAndConfirm} from "../../../../PasswordAndConfirm";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {passwordRegex} from "../../../../../validationRules";
import {useAppDispatch} from "../../../../../store/hooks";
import {useState} from "react";

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

export const PasswordForm = ({userName, handleClose}: PasswordFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isEye, setIsEye] = useState(false);

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

      onSubmit={(values) => {
        const items = {name: userName,
          object: {password: values.password, current_password: values.current_password}};
        dispatch(editUserData(items));
        values.current_password = "";
        values.password = "";
        values.confirmPassword = "";
      }}>
      {({
        errors, touched, values
      }) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => {
              handleClose();
              values.current_password = "";
              values.password = "";
              values.confirmPassword = "";
              errors.password = undefined;
              errors.confirmPassword = undefined;
              setIsEye(!isEye);
            }}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.password"/>
            </h2>
            <Field
              name="current_password"
              component={PasswordAndConfirm}
              minSymbol={PASSWORD.minLength}
              maxSymbol={PASSWORD.maxLength}
              isConfirm={"currentPassword"}
              isOpenEye={isEye}
              text={intl.formatMessage({id: "app.userPage.form.currentPassword"})}
            />
            <Field
              name="password"
              component={PasswordAndConfirm}
              minSymbol={PASSWORD.minLength}
              maxSymbol={PASSWORD.maxLength}
              isConfirm={true}
              error={touched.password ? errors.password : undefined}
              isOpenEye={isEye}
              text={intl.formatMessage({id: "app.passwordAndConfirm.NewPass"})}
            />
            <Field
              name="confirmPassword"
              component={PasswordAndConfirm}
              minSymbol={PASSWORD.minLength}
              maxSymbol={PASSWORD.maxLength}
              isConfirm={false}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              isOpenEye={isEye}
              text={intl.formatMessage({id: "app.passwordAndConfirm.NewConfirmPass"})}
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