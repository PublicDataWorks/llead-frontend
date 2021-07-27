import * as actionTypes from 'action-types/forgot-password-confirm-page'
import { post } from 'utils/api'
import { FORGOT_PASSWORD_CONFIRM_API_URL } from 'constants/api'

export const performForgotPasswordConfirm = (data) =>
  post(
    [
      actionTypes.FORGOT_PASSWORD_CONFIRM_START,
      actionTypes.FORGOT_PASSWORD_CONFIRM_SUCCESS,
      actionTypes.FORGOT_PASSWORD_CONFIRM_FAILURE,
    ],
    FORGOT_PASSWORD_CONFIRM_API_URL
  )(data)
