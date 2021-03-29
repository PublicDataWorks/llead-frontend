import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import startsWith from 'lodash/startsWith'
import slice from 'lodash/slice'

import { MAX_SEARCH_QUERY_SUGGESTIONS } from 'constants/common'
import { formatDocumentDate } from 'utils/formatter'
import { departmentFormatter, officerFormatter } from 'selectors/common'
import { createSelector } from 'reselect'

export const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'url',
    'documentType',
    'departments',
    'textContent',
    'textContentHighlight',
  ]
  const rawDepartments = get(document, 'departments')
  const departments = map(rawDepartments, (department) =>
    pick(department, ['id', 'name'])
  )

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDocumentDate(document.incidentDate),
    departments,
  }
}

const getSearchResults = (state) => get(state, 'searchPage.searchResults')

export const getSearchQuery = (state) => get(state, 'searchPage.searchQuery')

export const getSearchQueries = (state) =>
  get(state, 'searchPage.searchQueries')

export const searchQuerySuggestionsSelector = createSelector(
  getSearchQuery,
  getSearchQueries,
  (searchQuery, searchQueries) => {
    const queries = isEmpty(searchQuery)
      ? searchQueries
      : filter(
          searchQueries,
          (query) => startsWith(query, searchQuery) && query !== searchQuery
        )

    return slice(queries, 0, MAX_SEARCH_QUERY_SUGGESTIONS)
  }
)

export const searchResultsSelector = (state) => {
  const searchResults = getSearchResults(state)

  return {
    departments: map(get(searchResults, 'departments'), departmentFormatter),
    officers: map(get(searchResults, 'officers'), officerFormatter),
    documents: map(get(searchResults, 'documents'), documentFormatter),
  }
}
