import qs from 'qs'
import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import startsWith from 'lodash/startsWith'
import slice from 'lodash/slice'
import split from 'lodash/split'
import includes from 'lodash/includes'

import { MAX_SEARCH_QUERY_SUGGESTIONS } from 'constants/common'
import { formatDate } from 'utils/formatter'
import { departmentFormatter, officerFormatter } from 'selectors/common'
import { createSelector } from 'reselect'

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

const getSearchResults = (state) => get(state, 'searchPage.searchResults')

export const getSearchQuery = (state) =>
  get(state, 'searchPage.searchQuery', '')

export const getSearchDepartment = (state) =>
  get(state, 'searchPage.searchDepartment', {})

export const searchQuerySelector = createSelector(
  getSearchQuery,
  (searchQuery) => {
    const firstColonPos = searchQuery.indexOf(':')
    const docType = searchQuery.substr(0, firstColonPos)
    const searchString = searchQuery.substr(firstColonPos + 1).trim()

    return {
      docType,
      searchString,
    }
  }
)

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

export const searchResultsSelector = (state) => {
  const searchResults = getSearchResults(state)

  const { departments, officers, documents, articles } = searchResults
  const paginationAttrs = ['previous', 'count']

  return {
    departments: {
      ...pick(departments, paginationAttrs),
      ...parseNextResult(get(departments, 'next')),
      results: map(get(departments, 'results'), departmentFormatter),
    },
    officers: {
      ...pick(officers, paginationAttrs),
      ...parseNextResult(get(officers, 'next')),
      results: map(get(officers, 'results'), officerFormatter),
    },
    documents: {
      ...pick(documents, paginationAttrs),
      ...parseNextResult(get(documents, 'next')),
      results: map(get(documents, 'results'), documentFormatter),
    },
    articles: {
      ...pick(articles, paginationAttrs),
      ...parseNextResult(get(articles, 'next')),
      results: map(get(articles, 'results'), articleFormatter),
    },
  }
}
