import "./mainLesson.scss";
import {DescriptionLesson} from "./DescriptionLesson";
import {FormattedMessage} from "react-intl";
import Logo from "../../../icons/Logo.svg";
import {RatingStars} from "../../../ratingCounter/RatingStars";
import {VideoPlayer} from "../../../videoPlayer/VideoPlayer";
import {useAppSelector} from "../../../../store/hooks";

type MainLessonProps = {
  category: string;
}

export const MainLesson = ({category}: MainLessonProps) => {
  const dataLesson = useAppSelector(state => state.lessons.lesson);
  const formatter = new Intl.DateTimeFormat("ru");
  return (
    <div className="mainLesson">
      <VideoPlayer
        src={dataLesson.video_link}
        previewImg={dataLesson.image_link}
        id={dataLesson.id}
      />
      <div className="mainLesson__data">
        <img
          src={dataLesson.author_avatar_url || Logo}
          alt={dataLesson.author_name}
          className="mainLesson__authorAvatar"/>
        <div className="mainLesson__dataTitle">
          <p className="mainLesson__title">{dataLesson.title}</p>
          <p className="mainLesson__author">{dataLesson.author_name}</p>
        </div>
        <RatingStars/>
      </div>
      <span className="mainLesson__category">{category}</span>
      <div className="mainLesson__create">
        <p className="mainLesson__date">
          <FormattedMessage id={"app.lessonCard.Published"}/>
          {dataLesson.created_at ? formatter.format(new Date(dataLesson.created_at)) : null}
        </p>
        <span className="mainLesson__views">
          {dataLesson.views_count}
          <FormattedMessage id={"app.lessonCard.Views"}/>
        </span>
      </div>
      <DescriptionLesson description={dataLesson.description}/>
    </div>
  );
};
