import Vue from 'vue'
import VueI18n from 'vue-i18n'
import neStorage from '../neLocalStorage'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: neStorage.getLang() || 'en',
  fallbackLocale: 'en',
  messages: {
    'en': require('@/js/i18n/en'),
    'zh': require('@/js/i18n/zh')
  }
})

export default i18n
