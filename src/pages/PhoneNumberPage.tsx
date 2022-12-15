import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import {DEFAULT_COUNTRY_CODE} from "../constants";
import PhoneNumber from "../components/PhoneNumber";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface FormValues {
  phone: string;
  hasTermsAndConditions: boolean;
};

interface FormErrors {
  [key: string]: string;
};

type PhoneProps = {
  registration: boolean | undefined;
};

const PhoneNumberPage = ({registration}: PhoneProps) => {
  const intl = useIntl();
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_COUNTRY_CODE);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const sendPhoneNumber = () => {
    switch (registration) {
      case true:
        return navigate("/user/sign_in/phone_numberR/code");
      case false:
        return navigate("/user/sign_in/phone_numberA/code");
      case undefined:
        return navigate("/user/reg_in/information/modR")
    }
  };
  const initialValues: FormValues = {
    phone: phoneNumber,
    hasTermsAndConditions: false
  };
  const validate = (values: FormValues) => {
    const errors: FormErrors = {};
    if (values.phone.length === 0) {
      errors.phone = intl.formatMessage({id: "app.pagesTitle.phoneNumber"});
    }
    if (isError) {
      errors.phone = intl.formatMessage({id: "app.phoneNumber.err"});
    }
    if (registration && !values.hasTermsAndConditions) {
      errors.hasTermsAndConditions = intl.formatMessage({id: "app.firstRegistrationForm.termsAndConditions"});
    }
    return errors;
  };
  return (
    <div className="log-content">
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validate={validate}
        onSubmit={sendPhoneNumber}
      >
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.phoneNumberPage.title"/>
              </h2>
              <Field
                name="phone"
                component={PhoneNumber}
                error={touched.phone ? errors.phone : undefined}
                setIsError={setIsError}
                isError={isError}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                // isError={isError}
              />
              {registration && <Field
                name="hasTermsAndConditions"
                component={Checkbox}
                information={intl.formatMessage({id: "app.checkbox"})}
                link={intl.formatMessage({id: "app.checkbox.terms"})}
                error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined}
              />}
              <Button
                buttonType={"submit"}
                buttonText={intl.formatMessage({id: "app.phoneNumberPage.submit"})}
                className={"button__page"}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PhoneNumberPage;