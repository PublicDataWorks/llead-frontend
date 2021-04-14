import filterGroupKeyReducer from 'reducers/officer-page/filter-group-key-reducer'

import { CHANGE_FILTER_GROUP_KEY } from 'action-types/officer-page'

describe('#filterGroupKeyReducer', () => {
  it('handles intial state', () => {
    const result = filterGroupKeyReducer(undefined, {})

    expect(result).toEqual('')
  })

  it('handles CHANGE_FILTER_GROUP_KEY', () => {
    const groupKey = 'groupKey'

    const result = filterGroupKeyReducer(null, {
      type: CHANGE_FILTER_GROUP_KEY,
      payload: groupKey,
    })

    expect(result).toEqual(groupKey)
  })
})
