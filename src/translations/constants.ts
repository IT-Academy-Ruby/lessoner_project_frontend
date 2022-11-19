import {messages_en} from "./en.js";
import {messages_ru} from "./ru.js";

const LANGUAGES = [
  {
    code: "en",
    messages: messages_en,
    label: "English",
    isDefault: true,
  },
  {
    code: "ru",
    messages: messages_ru,
    label: "Русский",
  },
];

export default LANGUAGES;
