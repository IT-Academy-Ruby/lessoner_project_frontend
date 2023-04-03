import "../addLesson.module.scss";
import {
  Field, Form, Formik
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {RegExpVideo, nameCategoryRegex} from "../../../../../validationRules";
import {useEffect, useState} from "react";
import {CategoryName} from "../../categories/actions/CategoryName";
import {VIDEO_DATA} from "../../../../../constants";
import {VideoLesson} from "../lessonComponents/VideoLesson";

interface FormValues {
  name: string;
  link: string;
  video: string;
};

interface FormErrors {
  [key: string]: string;
};

type StepOneProp = {
  setIsDisabled: (boolean: boolean) => void;
  videoName: string;
  setVideoName: (string: string) => void;
  videoLink: string;
  setVideoLink: (string: string) => void;
  setSelectVideo: (object: {
    name: string;
    size: number;
    type: string;
    video: string;
  }) => void;
  selectVideo: {
    name: string;
    size: number;
    type: string;
    video: Blob | string;
  };
  lesson: {
    title: string;
    video_link: string;
  };
  add: boolean;
}

export const FirstStep = ({
  videoName, setVideoName, videoLink, setVideoLink, selectVideo,
  setSelectVideo, setIsDisabled, lesson, add
}: StepOneProp) => {
  const intl = useIntl();
  const [isDisabledSelectFile, setIsDisabledSelectFile] = useState(false);
  const [errorVideo, setErrorVideo] = useState("");

  const initialValues: FormValues = {
    name: videoName || lesson.title,
    link: selectVideo.name ? "" : (videoLink || lesson.video_link),
    video: "",
  };

  useEffect(() => {
    if (add && videoName && ((selectVideo.name && !errorVideo) || videoLink)) {
      setIsDisabled(false);
    }
    if (add && (!videoName || (!videoLink && !selectVideo.name) || errorVideo)) {
      setIsDisabled(true);
    }
    if (!add && videoName && (videoLink || selectVideo.name) && !errorVideo) {
      setIsDisabled(false);
    }
    if (!add && (!videoName || (!videoLink && !selectVideo.name) || errorVideo)) {
      setIsDisabled(true);
    }
  }, [add, setIsDisabled, selectVideo, errorVideo, videoLink, videoName]);

  useEffect(() => {
    if (videoLink) {
      setIsDisabledSelectFile(true);
    } else {
      setIsDisabledSelectFile(false);
    }
  }, [videoLink]);

  return (<>
    {(add || lesson.title) && <Formik
      initialValues={initialValues}
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
          setVideoName(values.name);
        } else {
          setVideoName("");
        }
        if (!RegExpVideo.test(values.link)) {
          errors.link = intl.formatMessage({id: "app.categories.description.invalid"});
        }
        if (!errors.link) {
          setVideoLink(values.link);
        } else {
          setVideoLink("");
        }
        return errors;
      }}
      onSubmit={() => {
        console.log("");
      }}>
      {({errors, touched}) => {
        if (selectVideo.name) {
          errors.link = "";
        }
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
              name="link"
              label={intl.formatMessage({id: "app.LinkToTheVideo"})}
              component={CategoryName}
              placeholder="http://"
              error={touched.link ? errors.link : undefined}
              disabled={!!selectVideo.name}
            />
            <div className="or">
              <span className="line-right"></span>
              <FormattedMessage id="app.or"/>
              <span className="line-left"></span>
            </div>
            <Field
              name="video"
              component={VideoLesson}
              selectVideo={selectVideo}
              setSelectVideo={setSelectVideo}
              errorVideo={errorVideo}
              setErrorVideo={setErrorVideo}
              isDisabledSelectFile={isDisabledSelectFile}
            />
          </Form>);
      }}
    </Formik>}
  </>
  );
};