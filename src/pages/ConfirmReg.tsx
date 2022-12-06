import "./modal.scss";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../components/Button";

const ConfirmReg=()=>{
  const intl = useIntl();
  return (
    <div className="log-content">
      <h2 className="inform">
        <FormattedMessage id="app.ConfirmReg.info"/>
      </h2>
      <Button
        buttonType="submit"
        buttonText={intl.formatMessage({id: "app.button.next"})}
        className="button__page"
      />
    </div>
  );
};
export default ConfirmReg;