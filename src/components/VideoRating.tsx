import "./VideoRating.scss";
import Rating from "./../assets/reiting.png";
import { StarRating } from "./svg/StarRating";
import { useState } from "react";

const VideoRating = () => {
  const [rating, setRating] = useState(0);
  const [hover] = useState(0);
  
  return (
    <div className="star-rating">
      <br/>
      {[...Array(5)].map((star, index) => {
        const ratingUnit: number = index + 1;
        return (
          <button
            type="button"
            key={ratingUnit}
            className={ratingUnit <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(ratingUnit)}
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
        <img src={Rating} alt="rating"/>
        {rating}</p>
    </div>
  );
};

export default VideoRating;
