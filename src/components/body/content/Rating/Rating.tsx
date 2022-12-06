import Raiting from "../../../../assets/reiting.png";

type RatingProps = {
    rating: string;
    totalVotes: string;
}

const Rating: React.FC<RatingProps> = (props: RatingProps) => {
  return (
    <div className="raiting">
      <img src={Raiting} alt="rating" />
      <p>{props.rating} {props.totalVotes}</p>
    </div>
  );
};

export default Rating;
