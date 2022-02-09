import defaultState from './state'
import mutations from './mutations'
import actions from './actions'

const store = {
  namespaced: true,
  state: defaultState(),
  mutations,
  actions
}

export default store