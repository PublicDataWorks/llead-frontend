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
      documents: [
        {
          id: 22,
          documentType: 'css',
          title: 'Especially sense available best.',
          url: '/hundred/work.pdf',
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
          type: 'css',
          title: 'Especially sense available best.',
          url: '/hundred/work.pdf',
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
