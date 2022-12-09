import "./EditVideoLessonThumbnail.scss";
import Th from "../icons/Th.png";

export const EditVideoLessonThumbnail = () => {
  return (
    <div className="evlth__wrapper">
      <div className="evlth__inner">
        <div className="evlth__item">
        </div>
        <div className="evlth__item">
          <img className="evlth__item-img" src={Th} alt="pic"/>
        </div>
        <div className="evlth__item">
        </div>
        <div className="evlth__item">
        </div>
      </div>
    </div>
  )
}
