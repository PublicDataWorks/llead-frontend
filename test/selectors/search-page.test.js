import sinon from 'sinon'

import {
  getSearchQuery,
  searchResultsSelector,
  searchQuerySuggestionsSelector,
} from 'selectors/search-page'
import * as commonConstants from 'constants/common'

describe('#getSearchQuery', () => {
  it('returns search query', () => {
    const state = {
      searchPage: {
        searchQuery: 'query test',
      },
    }
    const query = getSearchQuery(state)
    expect(query).toEqual('query test')
  })
})

describe('#searchResultsSelector', () => {
  it('returns search results', () => {
    const rawResults = {
      departments: [
        {
          id: 22,
          name: 'Petersonmouth Department',
          city: 'Baton Rouge',
          parish: 'East Baton Rouge',
          locationMapUrl: null,
          otherFields: 'other fields',
        },
      ],
      officers: [
        {
          id: 9,
          name: 'Robert Craig',
          badges: ['12345'],
          department: {
            id: 22,
            name: 'Petersonmouth Department',
          },
          otherFields: 'other fields',
        },
      ],
      documents: [
        {
          id: 22,
          documentType: 'css',
          title: 'Especially sense available best.',
          url: 'http://documents.com/hundred/work.pdf',
          incidentDate: '2020-01-06',
          departments: [
            {
              id: 22,
              name: 'Petersonmouth Department',
            },
          ],
          textContent: 'Text content',
          textContentHighlight: 'Text content <em>highlight</em>',
        },
      ],
    }
    const state = {
      searchPage: {
        searchResults: rawResults,
      },
    }

    const results = searchResultsSelector(state)

    const expectedResults = {
      departments: [
        {
          id: 22,
          name: 'Petersonmouth Department',
          city: 'Baton Rouge',
          parish: 'East Baton Rouge',
          locationMapUrl: null,
        },
      ],
      officers: [
        {
          id: 9,
          name: 'Robert Craig',
          badges: ['12345'],
          department: {
            id: 22,
            name: 'Petersonmouth Department',
          },
        },
      ],
      documents: [
        {
          id: 22,
          documentType: 'css',
          title: 'Especially sense available best.',
          url: 'http://documents.com/hundred/work.pdf',
          incidentDate: 'Jan 6, 2020',
          departments: [
            {
              id: 22,
              name: 'Petersonmouth Department',
            },
          ],
          textContent: 'Text content',
          textContentHighlight: 'Text content <em>highlight</em>',
        },
      ],
    }

    expect(results).toStrictEqual(expectedResults)
  })
})

describe('#searchQuerySuggestionsSelector', () => {
  it('returns search result suggestions', () => {
    const searchQuery = 'query'
    const searchQueries = ['query_1', 'query_2', 'other_query']

    const state = {
      searchPage: {
        searchQuery,
        searchQueries,
      },
    }

    const results = searchQuerySuggestionsSelector(state)

    const expectedResults = ['query_1', 'query_2']

    expect(results).toStrictEqual(expectedResults)
  })

  it('returns top MAX_SEARCH_QUERY_SUGGESTIONS search result suggestions exclude the query', () => {
    const MAX_SEARCH_QUERY_SUGGESTIONS_STUB = 3
    sinon
      .stub(commonConstants, 'MAX_SEARCH_QUERY_SUGGESTIONS')
      .get(() => MAX_SEARCH_QUERY_SUGGESTIONS_STUB)

    const searchQuery = 'query'
    const searchQueries = [
      'query_1',
      'query_2',
      'other_query',
      'query',
      'query_3',
      'query_4',
    ]
    const state = {
      searchPage: {
        searchQuery,
        searchQueries,
      },
    }

    const results = searchQuerySuggestionsSelector(state)

    const expectedResults = ['query_1', 'query_2', 'query_3']

    expect(results).toStrictEqual(expectedResults)
  })

  it('returns top MAX_SEARCH_QUERY_SUGGESTIONS recent results if search query is empty', () => {
    const MAX_SEARCH_QUERY_SUGGESTIONS_STUB = 3
    sinon
      .stub(commonConstants, 'MAX_SEARCH_QUERY_SUGGESTIONS')
      .get(() => MAX_SEARCH_QUERY_SUGGESTIONS_STUB)

    const searchQuery = ''
    const searchQueries = [
      'query_1',
      'query_2',
      'other_query',
      'query_3',
      'query_4',
    ]

    const state = {
      searchPage: {
        searchQuery,
        searchQueries,
      },
    }

    const results = searchQuerySuggestionsSelector(state)

    const expectedResults = ['query_1', 'query_2', 'other_query']

    expect(results).toStrictEqual(expectedResults)
  })
})
