import sinon from 'sinon'

import { fetchAppConfig } from 'actions/common/app-config'
import * as actionTypes from 'action-types/common/app-config'
import * as ServiceApi from 'utils/api'
import { APP_CONFIG_API_URL } from 'constants/api'

describe('#fetchAppConfig', () => {
  it('calls get Api', () => {
    const getStub = sinon.stub(ServiceApi, 'get')
    const getFuncStub = sinon.stub()
    getStub.returns(getFuncStub)

    fetchAppConfig()

    expect(getStub).toHaveBeenCalledWith(
      [
        actionTypes.APP_CONFIG_FETCH_START,
        actionTypes.APP_CONFIG_FETCH_SUCCESS,
        actionTypes.APP_CONFIG_FETCH_FAILURE,
      ],
      APP_CONFIG_API_URL
    )
    expect(getFuncStub).toHaveBeenCalled()
  })
})
