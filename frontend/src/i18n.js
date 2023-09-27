import i18next from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'


i18next
.use(initReactI18next)
.use(LanguageDetector)
.use(HttpApi)
.init(
    {
        fallbackLng: "fr",
        lng:document.querySelector('html').lang,
        
        detection: {
            order: [ 'cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],

        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        }
    }
)

export default i18next