import get from 'lodash/get'

export const getDocument = (state) => get(state.documentPage, 'document', {})
