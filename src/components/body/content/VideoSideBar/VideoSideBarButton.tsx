import "./VideoSideBarButton.scss";
import classNames from "classnames";

type VideoSideBarButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const VideoSideBarButton = (props: VideoSideBarButtonProps) => {
  const {
    label, onClick, isActive 
  } = props;
  const className = classNames("sideBar__button", {sideBar__button_active: isActive,});

  return (
    <div className={className} onClick={onClick}>
      <p>{label}</p>
    </div>
  );
};
