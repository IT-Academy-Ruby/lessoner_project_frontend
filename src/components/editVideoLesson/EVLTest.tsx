import "./EVLTest.scss";
import { 
  Field, Form, Formik 
} from "formik";
import Button from "../Button";
import classNames from "classnames";
import { useIntl } from "react-intl";

const RegExp = /^[а-яА-ЯёЁa-zA-Z0-9( )!$%&'""*+-/=?^_`{|}~.,@<>:]+$/i;
const hashtagRegExp = /^[#]{0,10}$/;
const maxNameLength = 64;
const maxDescriptionLength = 600;

const validateName = (value: string) => {
  if (!value) {
    return "The field is not filled";
  } else if (!RegExp.test(value)) {
    return "The input field contains prohibited characters";
  } else if (value.length > maxNameLength) {
    return `The maximum number of characters is ${maxNameLength}`;
  }
};

const validateDescription = (value: string) => {
  if (!value) {
    return "The field is not filled";
  } else if (!RegExp.test(value)) {
    return "The input field contains prohibited characters";
  } else if (value.length > maxDescriptionLength) {
    return `The maximum number of characters is ${maxDescriptionLength}`;
  }
};

export const EVLTest = () => {
  const intl = useIntl();
  return (
    <Formik
      initialValues={{
        name: "",
        category: "IT",
        description: "",
      }}
      onSubmit={values => {
        console.log("submit", values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="evlt__wrapper">
          <label
            className="evlt__label"
          >
            Name
            <Field
              className={classNames(
                "evlt__input", {["error-input"]: errors.name && errors.name}
              )}
              name="name"
              validate={validateName}
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </label>
          <label
            className="evlt__label"
          >
            Category
            <Field
              className="evlt__input"
              as="select"
              name="category"
            >
              <option value="IT">IT</option>
              <option value="Music">Music</option>
              <option value="Design">Design</option>
            </Field>
          </label>
          <label
            className="evlt__label"
          >
            Description
            <Field
              className={classNames(
                "evlt__input evlt__input-textarea", 
                {["error-input"]: errors.description && errors.description}
              )}
              name="description"
              validate={validateDescription}
              as="textarea"
              rows="9"
            />
            {errors.description && touched.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </label>
          <label
            className="evlt__label"
          >
            Subtitles
            <p className="evlt__text">
              Add subtitles to reach bigger audience 
            </p>
            <Button
              buttonType="button" 
              buttonText={intl.formatMessage({ id: "app.button.next"})} 
              className="button__fs16"
            />
            <div className="svg__add"></div>
          </label>
          <div className="evlt__btn-wrapper">   
            <Button
              buttonType="button" 
              buttonText={intl.formatMessage({ id: "app.button.next"})} 
              className="button__fs16-white button__fs16-white-evlt"
            />    
            <Button
              buttonType="submit" 
              buttonText={intl.formatMessage({ id: "app.button.next"})} 
              className="button__fs16"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
