import get from 'lodash/get'

export const getResponse = (state) => get(state.contactPage, 'sendMessageResponse', {})
