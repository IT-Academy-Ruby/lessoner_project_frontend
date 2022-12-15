import "./EditVideoLessonForm.scss";
import { 
  FC, useEffect, useState 
} from "react";
import { 
  Field, Form, Formik 
} from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import { ILessonBack } from "../types/types";
import classNames from "classnames";
import request from "../../services/request";
import { useIntl } from "react-intl";

const RegExp = /^[а-яА-ЯёЁa-zA-Z0-9( )!$%&'""*+-/=?^_`{|}~.,@<>:]+$/i;
const hashtagRegExp = /^[#]{0,10}$/;
const maxNameLength = 64;
const maxDescriptionLength = 600;

export const EditVideoLessonForm: FC = () => {
  const intl = useIntl();
  const items = [
    { id: 1, src: "" },
    { id: 2, src: "" },
    { id: 3, src: "" },
    { id: 4, src: "" },
  ];
  const [lesson, setLesson] = useState<ILessonBack | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const getLessonsUrl =
    "https://lessoner-project-2w3h.onrender.com/lessons/" + params.id;
  const lessonEditUrl = getLessonsUrl;

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = () => {
    fetch(getLessonsUrl)
      .then((response) => response.json())
      .then((lesson) => setLesson(lesson))
      .catch((error) => console.log(error));
  };

  const editL = (lessonFromEditForm: any) =>
    request(lessonEditUrl, "PUT", lessonFromEditForm);

  const addInfotoLessonObject = (values: any) => {
    const lessonFromEditForm = { title: `${values.name}`, description: `${values.description}`,};
    editL(lessonFromEditForm);
  };

  console.log(lesson);
  
   
  const validateName = (title: string) => {
    if (!title) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled" });
    } else if (!RegExp.test(title)) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorProhibitedCharacters" });
    } else if (title.length > maxNameLength) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxCharacters" },
        { maxNameLength }
      );
    }
  };

  const validateDescription = (value: string) => {
    if (!value) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled" });
    } else if (!RegExp.test(value)) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorProhibitedCharacters" });
    } else if (value.length > maxDescriptionLength) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxCharactersDescr" },
        { maxDescriptionLength }
      );
    }
  };

  const thumbnailId = (id: number) => {
    console.log(id);
  };

  const lessonValuesFromBack = {
    name: `${lesson?.title}`,
    category: "IT",
    description: `${lesson?.description}`,
    thumbnail: 0,
  };
  const initialValues = {
    name: "",
    category: "IT",
    description: "",
    thumbnail: 0,
  };

  return (
    <Formik
      initialValues={lessonValuesFromBack || initialValues}
      onSubmit={(values) => {
        console.log("submit", values);
        addInfotoLessonObject(values);
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className="evlf__wrapper">
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableName" })}
            <Field className={classNames("evlf__input", 
              { ["error-input"]: errors.name && errors.name, })}
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
              <option value="IT">IT</option>
              <option value="Music">
                {intl.formatMessage({ id: "app.editVideoLesson.lableCategoryMusic" })}
              </option>
              <option value="Design">
                {intl.formatMessage({ id: "app.editVideoLesson.lableCategoryDesign" })}
              </option>
            </Field>
          </label>
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableDescription" })}
            <Field className={classNames("evlf__input evlf__input-textarea", 
              { ["error-input"]: errors.description && errors.description, })}
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
                {intl.formatMessage({ id: "app.editVideoLesson.lableSubtitlesText" })}
              </p>
              {/* <div className="svg__add"></div> */}
            </label>
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({ id: "app.button.addsubtitles" })}
              className="button__fs16 disabled"
            />
          </div>
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableThumbnail" })}
            <p className="evlf__text">
              {intl.formatMessage({ id: "app.editVideoLesson.lableThumbnailText" })}
            </p>
            <div className="evlth__wrapper">
              <div className="evlth__inner">
                {items.map((item: { id: number; src: string }) => (
                  <div
                    className="evlth__item"
                    key={item.id}
                    onClick={() => thumbnailId(item.id)}
                  >
                    {/*  <img className="evlth__item-img" src={item.src} alt="picture"/> */}
                  </div>
                ))}
              </div>
            </div>
          </label>

          <div className="evlf__btn-wrapper">
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({ id: "app.button.cancel" })}
              className="button__fs16-white button__fs16-white-evlt"
              onClick={() => navigate("/lessons")}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({ id: "app.button.save" })}
              className="button__fs16"
              //onClick={() => navigate("/lessons")}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
