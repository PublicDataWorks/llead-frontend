import React from 'react'
import sinon from 'sinon'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'

import SearchPage from 'components/search-page'
import * as googleAnalytics from 'utils/google-analytics'
import { EVENT_TYPES } from 'constants/common'

describe('SearchPage component', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeAction')
  })

  it('should render correctly', () => {
    const searchStub = sinon.stub()

    const searchResults = {
      departments: {
        results: [
        {
          id: 'petersonmouth-department',
          name: 'Petersonmouth Department',
          city: 'Baton Rouge',
          parish: 'East Baton Rouge',
          locationMapUrl: null,
        },
        ],
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
        },
        ],
      },
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <SearchPage searchResults={searchResults} search={searchStub} />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    const { baseElement } = container

    const departmentCarousel = baseElement.getElementsByClassName(
      'departments-carousel'
    )[0]
    const departmentTitle = departmentCarousel.getElementsByClassName(
      'carousel-title'
    )[0]
    const departmentItems = departmentCarousel.getElementsByClassName(
      'swiper-slide'
    )
    expect(departmentTitle.textContent).toEqual('Departments')
    expect(departmentItems.length).toEqual(1)
    expect(
      departmentItems[0].textContent.includes('Petersonmouth Department')
    ).toBe(true)

    const officerCarousel = baseElement.getElementsByClassName(
      'officers-carousel'
    )[0]
    const officerTitle = officerCarousel.getElementsByClassName(
      'carousel-title'
    )[0]
    const officerItems = officerCarousel.getElementsByClassName('swiper-slide')
    expect(officerTitle.textContent).toEqual('Officers')
    expect(officerItems.length).toEqual(1)
    expect(officerItems[0].textContent.includes('Robert Craig')).toBe(true)

    const documentList = baseElement.getElementsByClassName('documents-list')[0]
    const documentTitle = documentList.getElementsByClassName(
      'documents-list-title'
    )[0]
    const documentItems = documentList.getElementsByClassName('list-items')
    expect(documentTitle.textContent).toEqual('Documents')
    expect(documentItems.length).toEqual(1)
    expect(
      documentItems[0].textContent.includes('Especially sense available best.')
    ).toBe(true)
  })

  it('should perform search', async () => {
    const searchStub = sinon.stub()

    const searchResults = {
      departments: {
        results: []},
      officers: {results: []},
      documents: {results: []},
    }

    const searchQuery = 'searchQuery'
    const searchParams = { docType: 'document', searchString: 'searchString' }

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <SearchPage
              searchResults={searchResults}
              search={searchStub}
              searchQuery={searchQuery}
              searchParams={searchParams}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => {
      expect(searchStub).toHaveBeenCalledWith({query: 'searchString', docType: 'documents'})
    })
  })

  it('should handle search result item click', async () => {
    const searchStub = sinon.stub()
    const saveSearchQuerySpy = sinon.spy()

    const searchResults = {
      departments: {
        results: [
        {
          id: 'petersonmouth-department',
          name: 'Petersonmouth Department',
          city: 'Baton Rouge',
          parish: 'East Baton Rouge',
          locationMapUrl: null,
        },
        ],
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
        },
        ],
      },
    }

    const searchQuery = 'searchQuery'

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <SearchPage
              searchResults={searchResults}
              search={searchStub}
              searchQuery={searchQuery}
              saveSearchQuery={saveSearchQuerySpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    const searchResultItem = baseElement.getElementsByClassName(
      'department-card'
    )[0]
    fireEvent.click(searchResultItem)
    await waitFor(() =>
      expect(saveSearchQuerySpy).toHaveBeenCalledWith(searchQuery)
    )
  })

  it('should analyze search result item click', async () => {
    const searchStub = sinon.stub()
    const saveSearchQuerySpy = sinon.spy()

    const searchResults = {
      departments: {
        results: [
        {
          id: 'petersonmouth-department',
          name: 'Petersonmouth Department',
          city: 'Baton Rouge',
          parish: 'East Baton Rouge',
          locationMapUrl: null,
        },
        ],
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
        },
        ],
      },
    }

    const searchQuery = 'searchQuery'

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <SearchPage
              searchResults={searchResults}
              search={searchStub}
              searchQuery={searchQuery}
              saveSearchQuery={saveSearchQuerySpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    const searchResultItem = baseElement.getElementsByClassName(
      'department-card'
    )[0]
    fireEvent.click(searchResultItem)
    await waitFor(() =>
      expect(saveSearchQuerySpy).toHaveBeenCalledWith(searchQuery)
    )

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.SEARCH,
      data: { search_query: searchQuery },
    })
  })
})
