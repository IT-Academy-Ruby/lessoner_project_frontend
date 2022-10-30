const BACKEND_URL = 'https://lessoner.herokuapp.com'
const CB_SOCIAL_MEDIA = `http://localhost:3000/any`;
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
  id: 51452614,
};
const GOOGLE_APP = {
  id: '527493320440-ogbb1ipqeaumqldec6or829aq4p630e9.apps.googleusercontent.com',
  client_secret: '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'
}
const FACEBOOK_APP = {
  id: '1326888044715885'
}
export { BACKEND_URL, EMAIL, PASSWORD, USERNAME, CB_SOCIAL_MEDIA, VK_APP, GOOGLE_APP, FACEBOOK_APP };
