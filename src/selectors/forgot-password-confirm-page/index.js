import get from 'lodash/get'

export const getForgotPasswordConfirmStatus = (state) =>
  get(state, 'forgotPasswordConfirmPage.status', '')
