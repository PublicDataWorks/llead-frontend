import get from 'lodash/get'

export const getIsLoginFailed = (state) => get(state, 'loginPage.isLoginFailed', false)
