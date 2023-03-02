import "./modalCategory.scss";
import Successful from "../../../../icons/successful.svg";
import {useNavigate} from "react-router-dom";

type SuccessfulModalProps = {
  text: string;
  setIsSuccessful: (boolean: boolean) => void;
  url: string;
}

const SuccessfulModal = ({
  text, setIsSuccessful, url
}: SuccessfulModalProps) => {
  const navigate = useNavigate();
  return (
    <div className="wrapper-modal">
      <div className="field-modal">
        <div className="field-successful">
          <img src={Successful} alt="successful" className="successful-icon"/>
          {text}
          <div className="field-close-successful">
            <span className="close-modal" onClick={() => {
              setIsSuccessful(false);
              navigate(url);
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulModal;