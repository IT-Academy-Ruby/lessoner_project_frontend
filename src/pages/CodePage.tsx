import "./modal.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../components/Button";
import {CODE} from "../constants";
import Code from "../components/Code";
import {CodeRegex} from "../validationRules";
import {Link} from "react-router-dom";

interface FormErrors {
  [key: string]: string
}

interface FormValue {
  code: string;
}

type CodePageProps = {
  registration: boolean | undefined;
}

const CodePage = ({registration}: CodePageProps) => {
  const intl = useIntl();
  const initialValue: FormValue = {code: ""};

  return (
    <div className="log-content">
      <Formik
        initialValues={initialValue}
        validate={async (values: FormValue) => {
          const errors: FormErrors = {};
          if (!CodeRegex.test(values.code)) {
            errors.code = intl.formatMessage({id: "app.code.invalidationRules"});
          }
          if (values.code.length < CODE.maxLength) {
            errors.code += intl.formatMessage(
              {id: "app.code.errorLength"}, {maxSymbol: CODE.maxLength});
          }
          return errors;
        }}

        onSubmit={(values) => {
          console.log(values);
        }}>
        {({errors, touched}) => {
          return (
            <Form className="wrapper-component">
              <h2 className="title">
                <FormattedMessage id="app.pagesTitle.enterCode"/>
              </h2>
              <p className="text">
                <FormattedMessage id="app.code.inform"/>
                <Link
                  to={registration ? "/user/sign_in/phone_numberR" : "/user/sign_in/phone_numberA"}
                  className="link">
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
                buttonText={intl.formatMessage({id: "app.button.finish"})}
                className="button__page"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CodePage;