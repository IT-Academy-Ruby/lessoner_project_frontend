import "./myStudio.scss";
import Add from "../../../icons/add.svg";
import Button from "../../../Button";
import MyStudioContent from "./MyStudioContent";
import MyStudioHead from "./MyStudioHead";
import NoLessons from "./img/noLessons.svg";
import { useIntl } from "react-intl"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL_LESSONS } from "../../../../constants";
import Loader  from "../../../Loader";

const MyStudio = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [isLesson, setIsLesson] = useState(false);
  const [isNoLesson, setIsNoLesson] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    fetch(BACKEND_URL_LESSONS)
      .then((response) => response.json())
      .then((lesson) =>
        lesson !== undefined && lesson.records.length > 0
          ? (setIsLesson(true), setIsLoader(false))
          : (lesson.records.length === 0 && setIsNoLesson(true),
            setIsLoader(false))
      )
      .catch((error) => console.log(error));
  }, [BACKEND_URL_LESSONS]);

  return (
    <div className="mystudio__wrapper">
      <div className="mystudio__inner">
        {isLoader ? <Loader /> : isLesson ? (
          <>
            <MyStudioHead />
            <MyStudioContent />
          </>
        ) : (
          isNoLesson && (
            <div className="mystudio__nolessons">
              <div className="mystudio__nolessons-picture">
                <img src={NoLessons} alt="no Lessons" />
              </div>
              <p className="mystudio__nolessons-text">
                <span>Hmm... Seems that you have no lessons yet.</span>
                <span>Share your knowledge - publishe your first lesson</span>
              </p>
              <div className="mystudio__button">
                <Button
                  buttonType="button"
                  buttonText={intl.formatMessage({
                    id: "app.button.addNewLesson",
                  })}
                  className="button__fs16"
                  buttonImage={Add}
                  imageStyle="mystudiohead__svg-add"
                  onClick={() => navigate("/myStudio/add_new_lesson")}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyStudio;
