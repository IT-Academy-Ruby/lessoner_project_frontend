import "../userPage.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Button} from "../../../../Button";
import {Email} from "../../../../Email";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {emailInvalidationRules} from "../../../../../validationRules";
import {useAppDispatch} from "../../../../../store/hooks";

interface FormValues {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

type EmailFormProps = {
  userName: string;
  handleClose: () => void;
  setEmail: (email: string) => void;
  handleEdit: (title: string) => void;
}

export const EmailForm = ({
  userName, handleClose, setEmail
}: EmailFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {email: ""};

  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};

        if (!emailInvalidationRules.test(values.email)) {
          errors.email =
            intl.formatMessage({id: "app.firstRegistrationForm.invalidationRules"});
        }
        return errors;
      }}

      onSubmit={(values) => {
        const items = {name: userName, object: {email: values.email}};
        setEmail(values.email);
        dispatch(editUserData(items));
        values.email = "";
      }}>

      {({
        errors, touched, values
      }) => {
        return (
          <Form className="form-user-page">
            <div
              className="close-modal-form"
              onClick={() => {
                handleClose();
                values.email = "";
                errors.email = undefined;
              }}>
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
            />
          </Form>);
      }}
    </Formik>
  );
};