import "./EditVideoLessonForm.scss";
import { 
  BACKEND_URL_LESSONS, maxDescrHTCount,
  maxDescriptionLength, maxNameLength 
} from "../../constants";
import { 
  FC, useEffect, useState 
} from "react";
import { 
  Field, Form, Formik 
} from "formik";
import { RegExpDescription, RegExpName } from "../../validationRules";
import { useNavigate, useParams } from "react-router-dom";
import AddSubtitle from"../icons/addSubtitle.svg";
import Button from "../Button";
import { ILessonBack } from "../types/types";
import { Thumbnail } from "../Thumbnail";
import classNames from "classnames";
import sendInfoInLesson from "../../services/request";
import { useIntl } from "react-intl";

const hachTag = "#";
let countHashTag = 0; 

export const EditVideoLessonForm: FC = () => {
  const intl = useIntl();
  const [lesson, setLesson] = useState<ILessonBack | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const formData = new FormData();

  const CATEGORIES = [
    "app.lessons.categoryDesign",
    "app.lessons.categoryIT",
    "app.lessons.categoryMusic",
    "app.lessons.categoryBusiness",
    "app.lessons.categoryFitness",
    "app.lessons.categoryMarketing",
    "app.lessons.categoryFinance",
    "app.lessons.categoryPsychology",
    "app.lessons.categoryLanguages",
  ];
  const elementsCategory = CATEGORIES.map((category: string) => {
    return (
      <option key={category} id={category}>
        {intl.formatMessage({ id: category })}
      </option>
    );
  });

  useEffect(() => {
    fetch(BACKEND_URL_LESSONS + params.id)
      .then((response) => response.json())
      .then((lesson) => setLesson(lesson))
      .catch((error) => console.log(error));
  }, [params.id]);

  const handleImageUrlChange  = (currentImageUrl: string) => {
    setImageURL(currentImageUrl);
  };

  const changeInfoInLesson = (values: {
    name: string;
    description: string;
  }) => {
    const lessonFromEditForm = {title: `${values.name}`,
      description: `${values.description}`};
    sendInfoInLesson(BACKEND_URL_LESSONS + params.id, "PUT", lessonFromEditForm);
    changeImageInLesson();
  };

  const changeImageInLesson = () => {
    const token = localStorage.getItem("JWT");
    formData.append("lesson_image", imageURL);
    fetch(`${BACKEND_URL_LESSONS + params.id}`, {
      method: "PUT",
      headers: new Headers({ Authorization: `Bearer ${token}` }),
      body: formData,
    });
  };



  const validateName = (title: string) => {
    if (!title) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled" });
    } else if (!RegExpName.test(title)) {
      return intl.formatMessage({id: "app.editVideoLesson.errorProhibitedCharacters"});
    } else if (title.length > maxNameLength) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxCharacters" },
        { maxNameLength }
      );
    }
  };

  const getHashTagCount = (description: string, hachTag: string) => {
    const hashTagArr = [];
    description
      .split("")
      .map(
        (itemHashTag) => itemHashTag === hachTag && hashTagArr.push(itemHashTag)
      );
    countHashTag = hashTagArr.length;
  };

  const validateDescription = (description: string) => {
    getHashTagCount(description, hachTag);
    if (!description) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled" });
    } else if (!RegExpDescription.test(description)) {
      return intl.formatMessage({id: "app.editVideoLesson.errorProhibitedCharacters"});
    } else if (description.length > maxDescriptionLength) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxCharactersDescr" },
        { maxDescriptionLength }
      );
    } else if (countHashTag > maxDescrHTCount) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxHachTagDescr" },
        { maxDescriptionHashTagCount: maxDescrHTCount }
      );
    }
  };

  const lessonValuesFromBack = {
    name: `${
      lesson?.title === undefined
        ? 
        intl.formatMessage({id: "app.editVideoLesson.loading"})
        : 
        lesson?.title
    }`,
    category: "IT",
    description: `${
      lesson?.description === undefined
        ? 
        intl.formatMessage({id: "app.editVideoLesson.loading"})
        : 
        lesson?.description
    }`,

  };
  const initialValues = {
    name: "",
    category: "IT",
    description: "",
  };

  return (
    <Formik
      initialValues={lessonValuesFromBack || initialValues}
      onSubmit={(values) => {
        changeInfoInLesson(values);
        navigate("/lessons");
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className="evlf__wrapper">
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableName" })}
            <Field
              className={classNames("evlf__input", 
                {["error-input"]: errors.name && errors.name})}
              name="name"
              validate={validateName}
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </label>
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableCategory" })}
            <Field className="evlf__input" as="select" name="category">
              {elementsCategory}
            </Field>
          </label>
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableDescription" })}
            <Field
              className={classNames("evlf__input evlf__input-textarea", 
                {["error-input"]: errors.description && errors.description})}
              name="description"
              validate={validateDescription}
              as="textarea"
              rows="9"
            />
            {errors.description && touched.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </label>
          <div className="evlf__label">
            <label>
              {intl.formatMessage({ id: "app.editVideoLesson.lableSubtitles" })}
              <p className="evlf__text">
                {intl.formatMessage({id: "app.editVideoLesson.lableSubtitlesText"})}
              </p>
            </label>
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({ id: "app.button.addsubtitles" })}
              className="button__fs16 disabled"
              buttonImage={AddSubtitle}
              imageStyle="svg_add"
            />
          </div>
          <div className="evlf__label">
            <label>
              {intl.formatMessage({ id: "app.editVideoLesson.lableThumbnail" })}
              <p className="evlf__text">
                {intl.formatMessage({id: "app.editVideoLesson.lableThumbnailText"})}
              </p>
            </label>
            <Thumbnail
              lesson={lesson}
              onImageUrlChange={handleImageUrlChange}
              imageURL={imageURL}
            />
          </div>
          <div className="evlf__btn-wrapper">
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({ id: "app.button.cancel" })}
              className="button__fs16-white button__fs16-left"
              onClick={() => navigate("/myStudio")}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({ id: "app.button.save" })}
              className="button__fs16"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
