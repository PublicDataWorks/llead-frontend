import sinon from 'sinon'

import { fetchUserInfo } from 'actions/common/user-info'
import * as actionTypes from 'action-types/common/user-info'
import * as ServiceApi from 'utils/api'
import { USER_INFO_API_URL } from 'constants/api'

describe('#fetchUserInfo', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFuncStub = sinon.stub()
    getStub.returns(getFuncStub)

    fetchUserInfo()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.USER_INFO_FETCH_START,
        actionTypes.USER_INFO_FETCH_SUCCESS,
        actionTypes.USER_INFO_FETCH_FAILURE,
      ],
      USER_INFO_API_URL
    )
    expect(getFuncStub).toHaveBeenCalled()
  })
})
