import { createSelector } from 'reselect'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import mapValues from 'lodash/mapValues'
import map from 'lodash/map'

import { CMS_KEYS } from 'constants/common'
import { formatDate } from 'utils/formatter'

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

export const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'documentType',
    'url',
    'previewImageUrl',
    'pagesCount',
    'departments',
  ]
  const rawDepartments = get(document, 'departments')
  const departments = map(rawDepartments, (department) =>
    pick(department, ['id', 'name'])
  )

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDate(document.incidentDate),
    departments,
  }
}

export const newsArticleFormatter = (news_article) => {
  const news_articleAttributes = ['id', 'title', 'url', 'sourceName']

  return pick(news_article, news_articleAttributes)
}

const getAppConfig = (state) => get(state, 'appConfig')
const getCMS = (state) => get(state, 'appConfig.cms', {})
export const getAccessToken = (state) => get(state, 'token.access')
export const getRefreshToken = (state) => get(state, 'token.refresh')

export const isLoggedInSelector = (state) => !isEmpty(getAccessToken(state))
export const isAppConfigFetchedSelector = (state) =>
  !isEmpty(getAppConfig(state))

export const cmsSelector = (state, section) =>
  createSelector(getCMS, (cms) => {
    const cmsKeys = get(CMS_KEYS, section, {})

    return mapValues(cmsKeys, (cms_key) => get(cms, cms_key, ''))
  })(state)

export const getUserInfo = (state) => get(state, 'userInfo', {})

export const getDocumentHead = (state) => get(state, 'documentHead')
