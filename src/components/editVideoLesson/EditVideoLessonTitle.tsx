import "../body/content/my_studio/addLesson.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  getLesson, resetLesson, updateLesson
} from "../../store/lessonSlice/lessonSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../Button";
import {EditLesson} from "./EditLesson";
import {ModalCategory} from "../body/content/categories/actions/ModalCategory";
import {uploadModalData} from "../../store/modalSlice/modalSlice";

export const EditVideoLessonTitle = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(state => state.lessons.lesson);
  const [isDisabled, setIsDisabled] = useState(true);
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [videoCategory, setVideoCategory] = useState({value: "", label: ""});
  const [selectImage, setSelectImage] = useState({
    name: "", type: "", size: 0, image: "",
  });
  const [editThubnail, setEditThubnail] = useState({
    name: "", size: 0, image: "",
  });
  const idLesson = useParams().id;

  useEffect(() => {
    dispatch(resetLesson());
    dispatch(getLesson(idLesson));
  }, [dispatch, idLesson]);

  useEffect(() => {
    setEditThubnail({
      name: lesson.image_name, size: lesson.image_size, image: lesson.image_link,
    });
  }, [lesson]);

  const editLesson = async () => {
    const userLesson = {
      id: idLesson,
      author_id: lesson.author_id.toString(),
      title: lessonName || lesson.title,
      category_id: videoCategory.value || lesson.category_id.toString(),
      description: lessonDescription || lesson.description,
      lesson_image: selectImage.image || editThubnail.image,
      lesson_video: null,
    };
    if (lessonName === lesson.title
      && videoCategory.value === lesson.category_id.toString()
      && lessonDescription === lesson.description
      && editThubnail.image === lesson.image_link) {
      navigate("/myStudio");
    } else {
      const response = await dispatch(updateLesson(userLesson));
      if (!response.payload.errors && !response.payload.error) {
        dispatch(uploadModalData({
          text: intl.formatMessage({id: "app.add.lesson.edit.successful"}),
          urlNavigate: "/myStudio",
          isOpen: true,
          typeModal: undefined
        }));
      }
      if (response.payload.errors){
        let valuerError: string[] = [];
        for (const key in response.payload.errors) {
          const error = key + " - " + response.payload.errors[key];
          valuerError = [...valuerError, error];
        }
        dispatch(uploadModalData({
          text: valuerError.join(", "),
          isOpen: true,
          typeModal: true
        }));
      }
      if(response.payload.error){
        dispatch(uploadModalData({
          text: response.payload.error,
          isOpen: true,
          typeModal: true
        }));
      }
    }
  };
  return (
    <div className="lesson__wrapper">
      <div className="lesson__buttonBack" onClick={() => {
        setIsClose(true);
      }}>
        <span className="lesson__arrowBack">&#10094;</span>
        <span><FormattedMessage id="app.categories.back"/></span>
      </div>
      <div className="lesson__form">
        <h1 className="lesson__title">
          <FormattedMessage id="app.EditLesson"/>
        </h1>
        {lesson.title && <EditLesson
          lesson={lesson}
          setSelectImage={setSelectImage}
          selectImage={selectImage}
          editThubnail={editThubnail}
          setEditThubnail={setEditThubnail}
          setVideoCategory={setVideoCategory}
          videoCategory={videoCategory}
          setLessonDescription={setLessonDescription}
          setLessonName={setLessonName}
          setIsDisabled={setIsDisabled}
          lessonDescription={lessonDescription}
          lessonName={lessonName}
        />}
        <div className="lesson-buttons">
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.categories.button.cancel"})}
            className="button-select button-cancel"
            onClick={() => setIsClose(true)}
          />
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.EditLesson"})}
            className="button-select"
            disabled={isDisabled}
            onClick={editLesson}
          />
        </div>
      </div>
      {isClose && <ModalCategory
        setIsClose={setIsClose}
        onClickYes={() => navigate(-1)}
        title={intl.formatMessage({id: "app.categories.close.text"})}
      />}
    </div>
  );
};
