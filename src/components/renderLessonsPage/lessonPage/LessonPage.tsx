import "./lessonPage.module.scss";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect, useState} from "react";
import {MainLesson} from "./mainLesson/MainLesson";
import {SideBarLessons} from "./sideBarLessons/SideBarLessons";
import {getLesson} from "../../../store/lessonSlice/lessonSlice";
import {useParams} from "react-router-dom";

export const LessonPage = () => {
  const dataLesson = useAppSelector(state => state.lessons.lesson);
  const categories = useAppSelector(state => state.categories.categories);
  const dispatch = useAppDispatch();
  const lessonId = useParams().id;
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getLesson(lessonId));
  }, [dispatch, lessonId]);

  useEffect(() => {
    setCategory(categories.filter(value => value.id === dataLesson.category_id)[0]?.name);
  }, [categories, dataLesson.category_id]);

  return (
    <div className="lessonPage">
      <MainLesson category={category}/>
      {category && <SideBarLessons categoryName={category}/>}
    </div>
  );
};