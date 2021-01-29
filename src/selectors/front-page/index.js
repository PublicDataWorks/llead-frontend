import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})

const getDepartments = (state) => get(state.frontPage, 'departments', [])
const getOfficers = (state) => get(state.frontPage, 'officers', [])

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

export const officersSelector = (state) => {
  const rawOfficers = getOfficers(state)

  return map(rawOfficers, (officer) => {
    const rawDepartment = get(officer, 'department')
    const department = isEmpty(rawDepartment)
      ? {}
      : {
          name: rawDepartment.name,
        }

    return {
      name: get(officer, 'name'),
      badges: get(officer, 'badges'),
      department,
    }
  })
}
