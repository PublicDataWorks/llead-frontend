import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import jwt_decode from 'jwt-decode'

import { REFRESH_TOKEN_API_URL } from 'constants/api'
import store from 'store'
import { getAccessToken, getRefreshToken } from 'selectors/common'
import { updateToken } from 'actions/authentication'

const client = axios.create()

const REQUEST_WAITING_TIME = 5

client.interceptors.request.use(function (config) {
  const accessToken = getAccessToken(store.getState())

  if (!isEmpty(accessToken)) {
    let decoded

    try {
      decoded = jwt_decode(accessToken)
    } catch (error) {
      console.error(error)
    }

    const current_time = Date.now() / 1000

    const isTokenExpired =
      !decoded || current_time + REQUEST_WAITING_TIME > decoded.exp

    if (isTokenExpired) {
      return new Promise((resolve) => {
        const refreshToken = getRefreshToken(store.getState())

        if (!isEmpty(refreshToken)) {
          axios
            .post(REFRESH_TOKEN_API_URL, { refresh: refreshToken })
            .then((response) => {
              const newToken = response.data.access
              config.headers.Authorization = `Bearer ${newToken}`
              store.dispatch(updateToken(newToken))

              return resolve(config)
            })
            .catch(() => {
              return resolve(config)
            })
        }
      })
    }

    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default client
