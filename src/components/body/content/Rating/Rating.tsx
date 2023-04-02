import Raiting from "../../../icons/reiting.png";

type RatingProps = {
  rating: number;
  totalVotes: number;
};

const Rating: React.FC<RatingProps> = (props: RatingProps) => {
  return (
    <div className="raiting">
      <img src={Raiting} alt="rating" />
      <p>
        {props.rating} {`(${props.totalVotes})`}
      </p>
    </div>
  );
};

export default Rating;
