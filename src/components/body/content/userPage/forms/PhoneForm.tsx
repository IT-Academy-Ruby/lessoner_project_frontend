import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import {DEFAULT_COUNTRY_CODE} from "../../../../../constants";
import Phone from "../../../../PhoneNumber";
import classNames from "classnames";
import {emailInvalidationRules} from "../../../../../validationRules";
import {useEffect, useState} from "react";


interface FormValues {
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

type PhoneFormProps = {
  userName: string;
  handleClose: () => void;
  handleEdit:(title:string)=>void;
}
const PhoneForm = ({userName, handleClose, handleEdit}: PhoneFormProps) => {
  const intl = useIntl();
  const [isDisable, setIsDisable] = useState(true);
  const [error, setError] = useState("Phone number incorrect");
  const [isError, setIsError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_COUNTRY_CODE);

  useEffect(() => {
    if (!error && phoneNumber) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
      // setPhoneNumber("")
    }
  }, [phoneNumber]);
  const initialValues: FormValues = {
    phone: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const items = {
          name: userName,
          object: {phone: phoneNumber}
        };
        handleClose();
        handleEdit("code");

      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => handleClose()}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.phone"/>
            </h2>
            <Phone
              setError={setError}
              error={error}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              isError={isError}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.phone"})}
              className="button__page button-form-user__page"
              disabled={isDisable}/>
          </Form>)
      }}
    </Formik>
  );
};
export default PhoneForm;