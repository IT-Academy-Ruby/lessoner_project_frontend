import "./modalResponse.module.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Alarm from "../icons/neutral.svg";
import {Button} from "../Button";
import Error from "../icons/negative.svg";
import Successful from "../icons/positive.svg";
import {uploadModalData} from "../../store/modalSlice/modalSlice";
import {useNavigate} from "react-router-dom";

export const ModalResponse = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataModal = useAppSelector(state => state.modalData.data);

  let icon = Successful;
  let titleModal = "Successful!";
  if (dataModal.typeModal) {
    icon = Error;
    titleModal = "Error!";
  }
  if (dataModal.typeModal === false) {
    icon = Alarm;
    titleModal = "Something went wrong!";
  }

  const modalClose = () => {
    if (dataModal.urlNavigate) {
      navigate(dataModal.urlNavigate);
    }
    dispatch(uploadModalData({isOpen: false}));
  };

  return (
    <div className="wrapper__modal">
      <div className="response-modal">
        <div className="cross" onClick={() => {
          dispatch(uploadModalData({isOpen: false}));
        }}>
          <span className="cross__element"/>
        </div>
        <img src={icon} className="response-modal__icon"/>
        <h1 className="response-modal__title">
          {titleModal}
        </h1>
        <p className="response-modal__text">
          {dataModal.text}
        </p>
        <Button
          buttonType="button"
          buttonText="Ok"
          className="button-modal-response"
          onClick={modalClose}
        />
      </div>
    </div>
  );
};