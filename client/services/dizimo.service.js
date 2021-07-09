import Service from './Service'

const BaseUrl = '/paroquianos'

export const Paroquianos = {
  get: (id, params) => {
    let _id = id? `/id` : ``
    return Service().get(`${BaseUrl}${_id}`, { params })
  }
}