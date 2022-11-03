import LANGUAGES from './constants'

function getCurrentLanguageCode() {
    const pathName = window?.location?.pathname
     if (typeof pathName === "string"){
       let parsedValue = pathName.match(/^\/(\w{2,})\//g)?.[0].replaceAll("/","")
       return getLanguageByCode(parsedValue)?.code || getDefaultLanguage().code
     }
     return getDefaultLanguage().code
}

function getDefaultLanguage() {
    return LANGUAGES.find(lang => lang.isDefault) || LANGUAGES[0]
}

function getLanguageMessages(code: string) {
    return getLanguageByCode(code)?.messages
}

function getLanguageByCode(code: string | undefined) {
    return LANGUAGES.find(lang => lang.code === code?.toLowerCase())
}

const TranslationHelpers = {getLanguageMessages, getCurrentLanguageCode}

export default TranslationHelpers
