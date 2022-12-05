import "./addCategory.scss"
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link,useNavigate} from "react-router-dom";
import Button from "../../../../Button";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";

interface FormValues {
  name: string;
  description: string;
  image: object;
}

interface FormErrors {
  [key: string]: string;
}

const AddCoategory = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const initialValues: FormValues = {
    name: "",
    description: "",
    image: {},
  }
  return (
    <div className="add-category">
      <Link to="/categories" className="button-back">
        <span className="arrow-back">&#10094;</span>
        Back
      </Link>
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (values.name.length === 0) {
            console.log(values.name)
          }
          if (values.description.length <= 10) {
            console.log(values.description)
          }
          if (values) {
            console.log(values)
          }
        }}
        onSubmit={(values: FormValues) => {
          console.log(values)
        }}>
        {({errors, touched}) => {
          return (
            <Form className="form-category">
              <h1 className="add-title">
                <FormattedMessage id="app.categories.addCategory"/>
              </h1>
              <Field
                name="name"
                component={CategoryName}
                error={touched.name ? errors.name : undefined}
              />
              <Field
                name="description"
                component={CategoryDescription}
                error={touched.description ? errors.description : undefined}
              />
              <Field
                name="image"
                component={CategoryImage}
                error={touched.image ? errors.image : undefined}
              />
              <div className="category-buttons">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({id: "app.categories.button.cancel"})}
                  className="button-select button-cancel"
                  onClick={()=>navigate("/categories")}
                />
                <Button
                  buttonType="submit"
                  buttonText={intl.formatMessage({id: "app.categories.button.save"})}
                  className="button-select"
                  disabled={true}
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default AddCoategory;