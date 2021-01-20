import appConfigReducer from 'reducers/app-config-reducer'

import { APP_CONFIG_FETCH_SUCCESS } from 'action-types/common/app-config'

describe('#appConfigReducer', () => {
  it('should return initial state', () => {
    expect(appConfigReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle APP_CONFIG_FETCH_SUCCESS', () => {
    const appConfigData = { NO_OF_RECENT_SEARCHES: '5' }

    const result = appConfigReducer(
      {},
      {
        type: APP_CONFIG_FETCH_SUCCESS,
        payload: appConfigData,
      }
    )

    expect(result).toStrictEqual(appConfigData)
  })
})
