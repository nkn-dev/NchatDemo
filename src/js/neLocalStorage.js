const LANG = 'NKN_LANG'

let setLang = function (lang) {
  window.localStorage.setItem(LANG, lang)
}

let getLang = function (lang) {
  return window.localStorage.getItem(LANG)
}

export default {
  setLang,
  getLang
}