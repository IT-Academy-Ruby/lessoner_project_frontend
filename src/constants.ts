const CODE = {maxLength: 5};
const DEFAULT_COUNTRY_CODE = "";
const EMAIL = {minLength: 3, maxLength: 256};
const PASSWORD = {
  minLength: 6, maxLength: 256, symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~"
};
const USERNAME = {minLength: 3, maxLength: 50};
const NAME_CATEGORY = {
  minSymbols: 1, maxSymbols: 64, symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~"
};
const DESCRIPTION_CATEGORY = {
  minSymbols: 1, maxSymbols: 600, symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~"
};
const IMAGE_DATA = {format: [".jpg", ".jpeg", ".png", ".gif"], size: 5120};

export {
  CODE, DEFAULT_COUNTRY_CODE, EMAIL, PASSWORD, USERNAME, NAME_CATEGORY,
  DESCRIPTION_CATEGORY, IMAGE_DATA
};

