import analyticSummaryReducer from 'reducers/front-page/analytic-summary-reducer'

import { ANALYTIC_SUMMARY_FETCH_SUCCESS } from 'action-types/front-page'

describe('#analyticSummaryReducer', () => {
  it('should return initial state', () => {
    expect(analyticSummaryReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle ANALYTIC_SUMMARY_FETCH_SUCCESS', () => {
    const analyticSummary = {
      departments_count: 4,
      officers_count: 5,
      documents_count: 6,
      recent_days: 30,
      recent_departments_count: 1,
      recent_officers_count: 2,
      recent_documents_count: 3,
    }

    const result = analyticSummaryReducer(
      {},
      {
        type: ANALYTIC_SUMMARY_FETCH_SUCCESS,
        payload: analyticSummary,
      }
    )

    expect(result).toStrictEqual(analyticSummary)
  })
})
