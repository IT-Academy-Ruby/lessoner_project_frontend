import {messages_ru} from './ru.js'
import {messages_en} from './en.js'

 const LANGS = [
    {
        value: 'en',
        messages: messages_en,
        label: 'English',
        isDefault: true,
    },
    {
        value: 'ru',
        messages: messages_ru,
        label: 'Русский',
    },
]
export default LANGS