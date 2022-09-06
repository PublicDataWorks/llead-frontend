import searchModalReducer from 'reducers/search-feature/search-modal-reducer'

import { TOGGLE_SEARCH_MODAL } from 'action-types/common/search-feature'

describe('#searchCountReducer', () => {
  it('returns initial state', () => {
    expect(searchModalReducer(undefined, {})).toStrictEqual(false)
  })

  it('handles TOGGLE_SEARCH_MODAL', () => {
    const isSearchModalOpen = true

    const result = searchModalReducer(null, {
      type: TOGGLE_SEARCH_MODAL,
      payload: isSearchModalOpen,
    })

    expect(result).toEqual(isSearchModalOpen)
  })
})
