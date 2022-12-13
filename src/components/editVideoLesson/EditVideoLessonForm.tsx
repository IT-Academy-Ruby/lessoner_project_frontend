import "./EditVideoLessonForm.scss";
import { 
  Field, Form, Formik 
} from "formik";
import Button from "../Button";
import { EditVideoLessonThumbnail } from "./EditVideoLessonThumbnail";
import classNames from "classnames";
import { useIntl } from "react-intl";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const RegExp = /^[а-яА-ЯёЁa-zA-Z0-9( )!$%&'""*+-/=?^_`{|}~.,@<>:]+$/i;
const hashtagRegExp = /^[#]{0,10}$/;
const maxNameLength = 64;
const maxDescriptionLength = 600;

export const EditVideoLessonForm = () => {
  const intl = useIntl();
  const getCatigorieUrl = "https://lessoner-project-2w3h.onrender.com/categories";
  const items = [
    { id: 1, src: "" },
    { id: 2, src: "" },
    { id: 3, src: "" },
    { id: 4, src: "" },
  ];

  useEffect(() => {
    fetch(getCatigorieUrl)
      .then(response => response.json())
      .then(categories => getCatigories(categories))
      .catch(error => console.log(error));
  }, []);

  const getCatigories = (categories: any) => {
    console.log(categories);
    console.log(categories[0].id);
    console.log(categories[0].name);
    console.log(categories[0].description);
  };

  const validateName = (value: string) => {
    if (!value) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled"});
    } else if (!RegExp.test(value)) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorProhibitedCharacters"});
    } else if (value.length > maxNameLength) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorMaxCharacters"}, {maxNameLength});
    }
  };

  const validateDescription = (value: string) => {
    if (!value) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorNotFilled"});
    } else if (!RegExp.test(value)) {
      return intl.formatMessage({ id: "app.editVideoLesson.errorProhibitedCharacters"});
    } else if (value.length > maxDescriptionLength) {
      return intl.formatMessage(
        { id: "app.editVideoLesson.errorMaxCharactersDescr"}, {maxDescriptionLength});
    }
  };

  const thumbnailId = (id: number) => {
    console.log(id);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        category: "IT",
        description: "",
        thumbnail: 0,
      }}
      onSubmit={(values) => {
        console.log("submit", values);
      }}
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
              {intl.formatMessage({
                id: "app.editVideoLesson.lableThumbnailText",
              })}
            </p>
            <Field name="thumbnail" />
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
            <Link to="/lessons" className="evlf__btn-link">
              <Button
                buttonType="button"
                buttonText={intl.formatMessage({ id: "app.button.cancel" })}
                className="button__fs16-white button__fs16-white-evlt"
              />
            </Link>
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
