const BACKEND_URL = "https://lessoner-project-2w3h.onrender.com";
const CODE = { maxLength: 5 };
const DEFAULT_COUNTRY_CODE = "";
const EMAIL = { minLength: 3, maxLength: 256 };
const FACEBOOK_APP = { id: "680825793391734" };
const GOOGLE_APP =
  { id: "1055699025819-ebrdnj83l419b2hfj4j4l34joh83he25.apps.googleusercontent.com" };
const PASSWORD = { minLength: 6, maxLength: 256, symbols:"! # $ % & ' * + - / = ? ^ _  { | } ~" };
const REDIRECT_URL = "https://lessoner.herokuapp.com/users/sign_up";
const USERNAME = { minLength: 3, maxLength: 50 };
const VK_APP = { id: 51463254 };
export {
  BACKEND_URL, CODE, DEFAULT_COUNTRY_CODE, EMAIL, FACEBOOK_APP, GOOGLE_APP,
  PASSWORD, REDIRECT_URL, USERNAME, VK_APP
};
