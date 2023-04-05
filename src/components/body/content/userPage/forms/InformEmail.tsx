import "../userPage.scss";
import {Button} from "../../../../Button";
import {useIntl} from "react-intl";

type InformEmailProps = {
  handleClose: () => void;
  email: string;
}

export const InformEmail = ({handleClose, email}: InformEmailProps) => {
  const intl = useIntl();

  return (
    <div className="form-user-page">
      <div className="close-modal-form" onClick={() => handleClose()}>
        <span className="close-form"></span>
      </div>
      <h2 className="form-title-user-page">
        {intl.formatMessage({id: "app.InformEmail"}, {email: email})}
      </h2>
      <Button
        buttonType="button"
        buttonText={intl.formatMessage({id: "app.button.ok"})}
        className="button__page"
        onClick={handleClose}
      />
    </div>
  );
};