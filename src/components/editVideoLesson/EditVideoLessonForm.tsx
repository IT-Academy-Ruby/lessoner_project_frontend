import "./EditVideoLessonTitle.scss";
import {
  Field, Form, Formik 
} from "formik";
import Button from "../Button";
import classNames from "classnames";
import { useIntl } from "react-intl";

interface FormValues { description: string; name: string; }

const userRegex = new RegExp("[a-z0-9]", "i");
/* const minLengthName = 1;
const maxLengthName = 64;
const minLengthDescription = 1;
const maxLengthDescription = 600; */

export const EditVideoLessonForm = () => {
  const intl = useIntl();

  const validateName = (values: FormValues) => {
    if (!values) {
      return "The field is not filled";
    } else if (!userRegex.test(values.name)) {
      return "The input field contains prohibited characters";
    } /* else if (values.name.length < minLengthName) {
      return `The minimum number of characters is ${minLengthName}`;
    } else if (values.name.length > maxLengthName) {
      return `The maximum number of characters is ${maxLengthName}`;
    } */
  };

  const validateDescription = (values: FormValues) => {
    if (!values) {
      return "The field is not filled";
    } else if (!userRegex.test(values.description)) {
      return "The input field contains prohibited characters";
    } /* else if (values.description.length < minLengthDescription) {
      return `The minimum number of characters is ${minLengthDescription}`;
    } else if (values.description.length > maxLengthDescription) {
      return `The maximum number of characters is ${maxLengthDescription}`;
    } */
  };
  
  return (
    <div className="evlf__wrapper">
      <Formik
        initialValues={{ name: "", description: ""}}
        onSubmit={values => {
          console.log("submit", values);
        }}
      >
        {({errors, touched}) => (
          <Form >
            <label 
              className={classNames(
                "evlf__label", {"evlf__label-error": errors.name && touched.name}
              )}
            >
              Name
            
            <Field
              className={classNames(
                "evlf__input", {"evlf__input-error": errors.name && touched.name}
              )}
              name="name"
              type="text"
              validate={validateName}
            /> 
            </label>
            {errors.name && touched.name && (
              <div className="error">{errors.name}</div> 
            )}
            <label 
              className={classNames(
                "evlf__label", {"evlf__label-error": errors.description && touched.description}
              )}
            >
              Description
            
            <Field
              className={classNames(
                "evlf__input", {"evlf__input-error": errors.description && touched.description}
              )}
              name="description"
              type="textarea"
              validate={validateDescription}
            /> 
            </label>
            {errors.name && touched.name && (
              <div className="error">{errors.description}</div> 
            )}
            <Button 
              buttonType="submit" 
              buttonText={intl.formatMessage({ id: "app.button.next"})} 
              className="button__page"
            />  
          </Form>
        )}
      </Formik>
    </div>
  );
};

