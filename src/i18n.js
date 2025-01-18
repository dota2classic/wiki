import { createI18n } from 'vue-i18n';
import en from './data/locales/en.json';
import ru from './data/locales/ru.json';

const messages = { en, ru };

const i18n = createI18n({
  legacy: false,
  locale: 'en', 
  fallbackLocale: 'ru', 
  messages, 
});

export async function loadLocaleMessages(locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messagesModule = await messages[locale]();
    i18n.global.setLocaleMessage(locale, messagesModule.default);
  }
  i18n.global.locale.value = locale;
}

export default i18n;
