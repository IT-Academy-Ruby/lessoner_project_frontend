import LANGS from './constants'

function getCurrentLanguageValue(){
    const pathName = window?.location?.pathname
     if (typeof pathName === "string"){
       let parsedValue = pathName.match(/^\/(\w{2,})\//g)?.[0].replaceAll("/","")
       return getLangByValue(parsedValue)?.value || getDefaultLang().value
     }
     return getDefaultLang().value
}

function getDefaultLang() {
    return LANGS.find(lang => lang.isDefault) || LANGS[0]
}

function getLangMessages(value: string) {
    return getLangByValue(value)?.messages
}

function getLangByValue(value: string | undefined) {
    return LANGS.find(lang => lang.value === value)
}

const TranslationHelpers = {getLangMessages, getCurrentLanguageValue}

export default TranslationHelpers

