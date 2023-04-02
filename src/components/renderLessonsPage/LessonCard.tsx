import "./lessonCard.scss";
import {Link, useNavigate} from "react-router-dom";
import Edit from "../icons/edit.svg";
import {FormattedMessage} from "react-intl";
import Rating from "../body/content/Rating/Rating";
import {selectedCategory} from "../../store/categorySlice/categorySlice";
import {useAppDispatch} from "../../store/hooks";

type LesonCardProps = {
  id: number;
  thumbnailUrl: string;
  status: string | number;
  authorAvatarUrl: string;
  authorName: string;
  title: string;
  published: string;
  viewsCount: number;
  rating: number;
  totalVotes: number;
  type: string;
  category?: string | undefined;
  categoryId?: number;
}

const LessonCard = ({
  id, thumbnailUrl, status, authorAvatarUrl, authorName, title,
  published, viewsCount, category, rating, totalVotes, type, categoryId
}: LesonCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formatter = new Intl.DateTimeFormat("ru");

  return (
    <div className={`lesson__card ${type}__card`}>
      <div className={`lesson__thumbnail ${type}__thumbnail`}>
        <Link className="lesson__link" to={`/lessons/${id}`}>
          <img className={`lesson__icon ${type}__icon`} src={thumbnailUrl} alt="Videopreview"/>
          {type === "myStudio" && <span className="lesson__status">{status}</span>}
        </Link>
      </div>
      <div className={`lesson__data ${type}__data`}>
        {type === "lessonsPage" && <div className="lesson__author">
          <img src={authorAvatarUrl} className="lesson__author-avatar" alt="avatar"/>
          <span className="lesson__author-nick">{authorName}</span>
        </div>}
        <div className={`${type}__title`}>
          <Link
            to={`/lessons/${id}`}
            title={title}
            className={`lesson__name ${type}__name`}
          >{title}</Link>
          {type === "myStudio" && status !== "archived"
            && <img
              src={Edit}
              className="lesson__edit"
              alt="pencil"
              onClick={() => navigate("/myStudio/lesson/" + id)}
            />}
        </div>
        <div className={`lesson__info ${type}__info`}>
          <p className="lesson__info-date">
            <FormattedMessage id="app.lessonCard.Published"/>
            {published ? formatter.format(new Date(published)) : null}
          </p>
          <p className="lesson__info-views">
            {viewsCount}<FormattedMessage id="app.lessonCard.Views"/>
          </p>
        </div>
        <div className={`lesson__rating ${type}__rating`}>
          {type !== "sideBar" &&
            <p
              className="lesson__category"
              onClick={() => {
                dispatch(selectedCategory({name: category, id: categoryId}));
              }}
            >
              {category}
            </p>}
          <Rating
            rating={rating && +rating.toFixed(1)}
            totalVotes={totalVotes}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonCard;