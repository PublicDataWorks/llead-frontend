import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})

const getDepartments = (state) => get(state.frontPage, 'departments', [])

export const analyticSummarySelector = (state) => {
  const rawAnalyticSummary = getAnalyticSummary(state)

  const attributes = [
    'departmentsCount',
    'officersCount',
    'documentsCount',
    'recentDocumentsCount',
    'recentDepartmentsCount',
    'recentOfficersCount',
    'recentDays',
  ]

  return pick(rawAnalyticSummary, attributes)
}

export const departmentsSelector = (state) => {
  const attributes = ['id', 'name', 'city', 'parish', 'locationMapUrl']

  return map(getDepartments(state), (department) =>
    pick(department, attributes)
  )
}
