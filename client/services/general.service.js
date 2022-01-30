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

/**
 *  Db Integrations
 */
export const DbIntegration = {
  get(id, params) {
    let _id = ''
    
    if (id) 
      _id = `/${id}` 
    
    return Service().get(`/admin/dbIntegrations${_id}`, { params })
  },

  store(data) {
    return Service().post('/admin/dbIntegrations', data)
  },

  update(id, data) {
    return Service().put(`/admin/dbIntegrations/${id}`, data)
  },

  delete(id) {
    return Service().delete(`/admin/dbIntegrations/${id}`)
  },

  testConnection(data) {
    return Service().post('/admin/dbIntegrations/testConnection', data)
  }
}