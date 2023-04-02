import "../body/content/my_studio/addLesson.scss";
import {
  DESCRIPTION_CATEGORY, THUMBNAIL_DATA, VIDEO_DATA
} from "../../constants";
import {
  Field, Form, Formik
} from "formik";
import {descriptionCategoryRegex, nameCategoryRegex} from "../../validationRules";
import {useEffect, useState} from "react";
import CategoryDescription from "../body/content/categories/actions/CategoryDescription";
import CategoryImage from "../body/content/categories/actions/CategoryImage";
import CategoryName from "../body/content/categories/actions/CategoryName";
import VideoCategory from "../body/content/my_studio/lessonComponents/VideoCategory";
import {useIntl} from "react-intl";

interface FormValues {
  name: string;
  description: string;
  category: string;
};

interface FormErrors {
  [key: string]: string;
};

type EditLessonProps = {
  lesson: {
    category_id: number,
    description: string,
    image_link: string,
    image_name: string,
    image_size: number,
    title: string,
    video_link: string,
  };
  setSelectImage: (object: { name: string, size: number, type: string, image: string }) => void;
  selectImage: { name: string, size: number, type: string, image: Blob | string };
  setEditThubnail: (object: { image: string, size: number, name: string }) => void;
  editThubnail: { image: string, size: number, name: string };
  setVideoCategory: (object: { value: string, label: string }) => void;
  videoCategory: { value: string, label: string };
  setLessonName: (name: string) => void;
  setLessonDescription: (description: string) => void;
  setIsDisabled: (boolean: boolean) => void;
  lessonName: string;
  lessonDescription: string;
}
const EditLesson = ({
  lesson,
  setLessonName,
  lessonName,
  lessonDescription,
  setLessonDescription,
  setVideoCategory,
  videoCategory,
  setSelectImage,
  selectImage,
  editThubnail,
  setEditThubnail,
  setIsDisabled,
}: EditLessonProps) => {
  const intl = useIntl();
  const [errorImage, setErrorImage] = useState("");

  const initialValue: FormValues = {
    name: lesson.title,
    description: lesson.description,
    category: "",
  };
  useEffect(() => {
    if (lessonName && lessonDescription && videoCategory.value &&
      (selectImage.name || editThubnail.name) && !errorImage) {
      setIsDisabled(false);
    }
    if (!lessonName || !lessonDescription || !videoCategory.value ||
      (!selectImage.name && !editThubnail.name) || errorImage) {
      setIsDisabled(true);
    }
  }, [lessonDescription, lessonName, editThubnail,
    selectImage, errorImage, setIsDisabled, videoCategory]);
  return (
    <Formik
      initialValues={initialValue}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (!nameCategoryRegex.test(values.name)) {
          errors.name = intl.formatMessage({id: "app.categories.name.invalid"});
        }
        if (values.name.trim().length < VIDEO_DATA.minSymbols) {
          errors.name = intl.formatMessage({id: "app.activeCategories.errorMinLength"});
        }
        if (values.name.length > VIDEO_DATA.maxSymbols) {
          errors.name = intl.formatMessage(
            {id: "app.activeCategories.errorMaxLength"}, {symbols: VIDEO_DATA.maxSymbols});
        }
        if (!errors.name) {
          setLessonName(values.name);
        } else {
          setLessonName("");
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
        if (!errors.description) {
          setLessonDescription(values.description);
        } else {
          setLessonDescription("");
        }
        return errors;
      }}
      onSubmit={() => {
        console.log("");
      }}>
      {({errors, touched}) => {
        return (
          <Form className="step__content">
            <Field
              name="name"
              label={intl.formatMessage({id: "app.Name"})}
              component={CategoryName}
              placeholder={intl.formatMessage({id: "app.Lessonname"})}
              error={touched.name ? errors.name : undefined}
            />
            <Field
              name="category"
              component={VideoCategory}
              setVideoCategory={setVideoCategory}
              videoCategory={videoCategory}
              error={touched.category ? errors.category : undefined}
              lesson={lesson}
              add={false}
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
          </Form>);
      }}
    </Formik>);
};

export default EditLesson;