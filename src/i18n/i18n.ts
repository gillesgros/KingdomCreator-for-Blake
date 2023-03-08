import { isRef, nextTick } from 'vue';
import { createI18n } from 'vue-i18n'
import type { Composer, VueI18n, I18nMode, I18n, Locale } from 'vue-i18n'

import en from "./en";
import { Language } from "./language";

export const i18n = createI18n({
  legacy: false,
  locale: Language.ENGLISH,
  fallbackLocale: Language.ENGLISH,
  globalInjection: true,
  fallbackWarn: false,
  missingWarn: false,
  messages: { en }
});

setI18nLanguage(i18n as I18n, Language.ENGLISH);

function isComposer(
  instance: VueI18n | Composer,
  mode: I18nMode
): instance is Composer {
  return mode === 'composition' && isRef(instance.locale)
}

export function getLocale(i18n: I18n): string {
  if (isComposer(i18n.global, i18n.mode)) {
    return i18n.global.locale.value
  } else {
    return i18n.global.locale
  }
}

export function setLocale(i18n: I18n, locale: Locale): void {
  if (!i18n.global.availableLocales.includes(locale)) {
    loadLocaleMessages(i18n, locale)
  }
  if (isComposer(i18n.global, i18n.mode)) {
    i18n.global.locale.value = locale
  } else {
    i18n.global.locale = locale
  }
}

export function getAvailabletLocale(i18n: I18n): string[] {
  if (isComposer(i18n.global, i18n.mode)) {
    return i18n.global.availableLocales
  } else {
    return i18n.global.availableLocales
  }
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')!.setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n: I18n, language: Locale): Promise<any> {
  // load locale messages
  if (i18n.global.availableLocales.includes(language)) {
    console.log("locale already loaded")
    return Promise.resolve();
  }
  console.log("need to load locale", language);
  const { messages } = await import( 
  	/* webpackChunkName: "language-[request]" */ `./${language}.ts`); 
console.log(messages);
  // fetch() error occurred.
  if (messages === undefined) return nextTick();
  
  // set locale and locale message
  i18n.global.setLocaleMessage(language, messages);
  console.log(i18n);
  return nextTick();
}


