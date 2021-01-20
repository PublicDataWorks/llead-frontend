import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export const getAccessToken = (state) => get(state, 'token.access')
export const getRefreshToken = (state) => get(state, 'token.refresh')

export const isLoggedInSelector = (state) => !isEmpty(getAccessToken(state))
