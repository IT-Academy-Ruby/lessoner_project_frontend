import FacebookLogin,
{ ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";

const FacebookButton = () => {
  const responseFacebook = (response: ReactFacebookFailureResponse | ReactFacebookLoginInfo) => {
    console.log(response);
  };

  return (
    <div>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_ID}
        fields="name, email, picture, user_birthday"
        scope="public_profile, user_friends, email, user_birthday"
        callback={responseFacebook}
        textButton="Continue with Facebook"
        cssClass=""
      />
    </div>
  );
};

export default FacebookButton;