import i18n from "@/i18n.js";
import BrowserCookies from "browser-cookies";
import {getRootDomain} from "@/util/getRootDomain.js";

const supportedLanguages = ["en", "ru"];
const defaultLang = "ru";

export const COOKIE_LANG_NAME = "d2c_language";

export function initializeLanguage() {
  const savedLang = BrowserCookies.get(COOKIE_LANG_NAME);

  const lang = supportedLanguages.includes(savedLang) ? savedLang : defaultLang;

  setLanguage(lang);
}

export function setLanguage(lang, persist = false) {
  i18n.global.locale.value = lang;
  if (persist)
    BrowserCookies.set(COOKIE_LANG_NAME, lang, {
      domain: getRootDomain(location.hostname),
      path: "/",
      expires: new Date().getDate() + 1000 * 60 * 60 * 9999,
    });
}
