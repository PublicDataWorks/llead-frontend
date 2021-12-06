import sinon from 'sinon'

import {
  getSearchQuery,
  searchResultsSelector,
  searchQuerySuggestionsSelector,
  searchQuerySelector,
  getSearchDepartment,
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

describe('#getSearchDepartment', () => {
  it('returns search departments', () => {
    const state = {
      searchPage: {
        searchDepartment: 'department test',
      },
    }
    const department = getSearchDepartment(state)
    expect(department).toEqual('department test')
  })
})

describe('#searchResultsSelector', () => {
  it('returns search results', () => {
    const rawResults = {
      departments: {
        results: [
          {
            id: 22,
            name: 'Petersonmouth Department',
            city: 'Baton Rouge',
            parish: 'East Baton Rouge',
            locationMapUrl: null,
            otherFields: 'other fields',
          },
        ],
        previous: null,
        next: 'http://ipno.com/pagination/?offset=1&limit=1&q=key',
        count: 2,
      },
      officers: {
        results: [
          {
            id: 9,
            name: 'Robert Craig',
            badges: ['12345'],
            department: {
              id: 'petersonmouth-department',
              name: 'Petersonmouth Department',
            },
            otherFields: 'other fields',
          },
        ],
        previous: null,
        next: null,
        count: 1,
      },
      documents: {
        results: [
          {
            id: 22,
            documentType: 'css',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work.pdf',
            incidentDate: '2020-01-06',
            departments: [
              {
                id: 'petersonmouth-department',
                name: 'Petersonmouth Department',
              },
            ],
            textContent: 'Text content',
            textContentHighlight: 'Text content <em>highlight</em>',
            previewImageUrl: 'http://documents.com/preview',
            pagesCount: 5,
          },
        ],
        previous: null,
        next: 'http://ipno.com/pagination/?offset=1&limit=1&q=key',
        count: 2,
      },
      articles: {
        results: [
          {
            id: 25,
            sourceName: 'Source',
            title: 'This is title',
            url: 'http://documents.com/hundred/work.pdf',
            date: '2021-01-10',
            author: 'Staff Writer',
            content: 'Text content key',
            contentHighlight: 'Text content <em>key</em>',
            authorHighlight: null,
          },
        ],
        previous: null,
        next: 'http://ipno.com/pagination/?offset=1&limit=1&q=key',
        count: 2,
      },
    }
    const state = {
      searchPage: {
        searchResults: rawResults,
      },
    }

    const results = searchResultsSelector(state)

    const expectedResults = {
      departments: {
        results: [
          {
            id: 22,
            name: 'Petersonmouth Department',
            city: 'Baton Rouge',
            parish: 'East Baton Rouge',
            locationMapUrl: null,
          },
        ],
        previous: null,
        count: 2,
        limit: 1,
        offset: 1,
        q: 'key',
      },
      officers: {
        results: [
          {
            id: 9,
            name: 'Robert Craig',
            badges: ['12345'],
            department: {
              id: 'petersonmouth-department',
              name: 'Petersonmouth Department',
            },
          },
        ],
        previous: null,
        count: 1,
      },
      documents: {
        results: [
          {
            id: 22,
            documentType: 'css',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work.pdf',
            incidentDate: 'Jan 6, 2020',
            departments: [
              {
                id: 'petersonmouth-department',
                name: 'Petersonmouth Department',
              },
            ],
            textContent: 'Text content',
            textContentHighlight: 'Text content <em>highlight</em>',
            previewImageUrl: 'http://documents.com/preview',
            pagesCount: 5,
          },
        ],
        previous: null,
        count: 2,
        limit: 1,
        offset: 1,
        q: 'key',
      },
      articles: {
        results: [
          {
            id: 25,
            sourceName: 'Source',
            title: 'This is title',
            url: 'http://documents.com/hundred/work.pdf',
            publishedDate: 'Jan 10, 2021',
            author: 'Staff Writer',
            content: 'Text content key',
            contentHighlight: 'Text content <em>key</em>',
            authorHighlight: null,
          },
        ],
        previous: null,
        count: 2,
        limit: 1,
        offset: 1,
        q: 'key',
      },
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

describe('#searchQuerySelector', () => {
  it('returns parsed docType and search query', () => {
    const state = {
      searchPage: {
        searchQuery: 'docType: keyword',
      },
    }
    const expected_result = {
      docType: 'docType',
      searchString: 'keyword',
    }
    const parsed_item = searchQuerySelector(state)
    expect(parsed_item).toStrictEqual(expected_result)
  })

  it('parse searchQuery without docType', () => {
    const state = {
      searchPage: {
        searchQuery: 'keyword',
      },
    }
    const expected_result = {
      docType: '',
      searchString: 'keyword',
    }
    const parsed_item = searchQuerySelector(state)
    expect(parsed_item).toStrictEqual(expected_result)
  })

  it('parse searchQuery with multi colons', () => {
    const state = {
      searchPage: {
        searchQuery: 'docType: docType: keyword',
      },
    }
    const expected_result = {
      docType: 'docType',
      searchString: 'docType: keyword',
    }
    const parsed_item = searchQuerySelector(state)
    expect(parsed_item).toStrictEqual(expected_result)
  })
})
