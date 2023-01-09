import "./modal.scss";
import Button from "../components/Button";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

type ConfirmProps = {
  registration: boolean | undefined;
  userEmail: string;
}
const ConfirmReg = ({registration, userEmail}: ConfirmProps) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const handleClick = () => {
     navigate("/");
  };

  return (
    <div className="log-content">
      <h2 className="inform">
        {registration ? intl.formatMessage({id: "app.ConfirmReg.info"}) :
          intl.formatMessage({id: "app.resetPasswordPage.text"}, {email: userEmail})
        }
      </h2>
      <Button
        buttonType="button"
        buttonText={registration ? intl.formatMessage({id: "app.button.next"}) :
          intl.formatMessage({id: "app.button.ok"})}
        className="button__page"
        onClick={handleClick}
      />
    </div>
  );
};
export default ConfirmReg;