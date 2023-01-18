import "./ratingCounter.scss";
import React from "react";
import Star from "./star";


const MAX_VALUE = 5;

type RatingCounterProps = {
  userRating?: number;
  globalRating?: number;
  totalVotes?: number;
  onRatingSet?: (value: number) => void;
  maxValue?: number;
  isDisabled?: boolean;
}

const RatingCounter: React.FC<RatingCounterProps> = (props) => {
  const {
    maxValue = MAX_VALUE,
    onRatingSet,
    userRating = 0,
    globalRating = 0,
    totalVotes = 0,
    isDisabled,
  } = props;


  const ratingControlSet = Array(maxValue).fill(undefined).map((_, index) => {
    const id = index + 1;
    const isEmpty = id > userRating;
    const onClick = userRating !== id ? () => onRatingSet && onRatingSet(index + 1) : undefined;
    
    return {
      id,
      onClick,
      isEmpty,
    };
  });

  return (
    <div className="rating-counter">
      {onRatingSet &&       
        <div className="rating-counter__control">
          {ratingControlSet.map((ratingItem) => {
            const {
              id, onClick, isEmpty
            } = ratingItem; 

            return (
              <Star 
                key={id} 
                onClick={onClick} 
                isEmpty={isEmpty} 
                isDisabled={isDisabled || !onClick} 
              />
            );
          })}
        </div>
      }
      <div className="rating-counter__counter">
        <div className="rating-counter__star">
          <Star />
        </div>
        <div className="rating-counter__label">
          {`${globalRating.toFixed(1)} (${totalVotes})`}
        </div>
      </div>
    </div>
  );
};

export default RatingCounter;
