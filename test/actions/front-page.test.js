import sinon from 'sinon'

import { fetchAnalyticSummary } from 'actions/front-page'
import * as actionTypes from 'action-types/front-page'
import * as ServiceApi from 'utils/api'
import { ANALYTIC_SUMMARY_API_URL } from 'constants/api'

describe('#fetchAnalyticSummary', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchAnalyticSummary()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.ANALYTIC_SUMMARY_FETCH_START,
        actionTypes.ANALYTIC_SUMMARY_FETCH_SUCCESS,
        actionTypes.ANALYTIC_SUMMARY_FETCH_FAILURE,
      ],
      ANALYTIC_SUMMARY_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
