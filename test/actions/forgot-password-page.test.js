import sinon from 'sinon'

import { performForgotPassword } from 'actions/forgot-password-page'
import * as actionTypes from 'action-types/forgot-password-page'
import * as ServiceApi from 'utils/api'
import { FORGOT_PASSWORD_API_URL } from 'constants/api'

describe('#performForgotPassword', () => {
  it('calls get Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

    const data = {
      email: 'mail@mail.com',
    }

    performForgotPassword(data)

    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.FORGOT_PASSWORD_START,
        actionTypes.FORGOT_PASSWORD_SUCCESS,
        actionTypes.FORGOT_PASSWORD_FAILURE,
      ],
      FORGOT_PASSWORD_API_URL
    )
    expect(postFuncStub).toHaveBeenCalledWith(data)
  })
})
