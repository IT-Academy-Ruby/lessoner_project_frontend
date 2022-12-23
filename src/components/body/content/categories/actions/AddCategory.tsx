import "./addCategory.scss";
import {DESCRIPTION_CATEGORY, NAME_CATEGORY, IMAGE_FORMAT} from "../../../../../constants";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {
  addCategory, getCategory, updateCategory
} from "../../../../../store/categorySlice/categorySlice";
import {descriptionCategoryRegex, nameCategoryRegex} from "../../../../../validationRules";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import Button from "../../../../Button";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";
import {useEffect} from "react";
import {useState} from "react";

interface FormValues {
  id: number;
  name: string;
  description: string;
  image: undefined;
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
  const [selectImage, setSelectImage] = useState();
  const allCategories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!add) {
      dispatch(getCategory());
    }
  }, [dispatch, add]);

  const url = window.location.href;
  const idCategory = parseInt(url.slice(url.lastIndexOf("/") + 1));
  let category = {name: "", description: ""};

  if (!add && allCategories.length > 1) {
    category = allCategories.filter(category => category.id === idCategory)[0];
  }

  const initialValues: FormValues = {
    id: 0,
    name: add ? "" : category.name,
    description: add ? "" : category.description,
    image: undefined,
    status: "active",
  };

  const nameLength = initialValues.name.length;
  const descriptionLength = initialValues.name.length;

  return (
    <div className="add-category">
      <Link to="/categories" className="button-back">
        <span className="arrow-back">&#10094;</span>
        <FormattedMessage id="app.categories.back"/>
      </Link>
      {allCategories.length > 1 && <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (!nameCategoryRegex.test(values.name)) {
            errors.name = intl.formatMessage({id: "app.categories.name.invalid"});
          }
          if (values.name.trim().length < NAME_CATEGORY.minSymbols) {
            errors.name = intl.formatMessage({id: "app.activeCategories.errorMinLength"});
          }
          if (values.name.length > NAME_CATEGORY.maxSymbols) {
            errors.name = intl.formatMessage(
              {id: "app.activeCategories.errorMaxLength"}, {symbols: NAME_CATEGORY.maxSymbols});
          }
          if (!descriptionCategoryRegex.test(values.description)) {
            errors.description = intl.formatMessage({id: "app.categories.description.invalid"});
          }
          if (values.description.trim().length < DESCRIPTION_CATEGORY.minSymbols) {
            errors.description = intl.formatMessage({id: "app.activeCategories.errorMinLength"});
          }
          if (values.description.length > DESCRIPTION_CATEGORY.maxSymbols) {
            errors.description = intl.formatMessage({id: "app.activeCategories.errorMaxLength"},
              {symbols: DESCRIPTION_CATEGORY.maxSymbols});
          }
          if (selectImage) {
            const imageFormat = String(selectImage["type"]);
            const isFormat = IMAGE_FORMAT.format.find(format =>
              "." + imageFormat.slice(imageFormat.indexOf("/") + 1) === format)
            if (!isFormat) {
              console.log(selectImage["type"])
              errors.image = intl.formatMessage({id: "app.categories.imageError"});
            }
            if (selectImage["size"] > 5242880) {
              errors.image = intl.formatMessage({id: "app.categories.imageBigSize"});
            }
          }
          if (!selectImage) {
            // errors.image = intl.formatMessage({id: "app.categories.imageError"});
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          // values.name = values.name.trim();
          // values.description = values.description.trim();

          console.log(selectImage ? selectImage["type"] : selectImage)
          // if (add) {
          //   dispatch(addCategory(values));
          // } else {
          //   values.id = idCategory;
          //   dispatch(updateCategory(values));
          // }
          // navigate("/categories");
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
                nameLength={nameLength}
              />
              <Field
                name="description"
                component={CategoryDescription}
                error={touched.description ? errors.description : undefined}
                descriptionLength={descriptionLength}
              />
              <Field
                name="image"
                component={CategoryImage}
                error={touched.image ? errors.image : undefined}
                selectImage={selectImage}
                setSelectImage={setSelectImage}
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
                  disabled={!!errors.description || !!errors.name}
                />
              </div>
            </Form>
          );
        }}
      </Formik>}
    </div>
  );
};

export default AddCategory;