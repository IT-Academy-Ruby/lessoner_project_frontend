import "../components/modal/modal.scss";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Email from "../components/Email";
import { emailInvalidationRules } from "../validationRules";

const ResetPasswordPage = () => {
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
      <h2 className='title'>Forgot your password?</h2>
      <h6>Enter the email that you used when register to recover your password. 
        You will receive a password reset link</h6>
      <div className="First-Registration-Form">
        <Email field={{
          name: email,
          onBlur: () => { checkEmail(false); },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value),
          value: email
        }}
        error={error} />
        <button type="submit" onMouseDown={() => checkEmail(true)}>Password reset</button>
      </div>
    </Fragment>;

  const confirmationLink =
    <Fragment>
      <h6>We&apos;ve sent a link to restore access to your account to the address {email}</h6>
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