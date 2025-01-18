import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n';

const app = createApp(App)

const supportedLanguages = ['en', 'ru'];
const defaultLang = 'en';

function initializeLanguage() {
  const browserLang = navigator.language.split('-')[0];
  const savedLang = localStorage.getItem('language');
  const lang = supportedLanguages.includes(savedLang)
    ? savedLang
    : supportedLanguages.includes(browserLang)
    ? browserLang
    : defaultLang;

  setLanguage(lang);
}

function setLanguage(lang) {
  i18n.global.locale.value = lang;
  localStorage.setItem('language', lang);
}

initializeLanguage();

app.use(router)
app.use(i18n);
app.mount('#app')
