import get from 'lodash/get'
import map from 'lodash/map'

import { departmentFormatter, officerFormatter } from 'selectors/common'

const getSearchResults = (state) => get(state, 'searchPage.searchResults')

export const getSearchQuery = (state) => get(state, 'searchPage.searchQuery')

export const searchResultsSelector = (state) => {
  const searchResults = getSearchResults(state)

  return {
    departments: map(get(searchResults, 'departments'), departmentFormatter),
    officers: map(get(searchResults, 'officers'), officerFormatter),
  }
}
