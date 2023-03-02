import "./successfulModal.scss";
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
    <div className="wrapper__modal">
      <div className="modal">
        <div className="modal__successful">
          <img src={Successful} alt="successful" className="modal__icon"/>
          {text}
          <div className="cross">
            <span className="cross__element" onClick={() => {
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