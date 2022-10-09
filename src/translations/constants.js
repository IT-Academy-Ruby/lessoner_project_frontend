import messages_ru from './ru.json'
import messages_en from './en.json'

export const LANGS = [
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
