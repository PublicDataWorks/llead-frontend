import sinon from 'sinon'

import {
  getSearchQuery,
  searchResultsSelector,
  searchQuerySuggestionsSelector,
  getSearchQueries,
  getSearchCount,
  getIsSearchModalOpen,
  searchAllResultsSelector,
} from 'selectors/common/search-feature'
import * as commonConstants from 'constants/common'

describe('#getSearchQuery', () => {
  it('returns search query', () => {
    const state = {
      searchFeature: {
        searchQuery: 'query test',
      },
    }
    const query = getSearchQuery(state)
    expect(query).toEqual('query test')
  })
})

describe('#getSearchQueries', () => {
  it('returns search queries', () => {
    const state = {
      searchFeature: {
        searchQueries: 'query test',
      },
    }
    const query = getSearchQueries(state)
    expect(query).toEqual('query test')
  })
})

describe('#searchAllResultsSelector', () => {
  it('returns search results', () => {
    const rawResults = {
      agencies: {
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
            departments: [
              {
                id: 'petersonmouth-department',
                name: 'Petersonmouth Department',
              },
            ],
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
            documentType: 'pdf',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work.pdf',
            date: 'Jan 6, 2020',
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
      searchFeature: {
        searchAllResults: rawResults,
      },
    }

    const results = searchAllResultsSelector(state)

    const expectedResults = {
      agencies: {
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
        count: 2,
      },
      officers: {
        results: [
          {
            id: 9,
            name: 'Robert Craig',
            badges: ['12345'],
            departments: [
              {
                id: 'petersonmouth-department',
                name: 'Petersonmouth Department',
              },
            ],
            otherFields: 'other fields',
          },
        ],
        count: 1,
      },
      documents: {
        results: [
          {
            id: 22,
            documentType: 'pdf',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work.pdf',
            date: 'Jan 6, 2020',
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
        count: 2,
      },
    }

    expect(results).toStrictEqual(expectedResults)
  })
})

describe('#searchResultsSelector', () => {
  it('returns documents', () => {
    const rawResults = {
      documents: {
        results: [
          {
            id: 22,
            documentType: 'application/pdf',
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
          {
            id: 23,
            documentType: 'application/msword',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work.doc',
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
          {
            id: 24,
            documentType: 'application/xml',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work.docx',
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
          {
            id: 25,
            documentType: 'application/xml',
            title: 'Especially sense available best.',
            url: 'http://documents.com/hundred/work',
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
        next: 'http://ipno.com/pagination/?offset=0&limit=4&q=key',
        count: 4,
      },
    }
    const state = {
      searchFeature: {
        searchResults: rawResults,
      },
    }

    const results = searchResultsSelector(state)

    const expectedResults = {
      results: [
        {
          id: 22,
          documentType: 'pdf',
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
        {
          id: 23,
          documentType: 'doc',
          title: 'Especially sense available best.',
          url: 'http://documents.com/hundred/work.doc',
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
        {
          id: 24,
          documentType: 'docx',
          title: 'Especially sense available best.',
          url: 'http://documents.com/hundred/work.docx',
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
        {
          id: 25,
          documentType: '',
          title: 'Especially sense available best.',
          url: 'http://documents.com/hundred/work',
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
      count: 4,
      limit: 4,
      offset: 0,
      q: 'key',
      docType: 'documents',
    }

    expect(results).toStrictEqual(expectedResults)
  })

  it('returns articles', () => {
    const rawResults = {
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
          {
            id: 26,
            sourceName: 'Source 1',
            title: 'This is title',
            url: 'http://documents.com/hundred/work.pdf',
            date: '2021-01-10',
            author: 'Staff Writer',
            content: 'Text content key',
            contentHighlight: 'Text content <em>key</em>',
            authorHighlight: null,
          },
          {
            id: 27,
            sourceName: 'Source 2',
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
        next: 'http://ipno.com/pagination/?offset=0&limit=4&q=key',
        count: 4,
      },
    }
    const state = {
      searchFeature: {
        searchResults: rawResults,
      },
    }

    const results = searchResultsSelector(state)

    const expectedResults = {
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
        {
          id: 26,
          sourceName: 'Source 1',
          title: 'This is title',
          url: 'http://documents.com/hundred/work.pdf',
          publishedDate: 'Jan 10, 2021',
          author: 'Staff Writer',
          content: 'Text content key',
          contentHighlight: 'Text content <em>key</em>',
          authorHighlight: null,
        },
        {
          id: 27,
          sourceName: 'Source 2',
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
      count: 4,
      limit: 4,
      offset: 0,
      q: 'key',
      docType: 'articles',
    }

    expect(results).toStrictEqual(expectedResults)
  })

  it('returns empty object when no docType', () => {
    const rawResults = {}

    const state = {
      searchFeature: {
        searchResults: rawResults,
      },
    }

    const results = searchResultsSelector(state)

    expect(results).toStrictEqual({})
  })

  it('returns empty limit, offset, and q when no next', () => {
    const rawResults = {
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
          {
            id: 26,
            sourceName: 'Source 1',
            title: 'This is title',
            url: 'http://documents.com/hundred/work.pdf',
            date: '2021-01-10',
            author: 'Staff Writer',
            content: 'Text content key',
            contentHighlight: 'Text content <em>key</em>',
            authorHighlight: null,
          },
          {
            id: 27,
            sourceName: 'Source 2',
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
        next: null,
        count: 4,
      },
    }
    const state = {
      searchFeature: {
        searchResults: rawResults,
      },
    }

    const results = searchResultsSelector(state)

    const expectedResults = {
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
        {
          id: 26,
          sourceName: 'Source 1',
          title: 'This is title',
          url: 'http://documents.com/hundred/work.pdf',
          publishedDate: 'Jan 10, 2021',
          author: 'Staff Writer',
          content: 'Text content key',
          contentHighlight: 'Text content <em>key</em>',
          authorHighlight: null,
        },
        {
          id: 27,
          sourceName: 'Source 2',
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
      count: 4,
      docType: 'articles',
    }

    expect(results).toStrictEqual(expectedResults)
  })
})

describe('#searchQuerySuggestionsSelector', () => {
  it('returns search result suggestions', () => {
    const searchQuery = 'query'
    const searchQueries = ['query_1', 'query_2', 'other_query']

    const state = {
      searchFeature: {
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
      searchFeature: {
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
      searchFeature: {
        searchQuery,
        searchQueries,
      },
    }

    const results = searchQuerySuggestionsSelector(state)

    const expectedResults = ['query_1', 'query_2', 'other_query']

    expect(results).toStrictEqual(expectedResults)
  })
})

describe('#getSearchCount', () => {
  it('returns search count', () => {
    const state = {
      searchFeature: {
        searchCount: {
          all: 9,
          departments: 1,
          officers: 2,
          documents: 3,
          articles: 3,
        },
      },
    }
    const count = getSearchCount(state)
    expect(count).toEqual({
      all: 9,
      departments: 1,
      officers: 2,
      documents: 3,
      articles: 3,
    })
  })
})

describe('#getIsSearchModalOpen', () => {
  it('returns isSearchModalOpen', () => {
    const state = {
      searchFeature: {
        isSearchModalOpen: true,
      },
    }
    const isSearchModalOpen = getIsSearchModalOpen(state)
    expect(isSearchModalOpen).toEqual(true)
  })
})
