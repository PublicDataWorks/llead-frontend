import sinon from 'sinon'

import { performLogin } from 'actions/login-page'
import * as actionTypes from 'action-types/login-page'
import * as ServiceApi from 'utils/api'
import { SIGN_IN_API_URL } from 'constants/api'

describe('#performLogin', () => {
  it('calls get Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFunc = sinon.stub()
    postStub.returns(postFunc)

    const credentials = {
      email: 'mail@mail.com',
      password: 'password',
    }

    performLogin(credentials)

    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.LOGIN_START,
        actionTypes.LOGIN_SUCCESS,
        actionTypes.LOGIN_FAILURE,
      ],
      SIGN_IN_API_URL,
      credentials
    )
    expect(postStub).toHaveBeenCalled()
  })
})
