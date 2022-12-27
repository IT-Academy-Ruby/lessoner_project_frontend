import "./addCategory.scss";
import {DESCRIPTION_CATEGORY, NAME_CATEGORY, IMAGE_DATA} from "../../../../../constants";
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
import {useEffect, useState} from "react";
import Button from "../../../../Button";
import CategoryDescription from "./CategoryDescription";
import CategoryImage from "./CategoryImage";
import CategoryName from "./CategoryName";
import Successful from "../../../../icons/successful.svg";

interface FormValues {
  name: string;
  description: string;
  image_url: string;
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
  const [selectImage, setSelectImage] = useState({name: "", type: "", size: 0, image: ""});
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
  const [editCategory, setEditCategory] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [isSuccessful, setISuccessful] = useState(false);

  const url = window.location.href;
  const idCategory = parseInt(url.slice(url.lastIndexOf("/") + 1));

  useEffect(() => {
    if (!add && allCategories.length <= 1) {
      dispatch(getCategory());
    }
    if (!add && allCategories.length > 1) {
      setCategory(allCategories.filter(category => category.id === idCategory)[0]);
      setSelectImage({
        image: "",
        size: category.image_size,
        name: category.image_name,
        type: category.image_type,
      });
      setEditCategory(category.image_url);
    }
  }, [dispatch, add, allCategories]);

  const initialValues: FormValues = {
    name: category.name,
    description: category.description,
    image_url: "",
  };

  const nameLength = category.name.length;
  const descriptionLength = category.name.length;

  return (
    <div className="add-category">
      <div  className="button-back" onClick={()=>setIsClose(true)}>
        <span className="arrow-back">&#10094;</span>
        <FormattedMessage id="app.categories.back"/>
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
          if (selectImage.image || editCategory) {

            // const imageFormat = String(selectImage["type"]);
            // const isFormat = IMAGE_DATA.format.find(format =>
            //   "." + selectImage.type.slice(selectImage.type.indexOf("/") + 1) === format)
            // console.log(isFormat)
            // if (!isFormat) {
            //   errors.image_url = intl.formatMessage({id: "app.categories.imageError"});
            // }
            if (selectImage.size > IMAGE_DATA.size) {
              errors.image_url = intl.formatMessage({id: "app.categories.imageBigSize"});
            }
          }
          if (!selectImage.image && !editCategory) {
            errors.image_url = intl.formatMessage({id: "app.categories.selectFile"});
          }

          return errors;
        }}
        onSubmit={(values: FormValues) => {
          values.image_url = selectImage.image
          // values.name = values.name.trim();
          // values.description = values.description.trim();
          console.log(values)
          console.log(category.name)
          console.log(selectImage.name)
          setISuccessful(true)
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
                setEditCategory={setEditCategory}
                editCategory={editCategory}
                // getImage={getImage}
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
                  className="button-select"
                  disabled={!!errors.description || !!errors.name || !!errors.image_url}
                />
              </div>
            </Form>
          );
        }}
      </Formik>}
      {isClose && <div className="wrapper-modal">
        <div className="cansel-modal">
          <div className="field-close">
            <span className="close-modal" onClick={() => setIsClose(false)}/>
          </div>
          <span className="close-text">
             <FormattedMessage id="app.categories.close.text"/>
            </span>
          <div className="field-button">
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.categories.button.yes"})}
              className="button-login"
              onClick={() => navigate("/categories")}/>
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.categories.button.no"})}
              className="button-select"
              onClick={() => setIsClose(false)}/>
          </div>

        </div>
      </div>}
      {isSuccessful && <div className="wrapper-modal">
        <div className="field-modal">
          <div className="field-successful">
            <img src={Successful} alt="successful" className="successful-icon"/>
            {add && <FormattedMessage id="app.categories.add.successful"/>}
            {!add && <FormattedMessage id="app.categories.edit.successful"/>}
            <div className="field-close-successful">
              <span className="close-modal" onClick={() => setISuccessful(false)}/>
            </div>
          </div>

        </div>
      </div>}
    </div>
  );
};

export default AddCategory;