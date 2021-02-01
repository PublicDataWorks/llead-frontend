import React from 'react'
import sinon from 'sinon'
import { render, waitFor } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'

import SearchPage from 'components/search-page'

describe('FrontPage component', () => {
  it('should render correctly', () => {
    const searchStub = sinon.stub()

    const searchResults = {
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
  })

  it('should perform search', async () => {
    const searchStub = sinon.stub()

    const searchResults = {
      departments: [],
      officers: [],
    }

    const searchQuery = 'searchQuery'

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <SearchPage
              searchResults={searchResults}
              search={searchStub}
              searchQuery={searchQuery}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(searchStub).toHaveBeenCalledWith(searchQuery))
  })
})
