import "./addCategory.scss"
import {addCategory, updateCategory} from "../../../../../store/categorySlice/categorySlice";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../../../Button";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";
import Loader from "../../../../Loader";
import requestApi from "../../../../../services/request";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";


interface FormValues {
  id: number;
  name: string;
  description: string;
  status: string;
}

interface FormErrors {
  [key: string]: string;
}

type TypeTitle = {
  add: boolean
}
const AddCategory = ({add}: TypeTitle) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.categories.loading);

  const idCategory = () => {
    const url = window.location.href;
    return url.slice(url.lastIndexOf("/") + 1);
  };

  const initialValues: FormValues = {
    id: 0,
    name: "",
    description: "",
    status: "active",
  }

  return (
    <div className="add-category">
      {loading && <Loader/>}
      <Link to="/categories" className="button-back">
        <span className="arrow-back">&#10094;</span>
        Back
      </Link>
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (values.name.length < 5) {
            errors.name = intl.formatMessage({id: "app.activeCategories.errorName"});
          }
          if (values.description.length < 5) {
            errors.description = intl.formatMessage({id: "app.activeCategories.errorDescription"});
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          if (add) {
            // dispatch(addCategory(values))
            alert("help")
          } else {
            values.id = parseInt(idCategory())
            dispatch(updateCategory(values))
          }
          !loading ? navigate("/categories") : null
          console.log(values.id)
        }}>
        {({errors, touched}) => {
          return (
            <Form className="form-category">
              <h1 className="add-title">
                {add ?
                  intl.formatMessage({id: "app.categories.addCategory"}) :
                  intl.formatMessage({id: "app.categories.updateCategory"})
                }
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
              />
              <div className="category-buttons">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({id: "app.categories.button.cancel"})}
                  className="button-select button-cancel"
                  onClick={() => navigate("/categories")}
                />
                <Button
                  buttonType="submit"
                  buttonText={intl.formatMessage({id: "app.categories.button.save"})}
                  className="button-select"
                  disabled={!!errors.description||!!errors.name}
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
export default AddCategory;