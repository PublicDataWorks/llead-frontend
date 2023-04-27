import findingsReducer from 'reducers/front-page/findings-reducer'

import { FINDINGS_FETCH_SUCCESS } from 'action-types/front-page'

describe('#findingsReducer', () => {
  it('should return initial state', () => {
    expect(findingsReducer(undefined, {})).toStrictEqual({})
  })

  it('should handle FINDINGS_FETCH_SUCCESS', () => {
    const findings = {
      id: 36,
      name: 'Officer Involved Shooting',
    }

    const result = findingsReducer(
      {},
      {
        type: FINDINGS_FETCH_SUCCESS,
        payload: findings,
      }
    )

    expect(result).toStrictEqual(findings)
  })
})
