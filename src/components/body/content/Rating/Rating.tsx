import "./rating.scss";
import Raiting from "../../../icons/reiting.png";

type RatingProps = {
  rating: number;
  totalVotes: number;
};

export const Rating: React.FC<RatingProps> = (props: RatingProps) => {
  return (
    <div className="rating">
      <img src={Raiting} alt="rating" />
      <p>
        {props.rating} {`(${props.totalVotes})`}
      </p>
    </div>
  );
};