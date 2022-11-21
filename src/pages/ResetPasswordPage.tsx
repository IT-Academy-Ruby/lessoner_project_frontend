import "../components/modal/modal.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Email from "../components/Email";
import { emailInvalidationRules } from "../validationRules";
import { sendPasswordResetLink } from "../services/api/sendPasswordResetLink";

const ResetPasswordPage = () => {
  const [isForm, setIsForm] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const intl = useIntl();

  const closeLinkPopup = () => navigate("/users/sign_in/");

  const checkEmail = () => {
    if (emailInvalidationRules.some(rule => rule.test(email))) {
      setError(intl.formatMessage({ id: "app.resetPasswordPage.userNotFound" }));
    } else {
      setError("");
    }
  };

  const sendLink = async () => {
    const isLinkSended = await sendPasswordResetLink(email);
    if (isLinkSended !== "User not found") {
      setError("");
      setIsForm(false);
    } else {
      setError(intl.formatMessage({ id: "app.resetPasswordPage.userNotFound" }));
      setIsForm(true);
    }
  };

  const form =
    <Fragment>
      <h2 className='title'>
        {intl.formatMessage({ id: "app.resetPasswordPage.forgotPassword" })}
      </h2>
      <h6>{intl.formatMessage({ id: "app.resetPasswordPage.enterEmailToRecoverPassword" })}</h6>
      <div className="First-Registration-Form">
        <Email field={{
          name: email,
          onBlur: () => { checkEmail(); },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value),
          value: email
        }}
        error={error} />
        <button type="submit" onMouseDown={() => sendLink()}>
          <FormattedMessage id="app.resetPasswordPage.button" />
        </button>
      </div>
    </Fragment>;

  const confirmationLink =
    <Fragment>
      <h6>{intl.formatMessage({ id: "app.resetPasswordPage.weSentLink" })} {email}</h6>
      <div className="First-Registration-Form">
        <button type="submit" onClick={closeLinkPopup}>OK</button>
      </div>
    </Fragment>;

  return (
    <div className='field'>
      <div className='modal'>
        <Link to='/users/sign_in/'>
          <span className='close'>
          </span>
        </Link>
        {(isForm || error) ? form : confirmationLink}
      </div>
    </div>
  );
};
export default ResetPasswordPage;