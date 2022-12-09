import "./EditVideoLessonTitle.scss";
import { EditVideoLessonForm } from "./EditVideoLessonForm";
import { useIntl } from "react-intl";

export const EditVideoLessonTitle = () => {
  const intl = useIntl();
  return (
    <div className="evl__wrapper">
      <div className="evl__inner">
        <div className="evl__content">
          <h2 className="evl__title">
            {intl.formatMessage({ id: "app.editVideoLesson.title"})}
          </h2>
          <EditVideoLessonForm/>
        </div>
      </div>
    </div> 
  );
};
