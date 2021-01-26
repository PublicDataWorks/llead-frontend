import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})

const getDepartments = (state) => get(state.frontPage, 'departments', [])

export const analyticSummarySelector = (state) => {
  const rawAnalyticSummary = getAnalyticSummary(state)

  if (isEmpty(rawAnalyticSummary)) return {}

  return {
    departmentsCount: rawAnalyticSummary['departments_count'],
    officersCount: rawAnalyticSummary['officers_count'],
    documentsCount: rawAnalyticSummary['documents_count'],
    recentDocumentsCount: rawAnalyticSummary['recent_documents_count'],
    recentDepartmentsCount: rawAnalyticSummary['recent_departments_count'],
    recentOfficersCount: rawAnalyticSummary['recent_officers_count'],
    recentDays: rawAnalyticSummary['recent_days'],
  }
}

export const departmentsSelector = (state) => {
  const rawDepartments = getDepartments(state)

  return map(rawDepartments, (department) => ({
    id: department['id'],
    name: department['name'],
    city: department['city'],
    parish: department['parish'],
    locationMapUrl: department['location_map_url'],
  }))
}
