import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import Header from 'components/common/header'
import UserPanel from 'containers/common/header/user-panel'
import SearchFeature from 'containers/common/search-feature'
import { CONTACT_PATH } from 'constants/paths'

const mockHistoryPush = jest.fn()
const mockHistoryReplace = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    replace: mockHistoryReplace,
  }),
}))

jest.mock('containers/common/search-feature', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

jest.mock('containers/common/header/user-panel', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

describe('Header component', () => {
  const mockcloseSearchModal = jest.fn()

  // eslint-disable-next-line react/prop-types
  const MockSearchFeatureContainer = ({ searchModalOnClose }) => {
    mockcloseSearchModal.mockImplementation(() => {
      searchModalOnClose()
    })
    return <div>Search Feature</div>
  }

  const MockUserPanelContainer = () => {
    return <div>User Panel</div>
  }

  beforeAll(() => {
    SearchFeature.mockImplementation(MockSearchFeatureContainer)
    UserPanel.mockImplementation(MockUserPanelContainer)
  })

  beforeEach(() => {
    mockHistoryPush.mockClear()
    mockHistoryReplace.mockClear()
    SearchFeature.mockClear()
    UserPanel.mockClear()
  })

  describe('user is not logged in', () => {
    it('renders correctly', () => {
      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <Header />
          </Route>
        </MemoryRouter>
      )
      const { baseElement, getByText, queryByText } = container

      expect(baseElement.textContent.includes('LLEAD')).toBe(true)

      expect(getByText('About').className).toEqual('about')
      expect(getByText('Contact').className).toEqual('contact')
      expect(queryByText('User Panel')).toBeFalsy()
    })
  })

  describe('user is logged in', () => {
    it('renders in front page', () => {
      const logOutSpy = sinon.spy()
      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <Header isLoggedIn={true} logOut={logOutSpy} />
          </Route>
        </MemoryRouter>
      )
      const { baseElement, queryByText } = container

      expect(baseElement.textContent.includes('LLEAD')).toBe(true)

      expect(queryByText('Search Feature')).toBeTruthy()
      expect(baseElement.getElementsByClassName('search-icon').length).toEqual(
        0
      )
      expect(
        baseElement.getElementsByClassName('search-container').length
      ).toEqual(0)
      expect(queryByText('User Panel')).toBeTruthy()
    })

    it('renders in another page', () => {
      const logOutSpy = sinon.spy()
      const container = render(
        <MemoryRouter initialEntries={[CONTACT_PATH]}>
          <Route path={CONTACT_PATH}>
            <Header isLoggedIn={true} logOut={logOutSpy} />
          </Route>
        </MemoryRouter>
      )
      const { baseElement, queryByText } = container

      expect(baseElement.textContent.includes('LLEAD')).toBe(true)

      expect(queryByText('Search Feature')).toBeTruthy()
      expect(baseElement.getElementsByClassName('search-icon').length).toEqual(
        1
      )
      expect(
        baseElement.getElementsByClassName('search-container').length
      ).toEqual(1)
      expect(queryByText('User Panel')).toBeTruthy()
    })
  })

  describe('toggle search modal', () => {
    it('opens search modal when triggering search icon', () => {
      const toggleSearchModalStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[CONTACT_PATH]}>
          <Route path={CONTACT_PATH}>
            <Header
              isLoggedIn={true}
              isSearchModalOpen={false}
              toggleSearchModal={toggleSearchModalStub}
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container

      const searchIcon = baseElement.getElementsByClassName('search-icon')[0]
      fireEvent.click(searchIcon)

      expect(toggleSearchModalStub).toHaveBeenCalledWith(true)
    })

    it('opens search modal when triggering search input', () => {
      const toggleSearchModalStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[CONTACT_PATH]}>
          <Route path={CONTACT_PATH}>
            <Header
              isLoggedIn={true}
              isSearchModalOpen={false}
              toggleSearchModal={toggleSearchModalStub}
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container

      const searchInput = baseElement.getElementsByClassName('input-field')[0]
      fireEvent.click(searchInput)

      expect(toggleSearchModalStub).toHaveBeenCalledWith(true)
    })

    it('closes search modal', () => {
      const toggleSearchModalStub = sinon.stub()

      render(
        <MemoryRouter initialEntries={[CONTACT_PATH]}>
          <Route path={CONTACT_PATH}>
            <Header
              isLoggedIn={true}
              isSearchModalOpen={true}
              toggleSearchModal={toggleSearchModalStub}
            />
          </Route>
        </MemoryRouter>
      )

      mockcloseSearchModal()

      expect(toggleSearchModalStub).toHaveBeenCalledWith(false)
    })
  })

  describe('toggle menu', () => {
    it('opens menu', () => {
      const toggleSearchModalStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <Header
              isLoggedIn={true}
              isSearchModalOpen={false}
              toggleSearchModal={toggleSearchModalStub}
            />
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container

      const hamburgerBtn = baseElement.getElementsByClassName(
        'hamburger-button'
      )[0]
      fireEvent.click(hamburgerBtn)

      expect(baseElement.getElementsByClassName('menu')).toBeTruthy()
    })
  })
})
