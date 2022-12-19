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
import frame85 from "../icons/Frame85.png";
import frame86 from "../icons/Frame86.png";
import frame87 from "../icons/Frame87.png";
import frame88 from "../icons/Frame88.png";
import request from "../../services/request";
import { useIntl } from "react-intl";
import { RegExpDescription, RegExpName } from "../../validationRules";
import { maxDescriptionLength, maxDescriptionHashTagCount, maxNameLength } from "../../constants";

const hachTag = "#";
let countHashTag = 0;

export const EditVideoLessonForm: FC = () => {
  const intl = useIntl();
  const items = [
    { id: 1, src: `${frame88}` },
    { id: 2, src: `${frame87}` },
    { id: 3, src: `${frame86}` },
    { id: 4, src: `${frame85}` },
  ];
  const [lesson, setLesson] = useState<ILessonBack | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const getLessonUrl =
    "https://lessoner-project-2w3h.onrender.com/lessons/" + params.id;
  const lessonEditUrl = getLessonUrl;
  

  useEffect(() => {
    return () => {
      fetch(getLessonUrl)
        .then((response) => response.json())
        .then((lesson) => setLesson(lesson))
        .catch((error) => console.log(error));
    };
  }, []);

  const editL = (lessonFromEditForm: any) => {
    return () => {
      request(lessonEditUrl, "PUT", lessonFromEditForm);
    };
  };

  const addInfoToLessonObject = (values: any) => {
    const lessonFromEditForm = {
      title: `${values.name}`,
      description: `${values.description}`,
    };
    editL(lessonFromEditForm);
  };

  const validateName = (title: string) => {
    if (!title) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled" });
    } else if (!RegExpName.test(title)) {
      return intl.formatMessage({
        id: "app.editVideoLesson.errorProhibitedCharacters",
      });
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
      return intl.formatMessage({
        id: "app.editVideoLesson.errorProhibitedCharacters",
      });
    } else if (description.length > maxDescriptionLength) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxCharactersDescr" },
        { maxDescriptionLength }
      );
    } else if (countHashTag > maxDescriptionHashTagCount) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxHachTagDescr" },
        { maxDescriptionHashTagCount }
      );
    }
  };

  const thumbnailId = (id: number) => {
    return id;
  };

  const lessonValuesFromBack = {
    name: `${lesson?.title}`,
    category: "IT",
    description: `${lesson?.description}`,
    thumbnail: 1,
  };
  const initialValues = {
    name: "",
    category: "IT",
    description: "",
    thumbnail: 1,
  };

  return (
    <Formik
      initialValues={lessonValuesFromBack || initialValues}
      onSubmit={(values) => {
        addInfoToLessonObject(values);
        navigate("/lessons");
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className="evlf__wrapper">
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableName" })}
            <Field
              className={classNames("evlf__input", {
                ["error-input"]: errors.name && errors.name,
              })}
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
                {intl.formatMessage({
                  id: "app.editVideoLesson.lableCategoryMusic",
                })}
              </option>
              <option value="Design">
                {intl.formatMessage({
                  id: "app.editVideoLesson.lableCategoryDesign",
                })}
              </option>
            </Field>
          </label>
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableDescription" })}
            <Field
              className={classNames("evlf__input evlf__input-textarea", {
                ["error-input"]: errors.description && errors.description,
              })}
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
                {intl.formatMessage({
                  id: "app.editVideoLesson.lableSubtitlesText",
                })}
              </p>
            </label>
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({ id: "app.button.addsubtitles" })}
              className="button__fs16 disabled"
              buttonIcon={<div className="svg__add"></div>}
            />
          </div>
          <label className="evlf__label">
            {intl.formatMessage({ id: "app.editVideoLesson.lableThumbnail" })}
            <p className="evlf__text">
              {intl.formatMessage({
                id: "app.editVideoLesson.lableThumbnailText",
              })}
            </p>
            <div className="evlth__wrapper">
              <div className="evlth__inner">
                <div className="evlth__inner-left">
                  {items.map(
                    (item: { id: number; src: string }) =>
                      item.id <= 2 && (
                        <div
                          className="evlth__item"
                          key={item.id}
                          onClick={() => thumbnailId(item.id)}
                        >
                          <img
                            className="evlth__item-img"
                            src={item.src}
                            alt="picture"
                          />
                        </div>
                      )
                  )}
                </div>
                <div className="evlth__inner-right">
                  {items.map(
                    (item: { id: number; src: string }) =>
                      item.id > 2 && (
                        <div
                          className="evlth__item"
                          key={item.id}
                          onClick={() => thumbnailId(item.id)}
                        >
                          <img
                            className="evlth__item-img"
                            src={item.src}
                            alt="picture"
                          />
                        </div>
                      )
                  )}
                </div>
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
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};;
