import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import _ from 'lodash'
import trTranslations from './tr'
import enTranslations from './en'

const resources = {
  en: {
    translation: enTranslations
  },
  tr: {
    translation: trTranslations
  }
}

export const initTranslation = (store) => {
  const state = store.getState()

  const language = _.get(state, 'language.lang', 'en')

  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false
    }
  })
}

export default i18n
