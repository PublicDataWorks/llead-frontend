import * as actionTypes from 'action-types/forgot-password-page'
import { post } from 'utils/api'
import { FORGOT_PASSWORD_API_URL } from 'constants/api'

export const performForgotPassword = (data) =>
  post(
    [
      actionTypes.FORGOT_PASSWORD_START,
      actionTypes.FORGOT_PASSWORD_SUCCESS,
      actionTypes.FORGOT_PASSWORD_FAILURE,
    ],
    FORGOT_PASSWORD_API_URL
  )(data)
