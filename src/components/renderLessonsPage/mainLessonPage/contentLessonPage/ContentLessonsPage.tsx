import "./contentLessonsPage.module.scss";
import {LESSONSPAGE} from "../../../../constants";
import {LessonCard} from "../../LessonCard";
import {NoLessonsPage} from "../../NoLessonsPage";
import {SkeletonLessons} from "../../../SkeletonLessons";
import {useAppSelector} from "../../../../store/hooks";

type ContentLessonsPageProps = {
  type: string;
}

export const ContentLessonsPage = ({type}: ContentLessonsPageProps) => {
  const lessons = useAppSelector(state => state.lessons.records);
  const skeleton = useAppSelector(state => state.lessons.skeleton);
  const categories = useAppSelector(state => state.categories.categories);
  const user = useAppSelector(state => state.userDecodedName.session.name);

  const categoryName = (id: number) => {
    const category = categories.filter(value => {
      if (value.id == id) {
        return value;
      }
    })[0];
    if (category) {
      return category.name;
    }
  };

  const shadowLesson = [...new Array(LESSONSPAGE)].map((_, index) => (
    <SkeletonLessons key={index} />
  ));

  return (
    <div className="lessons">
      {lessons.length > 0 && lessons.map((lesson,key) =>
        lesson.status === "active" && <LessonCard
          key={key}
          id={lesson.id}
          thumbnailUrl={lesson.image_link}
          status={lesson.status}
          authorAvatarUrl={lesson.author_avatar_url}
          authorName={lesson.author_name}
          title={lesson.title}
          published={lesson.created_at}
          viewsCount={lesson.views_count}
          rating={lesson.rating}
          totalVotes={lesson.votes_count}
          category={lesson.id > 0 ? categoryName(lesson.category_id) : ""}
          categoryId={lesson.category_id}
          type={type}
        />)}
      {skeleton && shadowLesson}
      {!skeleton && lessons.length === 0 && user && <NoLessonsPage isOnLessonsPage={true}/>}
      {!skeleton && lessons.length === 0 && !user && <NoLessonsPage isOnLessonsPage={false}/>}
    </div>
  );
};