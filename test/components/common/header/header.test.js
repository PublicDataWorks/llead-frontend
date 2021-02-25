import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import qs from 'qs'

import Header from 'components/common/header'
import { SEARCH_PATH } from 'constants/paths'

const mockHistoryPush = jest.fn()
const mockHistoryReplace = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    replace: mockHistoryReplace,
  }),
}))

beforeEach(() => {
  mockHistoryPush.mockClear()
  mockHistoryReplace.mockClear()
})

describe('Header component', () => {
  describe('user is not logged in', () => {
    it('should render correctly', () => {
      const container = render(
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <Header />
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container
      expect(baseElement.textContent.includes('LLEAD')).toBe(true)

      expect(baseElement.getElementsByClassName('logout-btn').length).toEqual(0)
    })
  })

  describe('user is logged in', () => {
    it('should render with log out button', () => {
      const logOutSpy = sinon.spy()
      const container = render(
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <Header isLoggedIn={true} logOut={logOutSpy} />
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container
      expect(baseElement.textContent.includes('LLEAD')).toBe(true)

      expect(baseElement.getElementsByClassName('logout-btn').length).toEqual(1)
      fireEvent.click(container.getByText('L'))
      expect(logOutSpy).toHaveBeenCalled()
    })
  })

  describe('search query of the search box', () => {
    it('does nothing on not search pathname', () => {
      const changeSearchQueryStub = sinon.stub()
      const query = qs.stringify({ q: 'query' }, { addQueryPrefix: true })
      render(
        <MemoryRouter initialEntries={[{ pathname: '/', search: query }]}>
          <Route path='/'>
            <Header
              isLoggedIn={true}
              changeSearchQuery={changeSearchQueryStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).not.toHaveBeenCalled()
    })
    it('does call change search query on search pathname', () => {
      const changeSearchQueryStub = sinon.stub()
      const query = qs.stringify({ q: 'query' }, { addQueryPrefix: true })
      render(
        <MemoryRouter initialEntries={[{ pathname: '/search', search: query }]}>
          <Route path='/search'>
            <Header
              isLoggedIn={true}
              changeSearchQuery={changeSearchQueryStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).toHaveBeenCalled()
    })
  })

  describe('handleSearch when user input', () => {
    it('replace current location', () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
              />
              <div>Search Page</div>
            </div>
          </Route>
          <Route path='/' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
              />
              <div>Another Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )

      const { getByPlaceholderText, baseElement } = container
      const searchInput = getByPlaceholderText(
        'Search by name, department, or keyword'
      )
      fireEvent.change(searchInput, { target: { value: 'any' } })

      expect(changeSearchQueryStub).toHaveBeenCalledWith('any')
      expect(baseElement.textContent.includes('Search Page')).toBe(true)
      expect(baseElement.textContent.includes('Another Page')).toBe(false)
      expect(mockHistoryReplace).toHaveBeenCalledWith({
        pathname: SEARCH_PATH,
        search: qs.stringify({ q: 'any' }, { addQueryPrefix: true }),
      })
      expect(mockHistoryPush).not.toHaveBeenCalled()
    })

    it('push new location', () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/search' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
              />
              <div>Search Page</div>
            </div>
          </Route>
          <Route path='/' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
              />
              <div>Another Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )

      const { getByPlaceholderText, baseElement } = container
      const searchInput = getByPlaceholderText(
        'Search by name, department, or keyword'
      )
      fireEvent.change(searchInput, { target: { value: 'any' } })

      expect(changeSearchQueryStub).toHaveBeenCalledWith('any')
      expect(baseElement.textContent.includes('Search Page')).toBe(false)
      expect(baseElement.textContent.includes('Another Page')).toBe(true)
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: SEARCH_PATH,
        search: qs.stringify({ q: 'any' }, { addQueryPrefix: true }),
      })
      expect(mockHistoryReplace).not.toHaveBeenCalled()
    })
  })
})
