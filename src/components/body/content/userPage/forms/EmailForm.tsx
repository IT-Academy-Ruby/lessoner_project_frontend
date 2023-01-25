import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import Email from "../../../../Email";
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
  setEmail: (email: string) => void;
  handleEdit: (title: string) => void;
}

const EmailForm = ({
  userName, handleClose, setEmail, handleEdit
}: EmailFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [isError, setIsError] = useState(false);

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
        if (values.email && !errors.email) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
        return errors;
      }}

      onSubmit={(values) => {
        const items = {name: userName, object: {email: values.email}};
        setEmail(values.email);
        dispatch(editUserData(items)).then((error) => {
          if (!error.payload) {
            setIsError(true);
          } else {
            setIsError(false);
            handleEdit("infEmail");
          }
        });
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div
              className="close-modal-form"
              onClick={() =>{
                handleClose();
                setIsError(false);
              }}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.email"/>
            </h2>
            <Field
              name="email"
              component={Email}
              error={isError ? intl.formatMessage({id: "app.errorRequest"}) : isError ||
              touched.email ? errors.email : undefined}
              needEmail={true}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.button.save"})}
              className="button__page button-form-user__page"
              disabled={isDisable}
            />
          </Form>);
      }}
    </Formik>
  );
};

export default EmailForm;