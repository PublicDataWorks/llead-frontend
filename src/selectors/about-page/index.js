import get from 'lodash/get'

export const getQAA = (state) => get(state.aboutPage, 'about', [])
