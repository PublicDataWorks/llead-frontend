import sinon from 'sinon'

import { performForgotPasswordConfirm } from 'actions/forgot-password-confirm-page'
import * as actionTypes from 'action-types/forgot-password-confirm-page'
import * as ServiceApi from 'utils/api'
import { FORGOT_PASSWORD_CONFIRM_API_URL } from 'constants/api'

describe('#performForgotPasswordConfirm', () => {
  it('calls get Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

    const data = {
      email: 'mail@mail.com',
    }

    performForgotPasswordConfirm(data)

    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.FORGOT_PASSWORD_CONFIRM_START,
        actionTypes.FORGOT_PASSWORD_CONFIRM_SUCCESS,
        actionTypes.FORGOT_PASSWORD_CONFIRM_FAILURE,
      ],
      FORGOT_PASSWORD_CONFIRM_API_URL
    )
    expect(postFuncStub).toHaveBeenCalledWith(data)
  })
})
