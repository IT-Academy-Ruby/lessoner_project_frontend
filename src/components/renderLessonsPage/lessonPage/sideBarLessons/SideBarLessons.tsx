import "./sideBarLessons.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {getLessons, resetLessons} from "../../../../store/lessonSlice/lessonSlice";
import LessonCard from "../../LessonCard";
import {LESSONPAGE} from "../../../../constants";
import SortButton from "../../SortButton";
import {Fragment, useEffect, useState} from "react";

type SideBarLessonsProps = {
  categoryName: string;
}

const SideBarLessons = ({categoryName}: SideBarLessonsProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(state => state.lessons.records);
  const lesson = useAppSelector(state => state.lessons.lesson);

  const categoryButton = {
    name: categoryName,
    class: "lessonSort",
    method: "",
    status: "active"
  };
  const countPages = useAppSelector(state => state.lessons.pagy_metadata.count_pages);
  const [status, setStatus] = useState(categoryButton);
  const [numberPage, setNumberPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const sortValue = [
    categoryButton,
    {
      name: intl.formatMessage({id: "app.lessons.statusNew"}),
      class: "lessonSort",
      method: "created_at",
      status: "active"
    },
    {
      name: intl.formatMessage({id: "app.lessons.statusPopular"}),
      class: "lessonSort",
      method: "views_count",
      status: "active"
    },
  ];

  useEffect(() => {
    dispatch(resetLessons());
    setLoading(true);
    setNumberPage(1);
  }, [window.location.href]);

  useEffect(() => {
    if (((loading && countPages === 0) || (loading && countPages >= numberPage)) && lesson.category_id) {
      dispatch(getLessons({
        myStudio: false,
        page: numberPage,
        category: status.name === categoryName ? lesson.category_id : undefined,
        sortValue: status.method,
        perPage: LESSONPAGE,
        status: status.status
      }))
        .finally(() => setLoading(false));
      setNumberPage(numberPage + 1);
    }
  }, [status, loading, lesson.category_id]);

  const scrollHandler = (): void => {
    if ((document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight) < 300) {
      setLoading(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="sideBarLesson">
      {lesson.category_id && <Fragment>
        <div className="sideBarLesson__button">
          {categoryButton.name && <SortButton
            object={sortValue}
            setStatus={setStatus}
            status={status}
            setNumberPage={setNumberPage}
            setLoading={setLoading}
          />}
        </div>
        <div className="sideBarLesson__lessons">
          {lessons.length > 0 && lessons.map((les, key) =>
            // les.id !== lesson.id && les.id &&
            <LessonCard
              key={key}
              id={les.id}
              thumbnailUrl={les.image_link}
              status={les.status}
              authorAvatarUrl={les.author_avatar_url}
              authorName={les.author_name}
              title={les.title}
              published={les.created_at}
              viewsCount={les.views_count}
              rating={les.rating}
              totalVotes={les.votes_count}
              type="sideBar"
              />
          )}
        </div>
      </Fragment>}
    </div>
  );
};

export default SideBarLessons;