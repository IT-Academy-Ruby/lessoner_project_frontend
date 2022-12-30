import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import {CODE} from "../../../../../constants";
import Code from "../../../../Code";
import {CodeRegex} from "../../../../../validationRules";
import {Link} from "react-router-dom";
import {useState} from "react";


interface FormValues {
  code: string;
}

interface FormErrors {
  [key: string]: string;
}

type CodeFormProps = {
 userName:string;
 handleClose:()=>void;
}
const CodeForm=({userName,handleClose}:CodeFormProps)=>{
  const intl = useIntl();
  const [isDisable, setIsDisable] = useState(true);

  const initialValues: FormValues = {
    code: "",
  };
  return(
    <Formik

      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {}

          if (!CodeRegex.test(values.code)) {
            errors.code = intl.formatMessage({id: "app.code.invalidationRules"});
          }
          if (values.code.length < CODE.maxLength) {
            errors.code += intl.formatMessage({id: "app.code.errorLength"});
          }
          if (values.code && !errors.code) {
            setIsDisable(false)
          } else {
            setIsDisable(true)
          }

        return errors;
      }}

      onSubmit={(values) => {
        const items = {
          name: userName,
          object: {code: values.code}
        };
        console.log(items)
        // dispatch(editUserData(items));
        handleClose();
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => handleClose()}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.code"/>
            </h2>
            <p className="text">
              <FormattedMessage id="app.code.inform"/>
              <Link to="/users/sign_in/phone_number" className="link">
                <FormattedMessage id="app.code.phoneNumber"/>
              </Link>
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
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.code"})}
              className="button__page button-form-user__page"
              disabled={isDisable}/>
          </Form>)
      }}
    </Formik>

      );
};
export default CodeForm;
