import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import mapValues from 'lodash/mapValues'

import { CMS_KEYS } from 'constants/common'

export const departmentFormatter = (department) => {
  const attributes = ['id', 'name', 'city', 'parish', 'locationMapUrl']

  return pick(department, attributes)
}

export const officerFormatter = (officer) => {
  const officerAttributes = ['id', 'name', 'badges']

  const rawDepartment = get(officer, 'department')
  const department = pick(rawDepartment, ['id', 'name'])

  return {
    ...pick(officer, officerAttributes),
    department,
  }
}

const getAppConfig = (state) => get(state, 'appConfig')
const getCMS = (state) => get(state, 'appConfig.cms', {})
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
