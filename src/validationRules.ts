import { PASSWORD } from "./constants";

export const emailInvalidationRules = [
  /^\s*$/, // check string not empty
  /^[^@]+$/, // @ should exist
  /@[^@]*@/, // onle one @ is admissible
  /^\./, // '.' can't be first symbol
  /\.{2,}.+(?=@)/, // '.' can't repeat more than once in a row
  /\.(?=@)/, // '.' can't be before @
  /[^A-Za-z0-9_!#$%&'.*+\-/=?^`{|}~].*(?=@)/, // include only valid symbols before @
  /(?<=@).*[^a-z0-9\-.]/, // include only valid symbols before @
];

export const passwordRegex = new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" + PASSWORD.minLength + "," + PASSWORD.maxLength + "}$", "i");