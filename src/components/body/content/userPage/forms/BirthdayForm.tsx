import "../userPage.module.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {BirthdayPicker} from "../../../../BirthdayPicker";
import {Button} from "../../../../Button";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {useAppDispatch} from "../../../../../store/hooks";
import {useState} from "react";

interface FormValues {
  birthday: string | Date;
}

interface FormErrors {
  [key: string]: string;
}

type BirthdayFormProps = {
  userName: string;
  handleClose: () => void;
}
export const BirthdayForm = ({userName, handleClose}: BirthdayFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isWrapper, setIsWrapper] = useState(false);

  const initialValues: FormValues = {birthday: ""};

  return (
    <Formik
      initialValues={initialValues}
      validate={(values: FormValues) => {
        const errors: FormErrors = {};

        if (!values.birthday) {
          errors.birthday = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
        }
        return errors;
      }}
      onSubmit={(values) => {
        if(typeof values.birthday !== "string") {
          const items = {name: userName, object: {birthday: values.birthday.toDateString()}};
          dispatch(editUserData(items));
        }
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => handleClose()}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.birthday"/>
            </h2>
            <Field
              name="birthday"
              component={BirthdayPicker}
              error={touched.birthday ? errors.birthday : undefined}
              setIsWrapper={setIsWrapper}
              isWrapper={isWrapper}
              text={intl.formatMessage({id: "app.birthday"})}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.birthday"})}
              className="button__page button-form-user__page"
            />
          </Form>);
      }}
    </Formik>
  );
};