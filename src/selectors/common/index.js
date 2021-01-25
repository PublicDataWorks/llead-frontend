import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import mapValues from 'lodash/mapValues'

import { CMS_KEYS } from 'constants/common'

const getAppConfig = (state) => get(state, 'appConfig')
const getCMS = (state) => get(state, 'appConfig.CMS', {})
export const getAccessToken = (state) => get(state, 'token.access')
export const getRefreshToken = (state) => get(state, 'token.refresh')

export const isLoggedInSelector = (state) => !isEmpty(getAccessToken(state))
export const isAppConfigFetchedSelector = (state) =>
  !isEmpty(getAppConfig(state))

export const cmsSelector = (state, page) => {
  const cms = getCMS(state)
  const cmsKeys = get(CMS_KEYS, page, {})

  return mapValues(cmsKeys, (cms_key) => get(cms, cms_key, ''))
}
