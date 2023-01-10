import "./addCategory.scss";
import { DESCRIPTION_CATEGORY, NAME_CATEGORY } from "../../../../../constants";
import {
  Field, Form, Formik
} from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import {
  addCategory, getCategory, updateCategory
} from "../../../../../store/categorySlice/categorySlice";
import { descriptionCategoryRegex, nameCategoryRegex } from "../../../../../validationRules";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { useEffect, useState } from "react";
import Button from "../../../../Button";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";
import ModalCategory from "./ModalCategory";
import Successful from "../../../../icons/successful.svg";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
  image: string;
}

interface FormErrors {
  [key: string]: string;
}

type TypeTitle = {
  add: boolean;
}
const AddCategory = ({ add }: TypeTitle) => {
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
        <span className="button-back-text"><FormattedMessage id="app.categories.back" /></span>
      </div>
      {(add || category.id > 0) && <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (!nameCategoryRegex.test(values.name)) {
            errors.name = intl.formatMessage({ id: "app.categories.name.invalid" });
          }
          if (values.name.trim().length < NAME_CATEGORY.minSymbols) {
            errors.name = intl.formatMessage({ id: "app.activeCategories.errorMinLength" });
          }
          if (values.name.length > NAME_CATEGORY.maxSymbols) {
            errors.name = intl.formatMessage(
              { id: "app.activeCategories.errorMaxLength" }, { symbols: NAME_CATEGORY.maxSymbols });
          }
          if (!descriptionCategoryRegex.test(values.description)) {
            errors.description = intl.formatMessage({ id: "app.categories.description.invalid" });
          }
          if (values.description.trim().length < DESCRIPTION_CATEGORY.minSymbols) {
            errors.description = intl.formatMessage({ id: "app.activeCategories.errorMinLength" });
          }
          if (values.description.length > DESCRIPTION_CATEGORY.maxSymbols) {
            errors.description = intl.formatMessage({ id: "app.activeCategories.errorMaxLength" },
              { symbols: DESCRIPTION_CATEGORY.maxSymbols });
          }
          if (values.name && values.description &&
            !errors.name && !errors.description) {
            setIsErrorValue(true);
          } else {
            setIsErrorValue(false);
          }
          return errors;

        }}
        onSubmit={(values: FormValues) => {
          setISuccessful(true);
          if (add) {
            dispatch(addCategory({
              image: selectImage.image,
              name: values.name.trim(),
              description: values.description.trim(),
            }));
            dispatch(getCategory());
          } else {
            dispatch(updateCategory({
              id: idCategory,
              image: editCategory.image ? editCategory.image : selectImage.image,
              name: values.name.trim(),
              description: values.description.trim(),
            }));
            dispatch(getCategory());
          }
          navigate("/categories");
        }}>
        {({ errors, touched }) => {

          return (
            <Form className="form-category">
              <h1 className="add-title">
                {add ?
                  intl.formatMessage({ id: "app.categories.addCategory" }) :
                  intl.formatMessage({ id: "app.categories.editCategory" })
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
                setEditCategory={setEditCategory}
                editCategory={editCategory}
                errorImage={errorImage}
                setErrorImage={setErrorImage}
              />

              <div className="category-buttons">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({ id: "app.categories.button.cancel" })}
                  className="button-select button-cancel"
                  onClick={() => setIsClose(true)}
                />
                <Button
                  buttonType="submit"
                  buttonText={intl.formatMessage({ id: "app.categories.button.save" })}
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
        onClickYes={() => navigate("/categories")}
        title={intl.formatMessage({ id: "app.categories.close.text" })}
      />}
      {isSuccessful && <div className="wrapper-modal">
        <div className="field-modal">
          <div className="field-successful">
            <img src={Successful} alt="successful" className="successful-icon" />
            {add && <FormattedMessage id="app.categories.add.successful" />}
            {!add && <FormattedMessage id="app.categories.edit.successful" />}
            <div className="field-close-successful">
              <span className="close-modal" onClick={() => setISuccessful(false)} />
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default AddCategory;