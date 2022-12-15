import "./modal.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {sendPasswordResetLink} from "../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Button from "../components/Button";
import Email from "../components/Email";
import Loader from "../components/Loader";
import {emailInvalidationRules} from "../validationRules";
import {useNavigate} from "react-router-dom";

interface FormValues {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

const ResetPasswordPage = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  // const emailFound = useAppSelector(state => state.login.notFound);
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.login.loading);
  const isEmail = useAppSelector(state => state.login.isEmail);

  const initialValues: FormValues = {email: "",};

  // const closeLinkPopup = () => {
  //   navigate("/users/");
  // };

  return (
    <div className="log-content">
      {loading && <Loader/>}
      <Formik
        initialValues={{email: ""}}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (emailInvalidationRules.some(rule => rule.test(values.email))) {
            errors.email =
              intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
          }
          if (!isEmail && isEmail!=="") {
            errors.email = intl.formatMessage({id: "app.email.notFound"});
          }
          return errors;
        }}
        onSubmit={(values: { email: string }) => {
          dispatch(sendPasswordResetLink(values.email));
          navigate("/user/sign_in/reset_password/reset")
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

export default ResetPasswordPage;