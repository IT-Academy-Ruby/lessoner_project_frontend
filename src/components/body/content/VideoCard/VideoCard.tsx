import "./VideoCard.scss";

interface VideoCardProps {
  img?: string;
}

export const VideoCard = ({ img }: VideoCardProps) => {
  console.log(img);
  return (
    <>
      <div className="preview__img">
        <img src={img} />
      </div>
      <div className="info"></div>
    </>
  );
};
