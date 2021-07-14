import ParseJwt from './ParseJwt'
import { DateTime } from 'luxon'

export default (jwtToken) => {
  
  if (jwtToken) {
    let expires = ParseJwt(jwtToken).exp
    let now = DateTime.now().toFormat('X')
  
    if (now > expires) {
      return true
    } else {
      return false
    }

  }
  return true

}