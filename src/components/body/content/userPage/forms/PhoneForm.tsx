import "../userPage.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Button} from "../../../../Button";
import {DEFAULT_COUNTRY_CODE} from "../../../../../constants";
import {PhoneNumber} from "../../../../PhoneNumber";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {useAppDispatch} from "../../../../../store/hooks";
import {useState} from "react";

type PhoneFormProps = {
  userName: string;
  handleClose: () => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

export const PhoneForm = ({
  userName, handleClose, phoneNumber, setPhoneNumber
}: PhoneFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(true);

  interface FormValues {
    phone: string;
  };

  interface FormErrors {
    [key: string]: string;
  };

  const initialValues: FormValues = {phone: phoneNumber};

  return (
    <Formik
      initialValues={initialValues}
      validate={(values: FormValues) => {
        const errors: FormErrors = {};
        if (values.phone.length === 0) {
          errors.phone = intl.formatMessage({id: "app.pagesTitle.phoneNumber"});
        }
        if (isError) {
          errors.phone = intl.formatMessage({id: "app.phoneNumber.err"});
        }
        return errors;
      }}
      onSubmit={() => {
        const items = {name: userName, object: {phone: "+" + phoneNumber}};
        dispatch(editUserData(items));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => {
              handleClose();
              setPhoneNumber(DEFAULT_COUNTRY_CODE);
              errors.phone = undefined;
            }}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.phone"/>
            </h2>
            <Field
              name="phone"
              component={PhoneNumber}
              error={touched.phone ? errors.phone : undefined}
              setIsError={setIsError}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.phone"})}
              className="button__page button-form-user__page"
            />
          </Form>
        );
      }}
    </Formik>
  );
};