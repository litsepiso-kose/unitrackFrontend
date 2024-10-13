import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export interface Language {
  label: string, script: string, nllb_code: string
}
export const English = { label: "English", script: "en-US", nllb_code: "eng_Latn" }
export const languages: Language[] = [
  English, // Assuming you want to define "English" similarly to others
  { label: "Français", script: "fr-FR", nllb_code: "fra_Latn" },
  { label: "Afrikaans", script: "af-ZA", nllb_code: "afr_Latn" },
].sort((a, b) => a.label.localeCompare(b.label));

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en-US',
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;