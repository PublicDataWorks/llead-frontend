import sinon from 'sinon'

import * as actionTypes from 'action-types/authentication'
import * as ServiceApi from 'utils/api'
import { updateToken, logOut, removeToken } from 'actions/authentication'
import { LOG_OUT_API_URL } from 'constants/api'

describe('#updateToken', () => {
  it('returns the right action', () => {
    const token = 'token'

    expect(updateToken(token)).toEqual({
      type: actionTypes.UPDATE_TOKEN,
      payload: token,
    })
  })
})

describe('#logOut', () => {
  it('calls post Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

    const params = {
      refresh: 'refresh_token',
    }

    logOut(params)
    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.LOG_OUT_START,
        actionTypes.LOG_OUT_SUCCESS,
        actionTypes.LOG_OUT_FAILURE,
      ],
      LOG_OUT_API_URL
    )

    expect(postFuncStub).toHaveBeenCalledWith(params)
  })
})

describe('#removeToken', () => {
  it('returns the right action', () => {
    expect(removeToken()).toEqual({
      type: actionTypes.REMOVE_TOKEN,
    })
  })
})
