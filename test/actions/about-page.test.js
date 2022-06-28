import sinon from 'sinon'

import { fetchQAA } from 'actions/about-page'
import * as actionTypes from 'action-types/about-page'
import * as ServiceApi from 'utils/api'
import { Q_AND_A_API_URL } from 'constants/api'

describe('#fetchDepartment', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFunc = sinon.stub()
    getStub.returns(getFunc)

    fetchQAA()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.Q_AND_A_FETCH_START,
        actionTypes.Q_AND_A_FETCH_SUCCESS,
        actionTypes.Q_AND_A_FETCH_FAILURE,
      ],
      Q_AND_A_API_URL
    )
    expect(getFunc).toHaveBeenCalled()
  })
})
