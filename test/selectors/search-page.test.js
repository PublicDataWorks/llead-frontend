import { getSearchQuery, searchResultsSelector } from 'selectors/search-page'

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
    }

    expect(results).toStrictEqual(expectedResults)
  })
})
