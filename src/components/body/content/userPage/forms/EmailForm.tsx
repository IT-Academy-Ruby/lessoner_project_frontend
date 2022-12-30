import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import Email from "../../../../Email";
import classNames from "classnames";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {emailInvalidationRules} from "../../../../../validationRules";
import {useAppDispatch} from "../../../../../store/hooks";
import {useState} from "react";

interface FormValues {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

type EmailFormProps = {
  userName: string;
  handleClose: () => void;
}

const EmailForm = ({userName, handleClose}: EmailFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isDisable, setIsDisable] = useState(true);

  const initialValues: FormValues = {
    email: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {}

        if (emailInvalidationRules.some(rule => rule.test(values.email))) {
          errors.email =
            intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
        }
        if (values.email && !errors.email) {
          setIsDisable(false)
        } else {
          setIsDisable(true)
        }
        return errors;
      }}

      onSubmit={(values) => {
        const items = {
          name: userName,
          object: {email: values.email},
        };
        console.log(items)
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
              <FormattedMessage id="app.userPage.form.email"/>
            </h2>
            <Field
              name="email"
              component={Email}
              error={touched.email ? errors.email : undefined}
              needEmail={true}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.email"})}
              className="button__page button-form-user__page"
              disabled={isDisable}/>
          </Form>)
      }}
    </Formik>
  );
};
export default EmailForm;