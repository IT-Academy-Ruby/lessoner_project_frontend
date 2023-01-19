import "./renderLessonsPage.scss";
import { THEME, useTheme } from "../../utils/useTheme";
import Add from "../icons/add.svg";
import Button from "../Button";
import { FC } from "react";
import NoLessonsdark from "../body/content/my_studio/img/noLessons-dark.svg";
import NoLessonslight from "../body/content/my_studio/img/noLessons-light.svg";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

interface noLessonsPageProps {
  isOnLessonsPage: boolean;
}

export const NoLessonsPage: FC<noLessonsPageProps> = (props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const theme = useTheme();
  const image = theme === THEME.DARK ? NoLessonsdark : NoLessonslight;
  return (
    <div className="mystudio__nolessons">
      <div className="mystudio__nolessons-picture">
        <img src={image} alt="no Lessons" />
      </div>
      <p className="mystudio__nolessons-text">
        <span>{intl.formatMessage({ id: "app.lessons.NoLessonTexp_1" })}</span>
        <span>{intl.formatMessage({ id: "app.lessons.NoLessonTexp_2" })}</span>
      </p>
      <div className="mystudio__button">
        {props.isOnLessonsPage && (
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({ id: "app.button.addNewLesson" })}
            className="button__fs16"
            buttonImage={Add}
            imageStyle="mystudiohead__svg-add"
            onClick={() => navigate("/myStudio/add_new_lesson")}
          />
        )}
      </div>
    </div>
  );
};
