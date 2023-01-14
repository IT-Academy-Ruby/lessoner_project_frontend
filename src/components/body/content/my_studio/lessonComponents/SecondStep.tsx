import {DESCRIPTION_CATEGORY, THUMBNAIL_DATA} from "../../../../../constants";
import {
  Field, Form, Formik
} from "formik";
import {useEffect, useState} from "react";
import CategoryDescription from "../../categories/actions/CategoryDescription";
import CategoryImage from "../../categories/actions/CategoryImage";
import Checkbox from "../../../../Checkbox";
import VideoCategory from "./VideoCategory";
import {descriptionCategoryRegex} from "../../../../../validationRules";
import {useIntl} from "react-intl";

interface FormValues {
  category: string;
  description: string;
  image: string;
  hasTermsAndConditions: boolean;
};

interface FormErrors {
  [key: string]: string;
};

type StepTwoProp = {
  setIsDisabledStep2: (boolean: boolean) => void;
  setVideoCategory: (object: { value: string, label: string }) => void;
  videoCategory: { value: string, label: string };
  videoDescription: string;
  setVideoDescription: (string: string) => void;
  setSelectImage: (object: { name: string, size: number, type: string, image: string }) => void;
  selectImage: { name: string, size: number, type: string, image: Blob | string };
  setEditThubnail: (object: { image: string, size: number, name: string }) => void;
  editThubnail: { image: string, size: number, name: string };
  lesson: {
    image_link: string,
    image_name: string,
    image_size: number,
    description: string,
    category_id: number,
  };
  add: boolean;
}

const SecondStep = ({
  setVideoCategory, videoCategory, setVideoDescription, videoDescription,
  setSelectImage, selectImage, setIsDisabledStep2, editThubnail,
  setEditThubnail, lesson, add
}: StepTwoProp) => {
  const intl = useIntl();
  const [errorImage, setErrorImage] = useState("");

  const initialValues: FormValues = {
    category: "",
    description: videoDescription || lesson.description,
    image: editThubnail.image,
    hasTermsAndConditions: !add,
  };

  useEffect(() => {
    if (add && videoCategory.value && videoDescription && selectImage.name && !errorImage) {
      setIsDisabledStep2(false);
    }
    if (add && (!videoCategory.value || !videoDescription && !selectImage.name && errorImage)) {
      setIsDisabledStep2(true);
    }
    if (!add && videoDescription && (selectImage.name || editThubnail.name) && !errorImage) {
      setIsDisabledStep2(false);
    }
    if (!add && (!videoDescription || (!selectImage.name && !editThubnail.name) || errorImage)) {
      setIsDisabledStep2(true);
    }
  }, [add, videoCategory, videoDescription, editThubnail,
    setIsDisabledStep2, selectImage.name, errorImage]);

  return (<>
    {(add || lesson.description) && <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
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
        if (!errors.description) {
          setVideoDescription(values.description);
        } else {
          setVideoDescription("");
        }
        return errors;
      }}
      onSubmit={() => {
        console.log("");
      }}>
      {({errors, touched}) => {
        return (
          <Form className="step-content">
            <Field
              name="category"
              component={VideoCategory}
              setVideoCategory={setVideoCategory}
              videoCategory={videoCategory}
              error={touched.category ? errors.category : undefined}
              lesson={lesson}
              add={add}
            />
            <Field
              name="description"
              component={CategoryDescription}
              placeholder={intl.formatMessage({id: "app.lessons.placeholder.description"})}
              error={touched.description ? errors.description : undefined}
            />
            <Field
              name="thumbnail"
              component={CategoryImage}
              selectImage={selectImage}
              setSelectImage={setSelectImage}
              setEditCategory={setEditThubnail}
              editCategory={editThubnail}
              errorImage={errorImage}
              setErrorImage={setErrorImage}
              isCategory={false}
              title={intl.formatMessage({id: "app.Thumbnail"})}
              inform={intl.formatMessage(
                {id: "app.SelectOrUploadAPictureThatShowsWhatsInYourVideo"})}
              textButton={intl.formatMessage({id: "app.uploadThumbnail"})}
              imageData={THUMBNAIL_DATA}
            />
            {add && <Field
              name="hasTermsAndConditions"
              component={Checkbox}
              information={intl.formatMessage({id: "app.checkbox"})}
              link={intl.formatMessage({id: "app.checkbox.terms"})}
              error={touched.hasTermsAndConditions ? errors.hasTermsAndConditions : undefined}
            />}
          </Form>);
      }}
    </Formik>}
  </>
  );
};

export default SecondStep;