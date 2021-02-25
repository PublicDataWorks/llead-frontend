import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

import { formatDocumentDate } from 'utils/formatter'
import { departmentFormatter, officerFormatter } from 'selectors/common'

export const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'url',
    'documentType',
    'departments',
    'textContent',
    'textContentHighlight'
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

export const searchResultsSelector = (state) => {
  const searchResults = getSearchResults(state)

  return {
    departments: map(get(searchResults, 'departments'), departmentFormatter),
    officers: map(get(searchResults, 'officers'), officerFormatter),
    documents: map(get(searchResults, 'documents'), documentFormatter),
  }
}
