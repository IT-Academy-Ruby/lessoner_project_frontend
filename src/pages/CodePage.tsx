import "../components/modal/modal.scss";
import {
  Field, Form, Formik
} from "formik";
import Button from "../components/Button";
import {CODE} from "../constants";
import Code from "../components/Code";
import {Link} from "react-router-dom";


interface FormErrors {
  [key: string]: string
}

interface FormValue {
  code: string;
}

const CodeRegex = new RegExp("[0-9a-z]{5}", "i");

const validate = async (values: FormValue) => {
  const errors: FormErrors = {};
  if (!CodeRegex.test(values.code)) {
    errors.code = "An invalid character is present in the Code. ";
  }
  if (values.code.length < CODE.maxLength) {
    errors.code += "Code should be 5 characters. ";
  }
  ;
  return errors;
};

const CodePage = () => {
  const initialValue: FormValue = {code: "",};
  return (
    <div className="field">
      <Formik
        initialValues={initialValue}
        validate={validate}
        onSubmit={(values: object) => {
          console.log(values); //for example that working
        }}>
        {({errors, touched}) => {
          return (
            <Form>
              <div className="modal">
                <Link to="/users/sign_in">
                  <span className="close">
                  </span>
                </Link>
                <h2 className="title">Enter the code</h2>
                <p className="modal-text">
                  Now a code will come to your phone. Enter it in a line.
                  <span>
                    <Link to="/users/sign_in/phone_number" className="link">
                      To change number
                    </Link>
                  </span>
                </p>
                <Field
                  name="code"
                  component={Code}
                  error={touched.code ? errors.code : undefined}
                />
                <button
                  type="button"
                  className="link resend-code"
                >
                  Resend code
                </button>
                <Button
                  buttonType={"submit"}
                  buttonText={"Finish"}
                  className={"button"}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CodePage;