import "./ratingStars.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import Rating from "../body/content/Rating/Rating";
import {STARS} from "../../constants";
import Star from "../icons/StarRating.svg";
import YellowStar from "../icons/reiting.png";
import {updateRating} from "../../store/lessonSlice/lessonSlice";

const RatingStars = () => {
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(state => state.lessons.lesson);
  const user = useAppSelector(state => state.userDecodedName.session.name);
  const stars = new Array(STARS).fill(Star);
  const [userRating, setUserRating] = useState(0);
  const [dataRating, setDataRating] = useState({
    rating: 0, userRating: 0, votesCount: 0
  });

  useEffect(() => {
    if (!lesson.user_rating) {
      setUserRating(0);
    }
    if (lesson.user_rating) {
      setUserRating(lesson.user_rating);
    }
  }, [lesson.user_rating]);

  return (
    <div>
      {user && <div className="stars__wrapper">
        {stars.map((_, index) =>
          <img
            key={index}
            className="star"
            src={userRating < (index + 1) ? Star : YellowStar}
            onMouseMove={() => {
              setUserRating(index + 1);
            }}
            onMouseLeave={() => {
              if (!lesson.user_rating && !dataRating.userRating) {
                setUserRating(0);
              }
              if (dataRating.userRating) {
                setUserRating(dataRating.userRating);
              }
              if (lesson.user_rating && !dataRating.userRating) {
                setUserRating(lesson.user_rating);
              }
            }}
            onClick={
              async () => {
                const response = await dispatch(updateRating(
                  {id: lesson.id, rating: (index + 1).toString()}
                ));
                setUserRating(response.payload.user_rating);
                setDataRating({
                  rating: response.payload.rating,
                  userRating: response.payload.user_rating,
                  votesCount: response.payload.votes_count
                });

              }}
          />)}
      </div>}
      <Rating
        rating={(dataRating.rating || lesson.rating)
          && +(dataRating.rating || lesson.rating).toFixed(2)}
        totalVotes={dataRating.votesCount || lesson.votes_count}
      />
    </div>
  );
};

export default RatingStars;
