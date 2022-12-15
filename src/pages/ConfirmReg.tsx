import "./modal.scss";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";

type ConfirmProps = {
  registration: boolean | undefined;
  userEmail: string;
}
const ConfirmReg = ({registration, userEmail}: ConfirmProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const email = userEmail.slice(userEmail.lastIndexOf("@") + 1)
  return (
    <div className="log-content">
      <h2 className="inform">
        {registration ? intl.formatMessage({id: "app.ConfirmReg.info"}) :
          intl.formatMessage({id: "app.resetPasswordPage.text"}, {email: "email"})
        }
      </h2>
      <Button
        buttonType="button"
        buttonText={registration ? intl.formatMessage({id: "app.button.next"}) :
          intl.formatMessage({id: "app.button.ok"})}
        className="button__page"
        onClick={() => {
          registration ? window.location.href = `https://${email}` : navigate("/")
        }}
      />
    </div>
  );
};
export default ConfirmReg;