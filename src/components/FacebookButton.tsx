import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_APP } from "../constants";

const FacebookButton = () => {
  const responseFacebook = (response: any) => {
    console.log(response);
  }

  return (
    <div>
      <FacebookLogin
        appId={FACEBOOK_APP.id}
        fields="name,email,picture, user_birthday"
        scope="public_profile,user_friends, email, user_birthday"
        callback={responseFacebook}
        textButton="Continue with Facebook"
        cssClass=""
      />
    </div>
  );
};

export default FacebookButton;