const BACKEND_URL = "https://lessoner.herokuapp.com";
const CODE = {maxLength: 5,};
const DEFAULT_COUNTRY_CODE = "375";
const EMAIL = {minLength: 3, maxLength: 256};
const PASSWORD = {minLength: 6, maxLength: 256};
const REDIRECT_URL = "https://lessoner.herokuapp.com/users/sign_up";
const USERNAME = {minLength: 3, maxLength: 50};

export {
  BACKEND_URL, CODE, DEFAULT_COUNTRY_CODE, EMAIL,
  PASSWORD, REDIRECT_URL, USERNAME
};