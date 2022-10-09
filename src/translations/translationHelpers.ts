import { LANGS } from './constants.js';

function getCurrentLanguageValue() {
    const value = navigator.language.split(/[-_]/)[0]
    
    return getLangByValue(value) ? value : getDefaultLang().value
}

function getDefaultLang() {
    return LANGS.find(lang => lang.isDefault) || LANGS[0]
}

function getLangMessages(value: string) {
    return getLangByValue(value)?.messages
}

function getLangByValue(value: string) {
    return LANGS.find(lang => lang.value === value)
}

const TranslationHelpers = {getLangMessages, getCurrentLanguageValue}

export default TranslationHelpers
