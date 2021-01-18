import * as actionTypes from 'action-types/login-page'
import { post } from 'utils/api'
import { SIGN_IN_API_URL } from 'constants/api'

export const performLogin = (credentials) =>
  post(
    [
      actionTypes.LOGIN_START,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    SIGN_IN_API_URL,
    credentials
  )()
