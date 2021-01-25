import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})

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
