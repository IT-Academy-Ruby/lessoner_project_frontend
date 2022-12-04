import "./addCategory.scss"
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";
import {Link} from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
  image: string;
}

interface FormErrors {
  [key: string]: string;
}

const AddCoategory = () => {
  const initialValues: FormValues = {
    name: "",
    description: "string",
    image: "string",
  }
  return (
    <div className="">
      <Link to="/categories" className=""> Back</Link>
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
          if (values.image.length === 0) {
            console.log(values.image)
          }
        }}
        onSubmit={(values: FormValues) => {
          console.log(values)
        }}>
        {({errors, touched}) => {
          return (
            <Form className="form-category">
              <h1>
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
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default AddCoategory;