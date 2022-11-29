import {Fragment, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import Email from "../components/Email";
import {emailInvalidationRules} from "../validationRules";

const ResetPasswordPage = () => {
  const intl = useIntl();
  const [isForm, setIsForm] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const closeLinkPopup = () => navigate("/users/sign_in/");

  const checkEmail = (isSubmitting = false) => {
    if (emailInvalidationRules.some(rule => rule.test(email))) {
      setError("User is not found. Please enter a valid email address");
      isSubmitting && setIsForm(true);
    } else {
      setError("");
      isSubmitting && setIsForm(false);
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
          checkEmail(false);
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value),
        value: email
      }}
             error={error}/>
      <Button
        buttonType="submit"
        onClick={() => checkEmail(true)}
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