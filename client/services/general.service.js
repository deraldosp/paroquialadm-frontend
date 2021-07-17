import Service from './Service'

const BaseUrl = '/'

export const Geo = {
  getStates() {
    return Service().get('/states')
  },

  getCities(state_id) {
    return Service().get(`/states/${state_id}/cities`)
  }
}