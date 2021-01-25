import { analyticSummarySelector } from 'selectors/front-page'

describe('#getAnalyticSummary', () => {
  describe('has data', () => {
    it('returns analytic summary data', () => {
      const rawAnalyticSummary = {
        departments_count: 4,
        officers_count: 5,
        documents_count: 6,
        recent_days: 30,
        recent_departments_count: 1,
        recent_officers_count: 2,
        recent_documents_count: 3,
      }

      const expectedAnalyticSummary = {
        departmentsCount: 4,
        officersCount: 5,
        documentsCount: 6,
        recentDays: 30,
        recentDepartmentsCount: 1,
        recentOfficersCount: 2,
        recentDocumentsCount: 3,
      }

      const state = {
        frontPage: {
          analyticSummary: rawAnalyticSummary,
        },
      }

      const analyticSummary = analyticSummarySelector(state)

      expect(analyticSummary).toStrictEqual(expectedAnalyticSummary)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const analyticSummary = analyticSummarySelector({})

      expect(analyticSummary).toStrictEqual({})
    })
  })
})
