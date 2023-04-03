import "./modal.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {clearError, sendPasswordResetLink} from "../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import {Button} from "../components/Button";
import {Email} from "../components/Email";
import {emailInvalidationRules} from "../validationRules";
import {uploadModalData} from "../store/modalSlice/modalSlice";

interface FormValues {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ResetPasswordPage = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isEmail, setIsEmail] = useState(false);
  const checkEmail = useAppSelector(state => state.login.checkEmail);

  useEffect(() => {
    if (checkEmail.error) {
      dispatch(uploadModalData({
        text: checkEmail.error,
        typeModal: true,
        isOpen: true
      }
      ));
      setIsEmail(true);
      dispatch(clearError());
    }
    if (checkEmail.alert) {
      dispatch(uploadModalData({
        text: checkEmail.alert,
        typeModal: undefined,
        isOpen: true,
        urlNavigate: "/user/sign_in/reset_password/reset",
      }
      ));
      dispatch(clearError());
    }
  }, [dispatch, checkEmail]);

  return (
    <div className="log-content">
      <Formik
        initialValues={{email: ""}}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (!emailInvalidationRules.test(values.email)) {
            errors.email =
              intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
          }
          return errors;
        }}
        onSubmit={async (values: { email: string }) => {
          await dispatch(sendPasswordResetLink(values.email));
        }}>
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.loginPage.password"/>
              </h2>
              <p className="text">
                <FormattedMessage id="app.resetPasswordPage.inform"/>
              </p>
              <Field
                name="email"
                component={Email}
                error={touched.email ? errors.email : undefined}
                isEmail={isEmail}
                textError={intl.formatMessage({id: "app.email.notFound"})}
              />
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