import i18n from "@/i18n.js";
import BrowserCookies from "browser-cookies";
import {getRootDomain} from "@/util/getRootDomain.js";

export const COOKIE_LANG_NAME = "d2c_language";

export function initializeLanguage(router) {
  if (import.meta.env.SSR) { return; }

  const supportedLanguages = ["en", "ru"];
  const defaultLang = "ru";

  const routeLang = router.currentRoute.value.params.lang;
  const savedLang = BrowserCookies.get(COOKIE_LANG_NAME);

  const lang = supportedLanguages.includes(routeLang)
    ? routeLang
    : supportedLanguages.includes(savedLang)
    ? savedLang
    : defaultLang;

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
