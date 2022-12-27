import "../pages/modal.scss";
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import Facebook from "../components/icons/facebook.svg";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const FacebookButton = () => {
  const responseFacebook = (response: ReactFacebookFailureResponse | ReactFacebookLoginInfo) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_ID}
      fields="name, email, picture, user_birthday"
      scope="public_profile, user_friends, email, user_birthday"
      callback={responseFacebook}
      render={renderProps => (
        <div className="app-logo" onClick={renderProps.onClick}>
          <img src={Facebook} alt="facebook" />
        </div>
      )}
    />
  );
};

export default FacebookButton;