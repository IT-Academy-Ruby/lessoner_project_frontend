import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Birthday from "../../../../BirthdayPicker";
import Button from "../../../../Button";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {useAppDispatch} from "../../../../../store/hooks";
import {useState} from "react";

interface FormValues {
  birthday: Date;
}

interface FormErrors {
  [key: string]: string;
}

type BirthdayFormProps = {
  userName: string;
  handleClose: () => void;
}
const BirthdayForm = ({userName, handleClose}: BirthdayFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [isWrapper, setIsWrapper] = useState(false);

  const initialValues: FormValues = {birthday: new Date};
  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (!values.birthday) {
          errors.birthday = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
        }
        if (values.birthday) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }

        return errors;
      }}
      onSubmit={(values) => {
        const items = {name: userName, object: {birthday: values.birthday.toDateString()}};
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
              <FormattedMessage id="app.userPage.form.birthday" />
            </h2>
            <Field
              name="birthday"
              component={Birthday}
              error={touched.birthday ? errors.birthday : undefined}
              setIsWrapper={setIsWrapper}
              isWrapper={isWrapper}
              text={intl.formatMessage({id: "app.birthday"})}
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

export default BirthdayForm;