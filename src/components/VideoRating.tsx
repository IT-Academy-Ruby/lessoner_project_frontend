import "./VideoRating.scss";
import Rating from "./../assets/reiting.png";
import { StarRating } from "./svg/StarRating";
import { useState } from "react";

interface VideoRatingProps {
  ratingProp?: number;
  votesCount?: number;
  onGetNewRating: (rating: number) => void;
  isAuthorized: boolean;
  isRatingFreezen: boolean;
}
const VideoRating = ({
  ratingProp,
  votesCount,
  onGetNewRating,
  isAuthorized,
  isRatingFreezen,
}: VideoRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover]=useState(0);
  
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingUnit: number = index + 1;

        return (
          <button
            style={isAuthorized && !isRatingFreezen? { cursor: "pointer" } : { cursor: "auto" }}
            type="button"
            key={ratingUnit}
            className={ratingUnit <= (hover || rating) ? "on" : "off"}
            onClick={isAuthorized && !isRatingFreezen? () => {
              setRating(ratingUnit);
              onGetNewRating(ratingUnit);
            }:undefined}
            // onMouseEnter={() => setHover(ratingUnit)}
            // onMouseLeave={() => setHover(ratingUnit)}
          >
            <span className="star">
              <StarRating />
            </span>
          </button>
        );
      })}
      <p>
        <img src={Rating} alt="rating" />
        {`${ratingProp} (${votesCount})`}
      </p>
    </div>
  );
};

export default VideoRating;
