import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import qs from 'qs'

import SearchInput from 'components/common/header/search-input'
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

describe('SearchInput component', () => {
  describe('dispatch changeSearchQuery', () => {
    it('does nothing on not search pathname but still fetches search queries', () => {
      const changeSearchQueryStub = sinon.stub()
      const fetchSearchQueriesStub = sinon.stub()
      const query = qs.stringify({ q: 'query' }, { addQueryPrefix: true })
      render(
        <MemoryRouter
          initialEntries={[{ pathname: FRONT_PAGE_PATH, search: query }]}
        >
          <Route path={FRONT_PAGE_PATH}>
            <SearchInput
              changeSearchQuery={changeSearchQueryStub}
              fetchSearchQueries={fetchSearchQueriesStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).not.toHaveBeenCalled()
      expect(fetchSearchQueriesStub).toHaveBeenCalled()
    })

    it('calls change search query on search pathname and fetches search queries', () => {
      const changeSearchQueryStub = sinon.stub()
      const fetchSearchQueriesStub = sinon.stub()
      const query = qs.stringify({ q: 'query' }, { addQueryPrefix: true })
      render(
        <MemoryRouter
          initialEntries={[{ pathname: SEARCH_PATH, search: query }]}
        >
          <Route path={SEARCH_PATH}>
            <SearchInput
              changeSearchQuery={changeSearchQueryStub}
              fetchSearchQueries={fetchSearchQueriesStub}
            />
          </Route>
        </MemoryRouter>
      )

      expect(changeSearchQueryStub).toHaveBeenCalled()
      expect(fetchSearchQueriesStub).toHaveBeenCalled()
    })
  })

  describe('handleSearch when user input', () => {
    it('replaces current location if is on search page', () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[SEARCH_PATH]}>
          <Route path={SEARCH_PATH} exact>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
              <div>Search Page</div>
            </div>
          </Route>
          <Route path={FRONT_PAGE_PATH} exact>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
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

    it('push new location if is not on search page', () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[FRONT_PAGE_PATH]}>
          <Route path={SEARCH_PATH} exact>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
              <div>Search Page</div>
            </div>
          </Route>
          <Route path={FRONT_PAGE_PATH} exact>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
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

  describe('clearSearch when user click on close button', () => {
    it('clear search box and redirect to Home', () => {
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[SEARCH_PATH]}>
          <Route path={SEARCH_PATH} exact>
            <div>
              <SearchInput
                changeSearchQuery={changeSearchQueryStub}
                searchQuery='any'
              />
              <div>Search Page</div>
            </div>
          </Route>
          <Route path={FRONT_PAGE_PATH} exact>
            <div>
              <SearchInput changeSearchQuery={changeSearchQueryStub} />
              <div>Another Page</div>
            </div>
          </Route>
        </MemoryRouter>
      )

      const { getByTestId } = container

      const closeButton = getByTestId('test--close-btn')
      fireEvent.click(closeButton)
      expect(changeSearchQueryStub).toHaveBeenCalledWith('')
      expect(mockHistoryPush).toHaveBeenCalledWith(FRONT_PAGE_PATH)
    })
  })

  describe('handle search input suggestion', () => {
    it('shows search input suggestion on focus and can click on those suggestions', () => {
      const searchQuerySuggestions = ['query_1', 'query_2', 'query_3']
      const changeSearchQueryStub = sinon.stub()

      const container = render(
        <MemoryRouter initialEntries={[{ pathname: SEARCH_PATH }]}>
          <Route path={SEARCH_PATH}>
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
        <MemoryRouter initialEntries={[{ pathname: SEARCH_PATH }]}>
          <Route path={SEARCH_PATH}>
            <SearchInput
              searchQuerySuggestions={searchQuerySuggestions}
              changeSearchQuery={changeSearchQueryStub}
            />
          </Route>
        </MemoryRouter>
      )

      const { getByPlaceholderText, baseElement } = container
      const searchInput = getByPlaceholderText(
        'Search by name, department, or keyword'
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
        <MemoryRouter initialEntries={[{ pathname: SEARCH_PATH }]}>
          <Route path={SEARCH_PATH}>
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
})
