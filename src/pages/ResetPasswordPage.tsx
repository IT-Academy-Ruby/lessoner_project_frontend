import "./modal.scss";
import {closePopup, sendPasswordResetLink} from "../store/loginName/loginSlice";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Fragment, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Button from "../components/Button";
import Email from "../components/Email";
import {emailInvalidationRules} from "../validationRules";
import Loader from "../components/Loader";
import {useEffect} from "react";
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
  const emailFound = useAppSelector(state => state.login.notFound);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.login.loading);

  const initialValues: FormValues = {
    email: "",
  };

  const closeLinkPopup = () => {
    navigate("/users/");
    dispatch(closePopup());
  };

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
          return errors
        }}
        onSubmit={(values: { email: string }) => {
          dispatch(sendPasswordResetLink(values.email))
        }}>
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              {!emailFound ?
                <Fragment>
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
                    needEmail={true}
                  />
                  <Button
                    buttonType="submit"
                    buttonText={intl.formatMessage({id: "app.resetPasswordPage.resetPassword"})}
                    className="button__page"
                  />
                </Fragment> :
                <Fragment>
                  <h2 className="inform">
                    <FormattedMessage id="app.resetPasswordPage.text"/>{initialValues.email}
                  </h2>
                  <Button
                    buttonType="button"
                    onClick={closeLinkPopup}
                    buttonText={intl.formatMessage({id: "app.button.ok"})}
                    className="button__page"
                  />
                </Fragment>
              }
            </Form>
          );
        }}
      </Formik>
    </div>
  )
};

export default ResetPasswordPage;