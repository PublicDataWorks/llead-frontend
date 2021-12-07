import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import qs from 'qs'

import Header from 'components/common/header'
import * as UserPanel from 'containers/common/header/user-panel'
import { FRONT_PAGE_PATH, SEARCH_PATH } from 'constants/paths'

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
  const MockUserPanelComponent = 'User Panel'

  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    sinon.stub(UserPanel, 'default').get(() => () => {
      return <div>{MockUserPanelComponent}</div>
    })
  })

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
    it('should render with user panel', () => {
      const logOutSpy = sinon.spy()
      const refreshToken = 'refreshToken'
      const container = render(
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search'>
            <Header
              isLoggedIn={true}
              logOut={logOutSpy}
              refreshToken={refreshToken}
            />
          </Route>
        </MemoryRouter>
      )
      const { baseElement, getByText } = container
      expect(baseElement.textContent.includes('LLEAD')).toBe(true)

      expect(getByText(MockUserPanelComponent)).toBeTruthy()
    })
  })

  describe('search query of the search box', () => {
    it('does nothing on not search pathname', () => {
      const changeSearchQueryStub = sinon.stub()
      const changeSearchDepartmentStub = sinon.stub()
      const query = qs.stringify({ q: 'query' }, { addQueryPrefix: true })
      render(
        <MemoryRouter initialEntries={[{ pathname: '/', search: query }]}>
          <Route path='/'>
            <Header
              isLoggedIn={true}
              changeSearchQuery={changeSearchQueryStub}
              changeSearchDepartment={changeSearchDepartmentStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).not.toHaveBeenCalled()
      expect(changeSearchDepartmentStub).not.toHaveBeenCalled()
    })
    it('does call change search query on search pathname', () => {
      const changeSearchQueryStub = sinon.stub()
      const changeSearchDepartmentStub = sinon.stub()
      const query = qs.stringify({ q: 'query' }, { addQueryPrefix: true })
      render(
        <MemoryRouter initialEntries={[{ pathname: '/search', search: query }]}>
          <Route path='/search'>
            <Header
              isLoggedIn={true}
              changeSearchQuery={changeSearchQueryStub}
              changeSearchDepartment={changeSearchDepartmentStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).toHaveBeenCalled()
      expect(changeSearchDepartmentStub).toHaveBeenCalledWith({})
    })
  })

  describe('handleSearch when user input', () => {
    it('replace current location', () => {
      const changeSearchQueryStub = sinon.stub()
      const changeSearchDepartmentStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
                changeSearchDepartment={changeSearchDepartmentStub}
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
      expect(changeSearchDepartmentStub).toHaveBeenCalledWith({})
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
      const changeSearchDepartmentStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/search' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
                changeSearchDepartment={changeSearchDepartmentStub}
              />
              <div>Search Page</div>
            </div>
          </Route>
          <Route path='/' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
                changeSearchDepartment={changeSearchDepartmentStub}
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
      expect(changeSearchDepartmentStub).not.toHaveBeenCalled()
      expect(baseElement.textContent.includes('Search Page')).toBe(false)
      expect(baseElement.textContent.includes('Another Page')).toBe(true)
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: SEARCH_PATH,
        search: qs.stringify({ q: 'any' }, { addQueryPrefix: true }),
      })
      expect(mockHistoryReplace).not.toHaveBeenCalled()
    })
  })
  describe('clearSearch when user click on close button', () => {
    it('clear search box and redirect to Home', () => {
      const changeSearchQueryStub = sinon.stub()
      const changeSearchDepartmentStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={['/search']}>
          <Route path='/search' exact>
            <div>
              <Header
                isLoggedIn={true}
                changeSearchQuery={changeSearchQueryStub}
                changeSearchDepartment={changeSearchDepartmentStub}
                searchQuery='any'
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

      const { getByTestId } = container

      const closeButton = getByTestId('test--close-btn')
      fireEvent.click(closeButton)
      expect(changeSearchQueryStub).toHaveBeenCalledWith('')
      expect(changeSearchDepartmentStub).toHaveBeenCalledWith({})
      expect(mockHistoryPush).toHaveBeenCalledWith(FRONT_PAGE_PATH)
    })
  })
})
