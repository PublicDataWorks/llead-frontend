import sinon from 'sinon'

import { performLogin } from 'actions/login-page'
import * as actionTypes from 'action-types/login-page'
import * as ServiceApi from 'utils/api'
import { TOKEN_API_URL } from 'constants/api'

describe('#performLogin', () => {
  it('calls get Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

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
      TOKEN_API_URL
    )
    expect(postFuncStub).toHaveBeenCalledWith(credentials)
  })
})
