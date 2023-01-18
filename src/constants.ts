console.log('process.env', process.env);
console.log('process.env.REACT_APP_BACKEND_URL', process.env.REACT_APP_BACKEND_URL);

const BACKEND_URL_LESSONS = process.env.REACT_APP_BACKEND_URL + "/lessons/";
const CODE = {maxLength: 5};
const DEFAULT_COUNTRY_CODE = "";
const EMAIL = {minLength: 3, maxLength: 256};
const PASSWORD = {
  minLength: 6, maxLength: 256, symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~"
};
const REDIRECT_URL = `${process.env.REACT_APP_BACKEND_URL}/users/sign_up`;
const USERNAME = {minLength: 3, maxLength: 50};
const maxNameLength = 64;
const maxDescriptionLength = 600;
const maxDescrHTCount = 10;
const NAME_CATEGORY = {
  minSymbols: 1, maxSymbols: 64, symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~"
};
const DESCRIPTION_CATEGORY = {
  minSymbols: 1, maxSymbols: 300, symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~"
};
const IMAGE_DATA = {format: [".jpg", ".jpeg", ".png", ".gif"], size: 5242880};
const THUMBNAIL_DATA = {format: [".jpg", ".jpeg", ".png", ".gif"], size: 2 * 1024 * 1024};
const SKELETON_AMOUT = 8;
const NAVBAR_ADMIN = "admin";
const NAVBAR_AUTORISED = "autorised";
const NAVBAR_NOT_AUTORISED = "not_autorised";
const VIDEO_DATA = {
  format: [".MP4", ".AVI", ".WMV", ".MOV", ".3GP", ".FLV", ".MPG",
    ".MPEG-1", ".MPEG-2", ".MPEG-4", ".WEBМ", ".MPEGPS", ".3GPP"],
  size: 35 * 1024 * 1024,
  minSymbols: 1,
  maxSymbols: 64,
  /* eslint-disable-next-line */
  symbols: `( )! $ % & ' " " * + - / = ? ^ _  { | } ~ ., @ [ ] < >`
};
const SKELETON_LESSONS_AMOUT = 12;
const AVATAR = {size: 5 * 1024 * 1024};

export { 
  BACKEND_URL_LESSONS, CODE, DEFAULT_COUNTRY_CODE, EMAIL,
  PASSWORD, REDIRECT_URL, USERNAME, maxNameLength, IMAGE_DATA, THUMBNAIL_DATA,
  maxDescriptionLength, maxDescrHTCount, NAME_CATEGORY, DESCRIPTION_CATEGORY, SKELETON_AMOUT,
  NAVBAR_ADMIN, NAVBAR_AUTORISED, NAVBAR_NOT_AUTORISED, VIDEO_DATA, SKELETON_LESSONS_AMOUT,
  AVATAR
};

