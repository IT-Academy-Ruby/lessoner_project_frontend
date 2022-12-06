import "./modal.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Fragment, useState} from "react";
import Button from "../components/Button";
import Email from "../components/Email";
import {emailInvalidationRules} from "../validationRules";
import {useNavigate} from "react-router-dom";
import {sendPasswordResetLink} from "../services/api/sendPasswordResetLink";

const ResetPasswordPage = () => {
  const intl = useIntl();
  const [isForm, setIsForm] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      <h2 className="title">
        <FormattedMessage id="app.loginPage.password"/>
      </h2>
      <p className="text">
        <FormattedMessage id="app.resetPasswordPage.inform"/>
      </p>
      <Email field={{
        name: email,
        onBlur: () => {
          checkEmail();
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value),
        value: email
      }}
      error={error}/>
      <Button
        buttonType="submit"
        onClick={() => checkEmail()}
        buttonText={intl.formatMessage({id: "app.resetPasswordPage.resetPassword"})}
        className="button__page"
      />
    </Fragment>;

  const confirmationLink =
    <Fragment>
      <h2 className="inform">
        <FormattedMessage id="app.resetPasswordPage.text"/>
      </h2>
      <Button
        buttonType="submit"
        onClick={closeLinkPopup}
        buttonText={intl.formatMessage({id: "app.button.ok"})}
        className="button__page"
      />
    </Fragment>;

  return (
    <div className="log-content">
      <div className="wrapper-component">
        {(isForm || error) ? form : confirmationLink}
      </div>
    </div>
  );
};

export default ResetPasswordPage;