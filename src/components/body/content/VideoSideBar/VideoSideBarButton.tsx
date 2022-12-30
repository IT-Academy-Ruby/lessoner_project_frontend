import "./VideoSideBarButton.scss";

type VideoSideBarButtonProps = {
  name: string;
  id: number;
  newSelectedButton: number;
  cbSelected: (newSelectedButton: number) => void;
};
export const VideoSideBarButton = (props: VideoSideBarButtonProps) => {
  const { name, id, newSelectedButton, cbSelected } = props;
  return (
    <div
      className="sideBar__button"
      onClick={() => {
        cbSelected(id);
      }}
      style={{
        backgroundColor: newSelectedButton === id ? "#1B1B1F" : "#FFFFFF",
      }}
    >
      <p
        style={{
          color: newSelectedButton === id ? "#FFFFFF" : "#1B1B1F",
        }}
      >
        {name}
      </p>
    </div>
  );
};
