import "../userPage.scss";
import {CODE, DEFAULT_COUNTRY_CODE} from "../../../../../constants";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {
  clearError, editUserData, sendUserCode
} from "../../../../../store/loginName/loginSlice";
import {Button} from "../../../../Button";
import {Code} from "../../../../Code";
import {CodeRegex} from "../../../../../validationRules";
import {useAppDispatch} from "../../../../../store/hooks";

interface FormValues {
  code: string;
}

interface FormErrors {
  [key: string]: string;
}

type CodeFormProps = {
  userName: string;
  handleClose: () => void;
  handleEdit: (title: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone:string) => void;
}

export const CodeForm = ({
  handleClose, handleEdit, phoneNumber, userName, setPhoneNumber
}: CodeFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {code: ""};

  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};

        if (!CodeRegex.test(values.code)) {
          errors.code = intl.formatMessage({id: "app.code.invalidationRules"});
        }
        if (values.code.length < CODE.maxLength) {
          errors.code +=
            intl.formatMessage({id: "app.code.errorLength"}, {maxSymbol: CODE.maxLength});
        }
        return errors;
      }}

      onSubmit={(values) => {
        dispatch(sendUserCode({verification_code: values.code}));
        setPhoneNumber(DEFAULT_COUNTRY_CODE);
        dispatch(clearError());
        handleClose();
        values.code = "";
      }}>
      {({
        errors, touched, values
      }) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => {
              dispatch(clearError());
              setPhoneNumber(DEFAULT_COUNTRY_CODE);
              handleClose();
              values.code = "";
              errors.code = undefined;
            }}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.code"/>
            </h2>
            <p className="text">
              <FormattedMessage id="app.code.inform"/>
              <span className="link" onClick={() => {
                handleEdit(intl.formatMessage({id: "app.phoneNumber.label"}));
              }}>
                <FormattedMessage id="app.code.phoneNumber"/>
              </span>
            </p>
            <Field
              name="code"
              component={Code}
              error={touched.code ? errors.code : undefined}
            />
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.button.code"})}
              className="button"
              onClick={() => {
                dispatch(editUserData({name: userName, object: {phone: "+" + phoneNumber}}));
              }}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.code"})}
              className="button__page button-form-user__page"
            />
          </Form>);
      }}
    </Formik>

  );
};