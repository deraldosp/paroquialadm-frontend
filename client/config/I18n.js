//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import EN from '../../static/assets/i18n/en'
import ES from '../../static/assets/i18n/es'
import PT_BR from '../../static/assets/i18n/pt_br'
import validationsEN from 'vee-validate/dist/locale/en'
import validationsES from 'vee-validate/dist/locale/es'
import validationsPT_BR from 'vee-validate/dist/locale/pt_BR'

function getBrowserLanguage(){
  let browser = Intl.DateTimeFormat().resolvedOptions()

  return browser.locale
      .replace("-US","")          
      .replace("-","_")
      .toLowerCase()
}

/* 

  Get browser language to default language before login 

*/
var locale
var browserLanguage = getBrowserLanguage()

if (browserLanguage.substr(0,2) == 'pt') {
  locale = 'pt_br'
} else if (browserLanguage.substr(0,2) == 'es') {
  locale = 'es'
} else {
  locale = 'en'
}


Vue.use(VueI18n)

const i18n = new VueI18n({  
  locale: locale,
  fallbackLocale: 'pt_br',
  messages: {
    'en': { 
      ...EN,
      validation: validationsEN.messages
    },
    'es': {
      ...ES,
      validation: validationsES.messages
    },
    'pt_br': {
      ...PT_BR,
      validation: validationsPT_BR.messages
    }
  },
  silentTranslationWarn: true
})

export default i18n;


