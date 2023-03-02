import "./addCategory.scss";
import {
  DESCRIPTION_CATEGORY, IMAGE_DATA, NAME_CATEGORY
} from "../../../../../constants";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {
  addCategory, getCategory, updateCategory
} from "../../../../../store/categorySlice/categorySlice";
import {descriptionCategoryRegex, nameCategoryRegex} from "../../../../../validationRules";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {
  useEffect, useRef, useState
} from "react";
import Button from "../../../../Button";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";
import ModalCategory from "./ModalCategory";
import SuccessfulModal from "./SuccessfulModal";
import {useNavigate} from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
  image: string;
}

interface FormErrors {
  [key: string]: string;
}

type addCategoryProps = {
  add: boolean;
}

const AddCategory = ({add}: addCategoryProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectImage, setSelectImage] = useState({
    name: "", type: "", size: 0, image: undefined,
  });
  const allCategories = useAppSelector((state) => state.categories.categories);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    id: 0,
    image_url: "",
    status: "active",
    amount_lessons: 0,
    created_at: "",
    image_size: 0,
    image_name: "",
    image_type: "",
  });

  const [editCategory, setEditCategory] = useState({
    name: "", type: "", size: 0, image: "",
  });

  const [isClose, setIsClose] = useState(false);
  const [isSuccessful, setISuccessful] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isErrorValue, setIsErrorValue] = useState(false);
  const [errorImage, setErrorImage] = useState("");
  const [isOccupiedName, setIsOccupiedName] = useState("");
  const [isOccupiedDescription, setIsOccupiedDescription] = useState("");

  const url = window.location.href;
  const idCategory = parseInt(url.slice(url.lastIndexOf("/") + 1));

  useEffect(() => {
    if (!add && allCategories.length <= 1) {
      dispatch(getCategory());
    }
    if (!add && allCategories.length > 1) {
      setCategory(allCategories.filter(category => category.id === idCategory)[0]);
    }
    setEditCategory({
      image: category.image_url,
      size: category.image_size,
      name: category.image_name,
      type: category.image_type,
    });
  }, [dispatch, add, allCategories, category, idCategory]);

  const initialValues: FormValues = {
    name: category.name,
    description: category.description,
    image: editCategory.image,
  };

  const nameLength = category.name.length;
  const descriptionLength = category.name.length;

  useEffect(() => {
    if ((selectImage.image || editCategory.image) && !errorImage && isErrorValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectImage, editCategory, isErrorValue, errorImage]);

  return (
    <div className="add-category">
      <div className="button-back" onClick={() => setIsClose(true)}>
        <span className="arrow-back">&#10094;</span>
        <span className="button-back-text"><FormattedMessage id="app.categories.back"/></span>
      </div>
      {(add || category.id > 0) && <Formik
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
          if (values.name && values.description &&
            !errors.name && !errors.description) {
            setIsErrorValue(true);
          } else {
            setIsErrorValue(false);
          }
          return errors;
        }}
        onSubmit={async (values: FormValues) => {
          let response;
          if (add) {
            response = await dispatch(addCategory({
              image: selectImage.image,
              name: values.name.trim(),
              description: values.description.trim(),
            }));
          } else {
            response = await dispatch(updateCategory({
              id: idCategory,
              image: editCategory.image ? editCategory.image : selectImage.image,
              name: values.name.trim(),
              description: values.description.trim(),
            }));
          }
          if (response.payload.errors) {
            if (response.payload.errors.name) {
              setIsOccupiedName(intl.formatMessage({id: "app.categories.nameOccupied"}));
              nameRef.current?.focus();
            }
            if (response.payload.errors.description) {
              setIsOccupiedDescription(intl.formatMessage(
                {id: "app.categories.descriptionOccupied"}));
              descriptionRef.current?.focus();
            }
          }
          if (!response.payload.errors) {
            dispatch(getCategory());
            setISuccessful(true);
          }
        }}>
        {({errors, touched}) => {
          return (
            <Form className="form-category">
              <h1 className="add-title">
                {add ?
                  intl.formatMessage({id: "app.categories.addCategory"}) :
                  intl.formatMessage({id: "app.categories.editCategory"})
                }
              </h1>
              <Field
                name="name"
                label={intl.formatMessage({id: "app.categories.name"})}
                component={CategoryName}
                placeholder={intl.formatMessage({id: "app.categories.name"})}
                error={touched.name ? errors.name : undefined}
                nameLength={nameLength}
                nameRef={nameRef}
                isOccupiedName={isOccupiedName}
              />
              <Field
                name="description"
                component={CategoryDescription}
                error={touched.description ? errors.description : undefined}
                descriptionLength={descriptionLength}
                placeholder={intl.formatMessage({id: "app.categories.placeholder.description"})}
                descriptionRef={descriptionRef}
                isOccupiedDescription={isOccupiedDescription}
              />
              <Field
                name="image"
                component={CategoryImage}
                selectImage={selectImage}
                setSelectImage={setSelectImage}
                setEditCategory={setEditCategory}
                editCategory={editCategory}
                errorImage={errorImage}
                setErrorImage={setErrorImage}
                isCategory={true}
                title={intl.formatMessage({id: "app.categories.uploadCategoryImage"})}
                inform={intl.formatMessage({id: "app.categories.imageInform"})}
                textButton={intl.formatMessage({id: "app.categories.button.select"})}
                imageData={IMAGE_DATA}
              />

              <div className="category-buttons">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({id: "app.categories.button.cancel"})}
                  className="button-select button-cancel"
                  onClick={() => setIsClose(true)}
                />
                <Button
                  buttonType="submit"
                  buttonText={intl.formatMessage({id: "app.categories.button.save"})}
                  className="button-select button-save"
                  disabled={isDisabled}
                />
              </div>
            </Form>
          );
        }}
      </Formik>}
      {isClose && <ModalCategory
        setIsClose={setIsClose}
        onClickYes={() => navigate("/categories/management")}
        title={intl.formatMessage({id: "app.categories.close.text"})}
      />}
      {isSuccessful && <SuccessfulModal
        text={
          add ? intl.formatMessage({id: "app.categories.add.successful"}) :
            intl.formatMessage({id: "app.categories.edit.successful"})
        }
        url="/categories/management"
        setIsSuccessful={setISuccessful}
      />}
    </div>
  );
};

export default AddCategory;