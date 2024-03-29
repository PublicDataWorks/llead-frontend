import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import * as rdd from 'react-device-detect'

import SearchInput from 'components/common/header/search-input'
import { FRONT_PAGE_PATH, DEPARTMENTS_PATH } from 'constants/paths'

describe('SearchInput component', () => {
  describe('dispatch changeSearchQuery', () => {
    it('calls change search query, fetches search queries', () => {
      const changeSearchQueryStub = sinon.stub()
      const fetchSearchQueriesStub = sinon.stub()

      render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <SearchInput
              changeSearchQuery={changeSearchQueryStub}
              fetchSearchQueries={fetchSearchQueriesStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).toHaveBeenCalledWith('')
      expect(fetchSearchQueriesStub).toHaveBeenCalled()
    })
  })

  describe('clearSearch when user click on close or clear search', () => {
    it('clears search box', () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
              <div>Front Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )

      const { getByPlaceholderText, getByText } = container

      const searchInput = getByPlaceholderText(
        'Search by name, agency, or keyword'
      )
      fireEvent.change(searchInput, { target: { value: 'any' } })

      const clearButton = getByText('Clear')
      fireEvent.click(clearButton)

      expect(changeSearchQueryStub).toHaveBeenCalledWith('')
    })

    it('closes search box', () => {
      const changeSearchQueryStub = sinon.stub()
      const searchModalOnCloseStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <div>
              <SearchInput
                changeSearchQuery={changeSearchQueryStub}
                searchModalOnClose={searchModalOnCloseStub}
                searchQuery='any'
              />
              <div>Front Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )

      const { getByTestId } = container

      const closeButton = getByTestId('test--close-btn')
      fireEvent.click(closeButton)

      expect(changeSearchQueryStub).toHaveBeenCalledWith('')
      expect(searchModalOnCloseStub).toHaveBeenCalled()
    })
  })

  describe('handle search input suggestion', () => {
    it('shows search input suggestion on focus and can click on those suggestions', () => {
      const searchQuerySuggestions = ['query_1', 'query_2', 'query_3']
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[{ pathname: FRONT_PAGE_PATH }]}>
          <Route path={FRONT_PAGE_PATH}>
            <SearchInput
              searchQuerySuggestions={searchQuerySuggestions}
              changeSearchQuery={changeSearchQueryStub}
            />
          </Route>
        </MemoryRouter>
      )

      const { getByText, baseElement } = container

      const querySuggestionHeader = baseElement.getElementsByClassName(
        'search-query-suggestion-header'
      )[0]
      expect(querySuggestionHeader.textContent).toEqual('Recent searches')

      const query1Item = getByText('query_1')
      const query2Item = getByText('query_2')
      const query3Item = getByText('query_3')

      expect(query1Item).toBeTruthy()
      expect(query2Item).toBeTruthy()
      expect(query3Item).toBeTruthy()

      fireEvent.click(query1Item)

      expect(changeSearchQueryStub).toHaveBeenCalledWith('query_1')
    })

    it('hides search input suggestion on click on search suggestion overlay', () => {
      const searchQuerySuggestions = ['query_1', 'query_2', 'query_3']
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[{ pathname: FRONT_PAGE_PATH }]}>
          <Route path={FRONT_PAGE_PATH}>
            <SearchInput
              searchQuerySuggestions={searchQuerySuggestions}
              changeSearchQuery={changeSearchQueryStub}
            />
          </Route>
        </MemoryRouter>
      )

      const { getByPlaceholderText, baseElement } = container
      const searchInput = getByPlaceholderText(
        'Search by name, agency, or keyword'
      )
      fireEvent.click(searchInput)

      const searchQuerySuggestionsElement = baseElement.getElementsByClassName(
        'search-query-suggestions'
      )[0]
      expect(searchQuerySuggestionsElement.classList).toContain(
        'show-suggestion'
      )

      const outsideItem = baseElement.getElementsByClassName(
        'search-suggestion-overlay'
      )[0]

      fireEvent.click(outsideItem)

      expect(searchQuerySuggestionsElement.classList).not.toContain(
        'show-suggestion'
      )
    })

    it('hides search input suggestion if searchQuerySuggestions is empty', () => {
      const searchQuerySuggestions = []
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[{ pathname: FRONT_PAGE_PATH }]}>
          <Route path={FRONT_PAGE_PATH}>
            <SearchInput
              searchQuerySuggestions={searchQuerySuggestions}
              changeSearchQuery={changeSearchQueryStub}
            />
            <div>Outside</div>
          </Route>
        </MemoryRouter>
      )

      const { baseElement } = container

      const searchQuerySuggestionsElement = baseElement.getElementsByClassName(
        'search-query-suggestions'
      )[0]
      expect(searchQuerySuggestionsElement.classList).not.toContain(
        'show-suggestion'
      )
    })
  })

  describe('handleSearch within department when user input', () => {
    it('renders correctly', () => {
      const changeSearchQueryStub = sinon.stub()

      const departmentData = {
        id: 'baton-rouge-pd',
        name: 'Baton Rouge PD',
        city: 'department city',
        locationMapUrl: null,
        parish: 'department parish',
      }

      const container = render(
        <MemoryRouter initialEntries={[DEPARTMENTS_PATH]}>
          <Route path={DEPARTMENTS_PATH} exact>
            <div>
              <SearchInput
                sectionType='officers'
                searchDepartment={departmentData}
                changeSearchQuery={changeSearchQueryStub}
              />
              <div>Department Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )
      const { getByPlaceholderText, baseElement } = container
      const searchInput = getByPlaceholderText(
        'Search officers in Baton Rouge PD'
      )
      fireEvent.change(searchInput, { target: { value: 'any' } })
      expect(changeSearchQueryStub).toHaveBeenCalledWith('any')
      expect(baseElement.textContent.includes('Department Page')).toBe(true)
    })
  })

  describe('Placeholder search input test suites', () => {
    it('shows short placeholder on mobile', async () => {
      sinon.stub(rdd, 'isMobile').get(() => true)

      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
              <div>Front Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )
      const { queryByPlaceholderText } = container

      const mobilePlaceHolderText = 'Search LLEAD'
      const desktopPlaceHolderText = 'Search by name, department, or keyword'
      expect(queryByPlaceholderText(mobilePlaceHolderText)).toBeTruthy()
      expect(queryByPlaceholderText(desktopPlaceHolderText)).toBeFalsy()
    })

    it('shows long placeholder on desktop', async () => {
      sinon.stub(rdd, 'isMobile').get(() => false)

      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
              <div>Front Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )
      const { queryByPlaceholderText } = container

      const mobilePlaceHolderText = 'Search LLEAD'
      const desktopPlaceHolderText = 'Search by name, agency, or keyword'
      expect(queryByPlaceholderText(mobilePlaceHolderText)).toBeFalsy()
      expect(queryByPlaceholderText(desktopPlaceHolderText)).toBeTruthy()
    })
  })

  describe('loading spinner test suites', () => {
    it('shows spinner when loading', async () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <div>
              <SearchInput
                changeSearchQuery={changeSearchQueryStub}
                isLoadingResult={true}
              />
              <div>Front Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container

      expect(
        baseElement.getElementsByClassName('gradient-spinner').length
      ).toEqual(1)
    })

    it('does not show spinner when loading done', async () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={FRONT_PAGE_PATH}>
            <div>
              <SearchInput
                changeSearchQuery={changeSearchQueryStub}
                isLoadingResult={false}
              />
              <div>Front Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container

      expect(
        baseElement.getElementsByClassName('gradient-spinner').length
      ).toEqual(0)
    })
  })
})
