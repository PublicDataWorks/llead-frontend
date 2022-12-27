import qs from 'qs'
import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import startsWith from 'lodash/startsWith'
import slice from 'lodash/slice'
import split from 'lodash/split'
import includes from 'lodash/includes'
import mapValues from 'lodash/mapValues'
import keys from 'lodash/keys'

import { MAX_SEARCH_QUERY_SUGGESTIONS } from 'constants/common'
import { formatDate } from 'utils/formatter'
import { departmentFormatter, officerFormatter } from 'selectors/common'

export const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'url',
    'departments',
    'textContent',
    'textContentHighlight',
    'previewImageUrl',
    'pagesCount',
  ]
  const documentUrl = get(document, 'url')
  const filename = split(documentUrl, '/').pop()
  const documentType = includes(filename, '.') ? split(filename, '.').pop() : ''

  const rawDepartments = get(document, 'departments')
  const departments = map(rawDepartments, (department) =>
    pick(department, ['id', 'name'])
  )

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDate(document.incidentDate),
    documentType,
    departments,
  }
}

export const articleFormatter = (article) => {
  const articleAttributes = [
    'id',
    'title',
    'url',
    'sourceName',
    'author',
    'authorHighlight',
    'content',
    'contentHighlight',
  ]

  return {
    ...pick(article, articleAttributes),
    publishedDate: formatDate(article.date),
  }
}

export const ALL_FORMATTERS = {
  departments: departmentFormatter,
  officers: officerFormatter,
  documents: documentFormatter,
  articles: articleFormatter,
}

const getSearchResults = (state) => get(state, 'searchFeature.searchResults')

const getSearchAllResults = (state) =>
  get(state, 'searchFeature.searchAllResults', {})

export const getSearchQuery = (state) =>
  get(state, 'searchFeature.searchQuery', '')

export const getSearchQueries = (state) =>
  get(state, 'searchFeature.searchQueries')

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

const parseNextResult = (next) => {
  if (isEmpty(next)) {
    return {}
  }

  const searchParams = new URL(next).search
  const { limit: parsedLimit, offset: parsedOffset, q } = qs.parse(
    searchParams,
    {
      ignoreQueryPrefix: true,
    }
  )
  return {
    limit: parseInt(parsedLimit),
    offset: parseInt(parsedOffset),
    q,
  }
}

export const searchResultsSelector = createSelector(
  getSearchResults,
  (searchResults) => {
    const paginationAttrs = ['previous', 'count']

    const docTypes = keys(searchResults)

    if (isEmpty(docTypes)) {
      return {}
    }

    const docType = docTypes[0]
    const item = get(searchResults, docType)

    const formatter = ALL_FORMATTERS[docType]

    return {
      ...pick(item, paginationAttrs),
      ...parseNextResult(get(item, 'next')),
      docType,
      results: map(get(item, 'results'), formatter),
    }
  }
)

export const searchAllResultsSelector = (state) => {
  const searchResults = getSearchAllResults(state)

  const pickAttr = ['results', 'count']

  const { agencies, officers, documents, articles } = mapValues(
    searchResults,
    (value) => pick(value, pickAttr)
  )

  return {
    agencies,
    officers,
    documents,
    articles,
  }
}

export const getSearchCount = (state) => get(state, 'searchFeature.searchCount')

export const getIsSearchModalOpen = (state) =>
  get(state, 'searchFeature.isSearchModalOpen')

export const getIsSearching = (state) => get(state, 'searchFeature.isSearching')
export const getIsLoadingResult = (state) =>
  get(state, 'searchFeature.isResultLoading')
