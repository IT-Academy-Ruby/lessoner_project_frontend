import "./addCategory.scss";
import {DESCRIPTION_CATEGORY, NAME_CATEGORY, IMAGE_DATA} from "../../../../../constants";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import {
  addCategory, getCategory, updateCategory, getBlob
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
  image_url: string;
  status: string;
  amount_lessons: number;
  created_at: string;
}

interface FormErrors {
  [key: string]: string;
}

type TypeTitle = {
  add: boolean;
}
const AddCategory = ({add}: TypeTitle) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectImage, setSelectImage] = useState({name: "", type: "", size: 0, image: new Blob()});
  const [getImage, setGetImage] = useState<Blob>();
  const allCategories = useAppSelector((state) => state.categories.categories);

  let category = {
    name: "",
    description: "",
    id: 0,
    image_url: "",
    status: "",
    amount_lessons: 0,
    created_at: "",
  };

  const url = window.location.href;
  const idCategory = parseInt(url.slice(url.lastIndexOf("/") + 1));

  useEffect(() => {
    if (!add) {
      dispatch(getCategory());
    }
    if (!add && allCategories.length > 1) {
        category = allCategories.filter(category => category.id === idCategory)[0];
        fetch(category.image_url).then(responce => responce.blob()).then(blob => setGetImage(blob))

      if (getImage) {
        const file = {
          image: getImage!,
          size: getImage!.size,
          name: String(getImage).slice(String(getImage).indexOf("/") + 1),
          type: getImage!.type,
         }
        setSelectImage(file);
      }
    }
  }, [dispatch, add, selectImage]);

  const initialValues: FormValues = {
    id: add ? 0 : category.id,
    name: add ? "" : category.name,
    description: add ? "" : category.description,
    image_url: add ? "" : category.image_url,
    status: add ? "active" : category.status,
    amount_lessons: add ? 0 : category.amount_lessons,
    created_at: add ? "" : category.created_at,
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
            // const imageFormat = String(selectImage["type"]);
            const isFormat = IMAGE_DATA.format.find(format =>
              "." + selectImage.type.slice(selectImage.type.indexOf("/") + 1) === format)
            if (!isFormat) {
              errors.image_url = intl.formatMessage({id: "app.categories.imageError"});
            }
            if (selectImage["size"] > IMAGE_DATA.size) {
              errors.image_url = intl.formatMessage({id: "app.categories.imageBigSize"});
            }
          }
          if (!selectImage) {
            errors.image_url = intl.formatMessage({id: "app.categories.selectFile"});
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          // values.name = values.name.trim();
          // values.description = values.description.trim();
          console.log(values)
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
                error={touched.image_url ? errors.image_url : undefined}
                selectImage={selectImage}
                setSelectImage={setSelectImage}
                getImage={getImage}
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