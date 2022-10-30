const BACKEND_URL = 'https://lessoner.herokuapp.com'
const REDIRECT_URL = `https://thelessoner-frontend-pr-40.onrender.com/users/sign_up`;
const EMAIL = {
  minLength: 3,
  maxLength: 256,
};
const PASSWORD = {
  minLength: 6,
  maxLength: 256,
};
const USERNAME = {
  min: 3,
  max: 256,
};
const VK_APP = {
  id: 51463254,
};
const GOOGLE_APP = {
  id: '1055699025819-ebrdnj83l419b2hfj4j4l34joh83he25.apps.googleusercontent.com',
}
const FACEBOOK_APP = {
  id: '680825793391734'
}
export { BACKEND_URL, EMAIL, PASSWORD, USERNAME, REDIRECT_URL, VK_APP, GOOGLE_APP, FACEBOOK_APP };
