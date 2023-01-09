import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {useEffect, useState} from "react";
import Button from "../../../../Button";
import {DEFAULT_COUNTRY_CODE} from "../../../../../constants";
import Phone from "../../../../PhoneNumber";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {useAppDispatch} from "../../../../../store/hooks";

interface FormValues {
  phone: string;
}

type PhoneFormProps = {
  userName: string;
  handleClose: () => void;
  handleEdit: (title: string) => void;
}

const PhoneForm = ({
  userName, handleClose, handleEdit
}: PhoneFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [isError, setIsError] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_COUNTRY_CODE);

  useEffect(() => {
    if (!isError) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [isError, phoneNumber]);
  const initialValues: FormValues = {phone: phoneNumber};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        const items = {name: userName, object: {phone:"+"+phoneNumber}};
        dispatch(editUserData(items));
        handleClose();
        handleEdit("code");
      }}>

      <Form className="form-user-page">
        <div className="close-modal-form" onClick={() => handleClose()}>
          <span className="close-form"></span>
        </div>
        <h2 className="form-title-user-page">
          <FormattedMessage id="app.userPage.form.phone" />
        </h2>
        <Field
          name="phone"
          component={Phone}
          setIsError={setIsError}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
        <Button
          buttonType="submit"
          buttonText={intl.formatMessage({id: "app.userPage.form.button.phone"})}
          className="button__page button-form-user__page"
          disabled={isDisable}
        />
      </Form>
    </Formik>
  );
};

export default PhoneForm;