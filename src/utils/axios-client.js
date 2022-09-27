import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import jwt_decode from 'jwt-decode'
import get from 'lodash/get'

import { REFRESH_TOKEN_API_URL } from 'constants/api'
import { CONTENT_TYPES, HTTP_STATUS_CODES } from 'constants/common'
import store from 'store'
import { getAccessToken, getRefreshToken } from 'selectors/common'
import { updateToken, removeToken } from 'actions/authentication'
import { snakeToCamel } from 'utils/tools'

const authClient = axios.create()

const anonymousClient = axios.create()

const REQUEST_WAITING_TIME = 5

let refreshTokenPromise

const getNewToken = () => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = new Promise((resolve) => {
      const refreshToken = getRefreshToken(store.getState())

      if (!isEmpty(refreshToken)) {
        axios
          .post(REFRESH_TOKEN_API_URL, { refresh: refreshToken })
          .then((response) => {
            const newToken = response.data.access
            store.dispatch(updateToken(newToken))
            refreshTokenPromise = null
            return resolve(newToken)
          })
          .catch((error) => {
            const status = get(error, 'response.status')
            if (status === HTTP_STATUS_CODES.UNAUTHORIZED) {
              store.dispatch(removeToken())
            }
            return resolve(null)
          })
      } else {
        return resolve(null)
      }
    })
  }
  return refreshTokenPromise
}

authClient.interceptors.request.use(function (config) {
  const accessToken = getAccessToken(store.getState())

  if (!isEmpty(accessToken)) {
    let decoded

    try {
      decoded = jwt_decode(accessToken)
    } catch (error) {
      /* istanbul ignore next */
      console.error(error)
    }

    const current_time = Date.now() / 1000

    const isTokenExpired =
      !decoded || current_time + REQUEST_WAITING_TIME > decoded.exp

    if (isTokenExpired) {
      return getNewToken().then((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`
        return config
      })
    }

    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

const camelCaseResponse = ({ data, ...response }) => {
  const contentType = get(response, 'headers.content-type')

  return {
    ...response,
    data: contentType === CONTENT_TYPES.JSON ? snakeToCamel(data) : data,
  }
}

authClient.interceptors.response.use(camelCaseResponse)

anonymousClient.interceptors.response.use(camelCaseResponse)

function inferClient() {
  const hasToken = !isEmpty(getRefreshToken(store.getState()))

  return hasToken ? authClient : anonymousClient
}

export { anonymousClient, authClient, inferClient }
