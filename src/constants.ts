const BACKEND_URL = "https://lessoner.herokuapp.com";
const EMAIL = {minLength: 3, maxLength: 256};
const PASSWORD = {minLength: 6, maxLength: 256,};
const USERNAME = {min: 3, max: 50,};
const CODE = {maxLength: 5,};
const DEFAULT_COUNTRY_CODE = "375";
const FACEBOOK_APP = { id: "680825793391734" };
const GOOGLE_APP =
  { id: "1055699025819-ebrdnj83l419b2hfj4j4l34joh83he25.apps.googleusercontent.com" };
  const REDIRECT_URL = "https://lessoner.herokuapp.com/users/sign_up";
  const VK_APP = { id: 51463254 };
 
 export {
  BACKEND_URL, EMAIL, PASSWORD, USERNAME, CODE, DEFAULT_COUNTRY_CODE,
   FACEBOOK_APP, GOOGLE_APP, REDIRECT_URL, VK_APP
};
