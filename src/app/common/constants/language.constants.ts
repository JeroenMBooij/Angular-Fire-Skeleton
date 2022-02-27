import { LanguageDropdown } from "src/app/models/dropdown/language-dropdown.model";

var rootImageUrl = './assets/images/flags';

export const defaulLanguage = 'en';

export const supportedLanguages = [
    new LanguageDropdown("English", 'en', `${rootImageUrl}/gb.svg`),
    new LanguageDropdown("Nederlands", "nl", `${rootImageUrl}/nl.svg`),
    new LanguageDropdown("简体中文", "zh", `${rootImageUrl}/cn.svg`)
]