import sinon from 'sinon'

import { saveFeedback } from 'actions/contact-page'
import * as actionTypes from 'action-types/contact-page'
import * as ServiceApi from 'utils/api'
import { FEEDBACKS_API_URL } from 'constants/api'

describe('#saveFeedback', () => {
  it('calls post Api', () => {
    const postStub = sinon.stub(ServiceApi, 'post')
    const postFuncStub = sinon.stub()
    postStub.returns(postFuncStub)

    const data = {
      email: 'mail@mail.com',
      message: 'Test message'
    }

    saveFeedback(data)

    expect(postStub).toHaveBeenCalledWith(
      [
        actionTypes.SAVE_FEEDBACK_START,
        actionTypes.SAVE_FEEDBACK_SUCCESS,
        actionTypes.SAVE_FEEDBACK_FAILURE,
      ],
      FEEDBACKS_API_URL
    )
    expect(postFuncStub).toHaveBeenCalledWith(data)
  })
})
