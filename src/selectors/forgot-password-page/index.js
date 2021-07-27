import get from 'lodash/get'

export const getForgotPasswordStatus = (state) =>
  get(state, 'forgotPasswordPage.forgotPasswordStatus', '')
