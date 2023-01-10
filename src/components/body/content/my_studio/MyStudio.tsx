import "./myStudio.scss";
import MyStudioContent from "./MyStudioContent";
import MyStudioHead from "./MyStudioHead";

const MyStudio = () => {
  return (
    <div className="mystudio__wrapper">
      <div className="mystudio__inner">
        <MyStudioHead />
        <MyStudioContent />
      </div>
    </div>
  );
};

export default MyStudio;
