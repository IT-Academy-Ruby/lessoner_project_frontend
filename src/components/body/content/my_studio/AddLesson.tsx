import "./addLesson.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  addVideo, getLessons, updateLesson
} from "../../../../store/lessonSlice/lessonSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import Button from "../../../Button";
import FirstStep from "./lessonComponents/FirstStep";
import ModalCategory from "../categories/actions/ModalCategory";
import SecondStep from "./lessonComponents/SecondStep";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

type AddLessonProps = {
  add: boolean;
}

const AddLesson = ({add}: AddLessonProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isClose, setIsClose] = useState(false);
  const [isStep2, setIsStep2] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [selectVideo, setSelectVideo] = useState({
    name: "", size: 0, type: "", video: ""
  });
  const [videoCategory, setVideoCategory] = useState({value: "", label: ""});
  const [videoDescription, setVideoDescription] = useState("");
  const [selectImage, setSelectImage] = useState({
    name: "", type: "", size: 0, image: "",
  });
  const [isDisabledStep2, setIsDisabledStep2] = useState(true);

  const author = useAppSelector(state => state.dataUser.user);
  const allLessons = useAppSelector(state => state.lessons.records);

  const [lesson, setLesson] = useState({
    category_id: 0,
    description: "",
    image_link: "",
    image_name: "",
    image_size: 0,
    title: "",
    video_link: "",
  });

  const [editVideo, setEditVideo] = useState({
    name: "", type: "", size: 0, video: "",
  });
  const [editThubnail, setEditThubnail] = useState({
    name: "", size: 0, image: "",
  });

  const url = window.location.href;
  const idLesson = parseInt(url.slice(url.lastIndexOf("/") + 1));

  useEffect(() => {
    if (!add && allLessons.length <= 1) {
      dispatch(getLessons());
    }
    if (!add && allLessons.length > 1) {
      setLesson(allLessons.filter(videoCategory => videoCategory.id === idLesson)[0]);
    }
    setEditVideo({
      video: lesson.video_link,
      size: 0,
      name: "",
      type: "",
    });
    setEditThubnail({
      image: lesson.image_link,
      size: lesson.image_size,
      name: lesson.image_name,
    });
  }, [dispatch, add, allLessons, lesson, idLesson]);

  const handleClose = () => {
    if (isStep2) {
      setIsStep2(false);
    } else {
      setIsClose(true);
    }
  };

  const nextStep = () => {
    if (!isStep2) {
      setIsStep2(true);
    }
  };

  const addLesson = () => {
    const userLesson = {
      title: videoName,
      description: videoDescription,
      lesson_video: selectVideo.video,
      category_id: videoCategory.value,
      author_id: author.id.toString(),
      lesson_image: selectImage.image,
    };
    if (!selectVideo.name) {
      userLesson.lesson_video = videoLink;
    }
    dispatch(addVideo(userLesson));
    navigate("/myStudio");
    dispatch(getLessons());
  };

  const editLesson = () => {
    const userLesson = {
      id: idLesson,
      author_id: author.id.toString(),
      title: videoName ? videoName : lesson.title,
      lesson_video: (selectVideo.video || editVideo.video) ?
        (selectVideo.video || editVideo.video) : lesson.video_link,
      category_id: videoCategory.value || lesson.category_id.toString(),
      description: videoDescription ? videoDescription : lesson.description,
      lesson_image: selectImage.image || editThubnail.image,
    };
    if (!selectVideo.name) {
      userLesson.lesson_video = videoLink || lesson.video_link;
    }
    if (videoName === lesson.title && videoLink === lesson.video_link
      && videoCategory.value === lesson.category_id.toString()
      && videoDescription === lesson.description
      && editThubnail.image === lesson.image_link) {
      navigate("/myStudio");
    } else {
      dispatch(updateLesson(userLesson));
      navigate("/myStudio");
      dispatch(getLessons());
    }
  };

  useEffect(() => {
    if (!add && lesson.description) {
      setVideoName(lesson.title);
      setVideoLink(lesson.video_link);
      setVideoDescription(lesson.description);
    }
  }, [add, lesson]);

  return (
    <div className="add-lesson">
      <div className="button-back" onClick={handleClose}>
        <span className="arrow-back">&#10094;</span>
        <span><FormattedMessage id="app.categories.back"/></span>
      </div>
      <div className="form-lesson">
        <h1 className="title-add-lesson">
          {add && <FormattedMessage id="app.AddNewLesson"/>}
          {!add && <FormattedMessage id="app.EditLesson"/>}
        </h1>
        <div className="steps">
          <div className="step">
            <span className={classNames("name-step", {"name-active": !isStep2})}>
              <FormattedMessage id="app.Step1"/>
            </span>
            <span className={classNames("title-step", {"title-active": !isStep2})}>
              <FormattedMessage id="app.GetStarted"/>
            </span>
          </div>
          <span className="step-arrow">&#10095;</span>
          <div className="step">
            <span className={classNames("name-step", {"name-active": isStep2})}>
              <FormattedMessage id="app.Step2"/>
            </span>
            <span className={classNames("title-step", {"title-active": isStep2})}>
              <FormattedMessage id="app.LessonDetails"/>
            </span>
          </div>
        </div>
        {!isStep2 && <FirstStep
          setIsDisabled={setIsDisabled}
          videoLink={videoLink}
          setVideoLink={setVideoLink}
          videoName={videoName}
          setVideoName={setVideoName}
          selectVideo={selectVideo}
          setSelectVideo={setSelectVideo}
          lesson={lesson}
          add={add}
        />}
        {isStep2 && <SecondStep
          setVideoCategory={setVideoCategory}
          videoCategory={videoCategory}
          setVideoDescription={setVideoDescription}
          videoDescription={videoDescription}
          setSelectImage={setSelectImage}
          selectImage={selectImage}
          setIsDisabledStep2={setIsDisabledStep2}
          editThubnail={editThubnail}
          setEditThubnail={setEditThubnail}
          lesson={lesson}
          add={add}
        />}
        <div className="lesson-buttons">
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.categories.button.cancel"})}
            className="button-select button-cancel"
            onClick={() => setIsClose(true)}
          />
          {!isStep2 && <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.NextStep"})}
            className="button-select"
            disabled={isDisabled}
            onClick={nextStep}
          />}
          {isStep2 && <Button
            buttonType="button"
            buttonText={
              add ? intl.formatMessage({id: "app.addNewLesson"})
                :intl.formatMessage({id: "app.EditLesson"})}
            className="button-select"
            disabled={isDisabledStep2}
            onClick={add ? addLesson : editLesson}
          />}
        </div>
      </div>
      {isClose && <ModalCategory
        setIsClose={setIsClose}
        onClickYes={() => navigate("/myStudio")}
        title={intl.formatMessage({id: "app.categories.close.text"})}
      />
      }
    </div>
  );
};

export default AddLesson;