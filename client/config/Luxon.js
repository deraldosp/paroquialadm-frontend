import { DateTime } from "luxon"

const Luxon = {
  install(Vue, options) {

    Vue.prototype.$DateTime = DateTime

  }
}

export default Luxon