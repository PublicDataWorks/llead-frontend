import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

const accessToken = (state) => get(state, 'user.accessToken')

export const isLoggedIn = (state) => !isEmpty(accessToken(state))
