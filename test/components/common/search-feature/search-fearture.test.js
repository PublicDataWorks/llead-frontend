import React from 'react'
import Modal from 'react-modal'
import { render, act, fireEvent } from '@testing-library/react'

import SearchFeature, {
  areSearchFeatureEqual,
} from 'components/common/search-feature'
import SearchInputContainer from 'containers/common/header/search-input'
import SearchAllContainer from 'containers/common/search-feature/search-all'
import ParticularSearchContainer from 'containers/common/search-feature/particular-search'
import * as googleAnalytics from 'utils/google-analytics'
import sinon from 'sinon'
import { EVENT_TYPES } from 'constants/common'

jest.mock('containers/common/header/search-input', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))
jest.mock('containers/common/search-feature/search-all', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))
jest.mock('containers/common/search-feature/particular-search', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

describe('SearchFeature component', () => {
  const mockCloseSearchCall = jest.fn()
  const mockSwithSectionCall = jest.fn()
  const mockItemClickCall = jest.fn()

  // eslint-disable-next-line react/prop-types
  const MockSearchInputContainer = ({ children, searchModalOnClose }) => {
    mockCloseSearchCall.mockImplementation(() => {
      searchModalOnClose()
    })
    return <div>Search Input {children}</div>
  }

  // eslint-disable-next-line react/prop-types
  const MockSearchAllContainer = ({ switchSection }) => {
    mockSwithSectionCall.mockImplementation((section) => {
      switchSection(section)
    })

    return <div>Search All</div>
  }

  // eslint-disable-next-line react/prop-types
  const MockParticularSearchContainer = ({ onItemClick }) => {
    mockItemClickCall.mockImplementation(() => {
      onItemClick()
    })
    return <div>Particular Search</div>
  }

  const mockSearchModalOnClose = jest.fn()
  const mockSearch = jest.fn()
  const mockSearchAll = jest.fn()
  const mockSaveRecentItem = jest.fn()
  const mockSaveSearchQuery = jest.fn()

  beforeAll(() => {
    SearchInputContainer.mockImplementation(MockSearchInputContainer)
    SearchAllContainer.mockImplementation(MockSearchAllContainer)
    ParticularSearchContainer.mockImplementation(MockParticularSearchContainer)
  })

  beforeEach(() => {
    SearchInputContainer.mockClear()
    SearchAllContainer.mockClear()
    ParticularSearchContainer.mockClear()
    mockSwithSectionCall.mockClear()
    mockItemClickCall.mockClear()
    mockCloseSearchCall.mockClear()
    Modal.setAppElement(document.createElement('div'))

    mockSearchModalOnClose.mockClear()
    mockSearch.mockClear()
    mockSearchAll.mockClear()
    mockSaveRecentItem.mockClear()
    mockSaveSearchQuery.mockClear()
  })

  it('renders correctly search all section', () => {
    const searchQueryValue = 'search query'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }

    const container = render(
      <SearchFeature
        isSearchModalOpen
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
      />
    )

    const { baseElement, getByText, queryByText } = container
    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).toBeTruthy()

    const searchInputSection = getByText('Search Input')
    expect(searchInputSection).toBeTruthy()

    const searchAllSection = queryByText('Search All')
    expect(searchAllSection).toBeTruthy()

    const particularSearchSection = queryByText('Particular Search')
    expect(particularSearchSection).not.toBeTruthy()

    expect(mockSearch).not.toHaveBeenCalled()
    expect(mockSearchAll).toHaveBeenCalledWith({
      query: searchQueryValue,
    })

    expect(SearchInputContainer.mock.calls[0][0]).toEqual({
      sectionType: 'all',
      searchModalOnClose: expect.any(Function),
      searchDepartment: {},
    })

    const swiperSearchBar = baseElement.getElementsByClassName('swiper')[0]
    expect(swiperSearchBar).toBeTruthy()

    const swiperSlides = swiperSearchBar.getElementsByClassName('swiper-slide')

    expect(swiperSlides.length).toEqual(3)

    const allSwiper = swiperSlides.item(0)
    expect(allSwiper.textContent).toEqual('All' + searchCountValue['all'])

    const departmentsSwiper = swiperSlides.item(1)
    expect(departmentsSwiper.textContent).toEqual(
      'Departments' + searchCountValue['departments']
    )

    const officersSwiper = swiperSlides.item(2)
    expect(officersSwiper.textContent).toEqual(
      'Officers' + searchCountValue['officers']
    )

    expect(SearchAllContainer.mock.calls[0][0]).toEqual({
      searchQuery: searchQueryValue,
      saveRecentItem: mockSaveRecentItem,
      onItemClick: expect.any(Function),
      switchSection: expect.any(Function),
    })

    expect(ParticularSearchContainer).not.toHaveBeenCalled()
  })

  it('does not render modal if not open', () => {
    const searchQueryValue = 'search query'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }

    const container = render(
      <SearchFeature
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
      />
    )

    const { baseElement, queryByText } = container
    const searchInputSection = queryByText('Search Input')
    expect(searchInputSection).not.toBeTruthy()

    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).not.toBeTruthy()
  })

  it('does not render search bar and any search section if query is empty', () => {
    const searchQueryValue = ''
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }

    const container = render(
      <SearchFeature
        isSearchModalOpen
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
      />
    )

    const { baseElement, queryByText } = container
    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).toBeTruthy()

    const searchInputSection = queryByText('Search Input')
    expect(searchInputSection).toBeTruthy()

    const swiperSearchBar = baseElement.getElementsByClassName('swiper')
    expect(swiperSearchBar.length).not.toBeTruthy()

    expect(SearchAllContainer).not.toHaveBeenCalled()
    expect(ParticularSearchContainer).not.toHaveBeenCalled()
  })

  it('renders particular search section', () => {
    const searchQueryValue = 'search query'
    const sectionType = 'officers'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }

    const container = render(
      <SearchFeature
        isSearchModalOpen
        itemType={sectionType}
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
      />
    )

    const { baseElement, getByText, queryByText } = container
    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).toBeTruthy()

    const searchInputSection = getByText('Search Input')
    expect(searchInputSection).toBeTruthy()

    const searchAllSection = queryByText('Search All')
    expect(searchAllSection).not.toBeTruthy()

    const particularSearchSection = queryByText('Particular Search')
    expect(particularSearchSection).toBeTruthy()

    expect(mockSearch).toHaveBeenCalledWith({
      query: searchQueryValue,
      docType: sectionType,
    })
    expect(mockSearchAll).toHaveBeenCalledWith({
      query: searchQueryValue,
    })

    expect(SearchInputContainer.mock.calls[0][0]).toEqual({
      sectionType,
      searchModalOnClose: expect.any(Function),
      searchDepartment: {},
    })

    const swiperSearchBar = baseElement.getElementsByClassName('swiper')[0]
    expect(swiperSearchBar).toBeTruthy()
    const swiperSlides = swiperSearchBar.getElementsByClassName('swiper-slide')
    expect(swiperSlides.length).toEqual(3)
    const allSwiper = swiperSlides.item(0)
    expect(allSwiper.textContent).toEqual('All' + searchCountValue['all'])
    const departmentsSwiper = swiperSlides.item(1)
    expect(departmentsSwiper.textContent).toEqual(
      'Departments' + searchCountValue['departments']
    )
    const officersSwiper = swiperSlides.item(2)
    expect(officersSwiper.textContent).toEqual(
      'Officers' + searchCountValue['officers']
    )

    expect(SearchAllContainer).not.toHaveBeenCalled()
    expect(ParticularSearchContainer.mock.calls[0][0]).toEqual({
      searchQuery: searchQueryValue,
      performSearch: expect.any(Function),
      saveRecentItem: mockSaveRecentItem,
      onItemClick: expect.any(Function),
      department: {},
    })
  })

  it('calls close search modal event on input close search trigger', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    const searchQueryValue = 'search query'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }

    const mockSearchModalOnClose = jest.fn()
    const mockFlushSearch = jest.fn()

    render(
      <SearchFeature
        isSearchModalOpen
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        searchCount={searchCountValue}
        flushSearch={mockFlushSearch}
      />
    )

    expect(mockSearchModalOnClose).not.toHaveBeenCalled()
    expect(mockFlushSearch).not.toHaveBeenCalled()

    mockCloseSearchCall()
    expect(mockSearchModalOnClose).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalledWith(mockFlushSearch, 500)
  })

  it('triggers switch section if item of search all section was clicked', async () => {
    const searchQueryValue = 'search query'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }

    const container = render(
      <SearchFeature
        isSearchModalOpen
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
      />
    )

    const { baseElement, getByText, queryByText } = container
    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).toBeTruthy()

    const searchInputSection = getByText('Search Input')
    expect(searchInputSection).toBeTruthy()

    const initStateSearchAllSection = queryByText('Search All')
    expect(initStateSearchAllSection).toBeTruthy()

    const initStateParticularSearchSection = queryByText('Particular Search')
    expect(initStateParticularSearchSection).not.toBeTruthy()

    await act(async () => {
      mockSwithSectionCall('officers')
    })

    const afterTriggerSearchAllSection = queryByText('Search All')
    expect(afterTriggerSearchAllSection).not.toBeTruthy()

    const afterTriggerParticularSearchSection = queryByText('Particular Search')
    expect(afterTriggerParticularSearchSection).toBeTruthy()
  })

  it('does not triggers switch section if clicking the same section', async () => {
    const searchQueryValue = 'search query'
    const sectionType = 'officers'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }
    const searchDepartment = {
      id: 'department-id',
      name: 'department-name',
    }

    const container = render(
      <SearchFeature
        itemType={sectionType}
        isSearchModalOpen
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
        department={searchDepartment}
      />
    )

    const { baseElement, getByText, queryByText } = container
    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).toBeTruthy()

    const searchInputSection = getByText('Search Input')
    expect(searchInputSection).toBeTruthy()

    const initStateParticularSearchSection = queryByText('Particular Search')
    expect(initStateParticularSearchSection).toBeTruthy()

    const officerSectionSearchBar = getByText('Officers')
    fireEvent.click(officerSectionSearchBar)
  })

  it('triggers save recent item of particular search item', () => {
    const searchQueryValue = 'search query'
    const sectionType = 'officers'
    const searchCountValue = {
      all: 1000,
      departments: 500,
      officers: 500,
    }
    sinon.stub(googleAnalytics, 'analyzeAction')

    render(
      <SearchFeature
        isSearchModalOpen
        itemType={sectionType}
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
      />
    )

    mockItemClickCall()

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.SEARCH,
      data: { search_query: searchQueryValue },
    })

    expect(mockSaveSearchQuery).toHaveBeenCalledWith(searchQueryValue)
    expect(mockSearchModalOnClose).toHaveBeenCalled()
  })

  it('searches within department with particular search section', () => {
    const searchQueryValue = 'search query'
    const sectionType = 'officers'
    const searchDepartment = {
      id: 'department-id',
      name: 'department-name',
    }
    const searchCountValue = {
      officers: 500,
      articles: 500,
    }

    const container = render(
      <SearchFeature
        isSearchModalOpen
        itemType={sectionType}
        searchModalOnClose={mockSearchModalOnClose}
        searchQuery={searchQueryValue}
        search={mockSearch}
        searchAll={mockSearchAll}
        searchCount={searchCountValue}
        saveRecentItem={mockSaveRecentItem}
        saveSearchQuery={mockSaveSearchQuery}
        department={searchDepartment}
      />
    )

    const { baseElement, getByText, queryByText } = container
    expect(
      baseElement.getElementsByClassName('search-modal').length
    ).toBeTruthy()

    const searchInputSection = getByText('Search Input')
    expect(searchInputSection).toBeTruthy()

    const searchAllSection = queryByText('Search All')
    expect(searchAllSection).not.toBeTruthy()

    const particularSearchSection = queryByText('Particular Search')
    expect(particularSearchSection).toBeTruthy()

    expect(mockSearch).toHaveBeenCalledWith({
      query: searchQueryValue,
      docType: sectionType,
      department: searchDepartment.id,
    })
    expect(mockSearchAll).toHaveBeenCalledWith({
      query: searchQueryValue,
      department: searchDepartment.id,
    })

    expect(SearchInputContainer.mock.calls[0][0]).toEqual({
      sectionType,
      searchModalOnClose: expect.any(Function),
      searchDepartment,
    })

    const swiperSearchBar = baseElement.getElementsByClassName('swiper')[0]
    expect(swiperSearchBar).toBeTruthy()
    const swiperSlides = swiperSearchBar.getElementsByClassName('swiper-slide')
    expect(swiperSlides.length).toEqual(2)
    const officersSwiper = swiperSlides.item(0)
    expect(officersSwiper.textContent).toEqual(
      'Officers' + searchCountValue['officers']
    )
    const articlesSwiper = swiperSlides.item(1)
    expect(articlesSwiper.textContent).toEqual(
      'Articles' + searchCountValue['articles']
    )

    expect(SearchAllContainer).not.toHaveBeenCalled()
    expect(ParticularSearchContainer.mock.calls[0][0]).toEqual({
      searchQuery: searchQueryValue,
      performSearch: expect.any(Function),
      saveRecentItem: mockSaveRecentItem,
      onItemClick: expect.any(Function),
      department: searchDepartment,
    })

    mockCloseSearchCall()
    expect(mockSearchModalOnClose).toHaveBeenCalled()
  })
})

describe('Search feature memo check test suite', () => {
  it('returns true when modal is closed of both props', () => {
    const prevProps = {
      otherProps: 'any',
      isSearchModalOpen: false,
    }
    const nextProps = {
      otherProps: 'any-update',
      isSearchModalOpen: false,
    }

    expect(areSearchFeatureEqual(prevProps, nextProps)).toBe(true)
  })

  it('returns false when modal is open', () => {
    const prevProps = {
      otherProps: 'any',
      isSearchModalOpen: false,
    }
    const nextProps = {
      otherProps: 'any',
      isSearchModalOpen: true,
    }

    expect(areSearchFeatureEqual(prevProps, nextProps)).toBe(false)
  })
})
