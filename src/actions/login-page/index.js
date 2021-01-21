import * as actionTypes from 'action-types/login-page'
import { post } from 'utils/api'
import { TOKEN_API_URL } from 'constants/api'

export const performLogin = (credentials) =>
  post(
    [
      actionTypes.LOGIN_START,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    TOKEN_API_URL
  )(credentials)
