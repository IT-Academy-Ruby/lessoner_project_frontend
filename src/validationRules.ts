import {
  CODE, DESCRIPTION_CATEGORY, NAME_CATEGORY, PASSWORD
} from "./constants";

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

export const passwordRegex = new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" +
  PASSWORD.minLength + "," + PASSWORD.maxLength + "}$", "i");

export const CodeRegex = new RegExp("[0-9a-z]{" + CODE.maxLength + "}", "i");

export const UserRegex = new RegExp("[a-z0-9]", "i");

export const nameCategoryRegex = new RegExp("^[\"\\[\\]\\s-:)(/=!#$%&'*+?^_`{|}~.,<>@A-Z0-9А-Я]{" +
  NAME_CATEGORY.minSymbols + "," + NAME_CATEGORY.maxSymbols + "}$", "i");


export const descriptionCategoryRegex = new RegExp("^[\"\\[\\]\\s-:)(/=!#$%&'*+?^_`{|}~.,<>@A-Z0-9А-Я]{" +
  DESCRIPTION_CATEGORY.minSymbols + "," + DESCRIPTION_CATEGORY.maxSymbols + "}$", "i");

export const RegExpName = /^[а-яА-ЯёЁa-zA-Z0-9( )!$%&'""*+-/=?^_`{|}~.,@<>:[\]]+$/i;

export const RegExpDescription = /^[а-яА-ЯёЁa-zA-Z0-9( )!$%&'""*+-/=?^_`{|}~.,@<>:[\]#]+$/i;