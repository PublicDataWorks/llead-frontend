import React from 'react'
import { render, act } from '@testing-library/react'
import sinon from 'sinon'
import InfiniteScroll from 'react-infinite-scroller'

import ParticularSearch from 'components/common/search-feature/particular-search'

jest.mock('react-infinite-scroller', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

describe('ParticularSearch component', () => {
  const mockLoadMore = jest.fn()

  // eslint-disable-next-line react/prop-types
  const MockInfiniteScrollComponent = ({ children, loadMore }) => {
    mockLoadMore.mockImplementation(() => loadMore())

    return <div>Infinity Scroll{children}</div>
  }

  beforeAll(() => {
    InfiniteScroll.mockImplementation(MockInfiniteScrollComponent)
  })

  beforeEach(() => {
    InfiniteScroll.mockClear()
    mockLoadMore.mockClear()
  })

  it('renders departments', async () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 'petersonmouth-department',
        name: 'Petersonmouth Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: null,
      },
    ]

    const container = render(
      <ParticularSearch
        count={1}
        limit={5}
        docType='agencies'
        offset={10}
        results={results}
        searchQuery={'test'}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{}}
      />
    )

    const { baseElement, getByText } = container

    expect(
      baseElement.getElementsByClassName('search-title')[0].textContent
    ).toEqual('1 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0agencies')

    expect(getByText('Infinity Scroll')).toBeTruthy()
    expect(
      baseElement.getElementsByClassName('department-item').length
    ).toEqual(1)

    expect(InfiniteScroll.mock.calls[0][0]).toMatchObject({
      hasMore: true,
      loadMore: expect.any(Function),
      useWindow: false,
    })

    expect(performSearchSpy).not.toHaveBeenCalled()
    await act(async () => {
      mockLoadMore()
    })
    expect(performSearchSpy).toHaveBeenCalledWith({
      query: 'test',
      limit: 5,
      offset: 10,
      docType: 'agencies',
    })
  })

  it('renders officers', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 9,
        name: 'Robert Craig',
        badges: ['12345'],
        departments: [
          {
            id: 'petersonmouth-department',
            name: 'Petersonmouth Department',
          },
        ],
      },
    ]

    const container = render(
      <ParticularSearch
        count={1}
        limit={5}
        docType='officers'
        offset={10}
        results={results}
        searchQuery={'test'}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{}}
      />
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('search-title')[0].textContent
    ).toEqual('1 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0officers')

    expect(baseElement.getElementsByClassName('officer-item').length).toEqual(1)
  })

  it('renders officers within department', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 9,
        name: 'Robert Craig',
        badges: ['12345'],
        departments: [
          {
            id: 'petersonmouth-department',
            name: 'Petersonmouth Department',
          },
        ],
      },
    ]

    const container = render(
      <ParticularSearch
        count={1}
        limit={5}
        docType='officers'
        offset={10}
        results={results}
        searchQuery={'test'}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{
          id: 'new-orleans-pd',
          name: 'New Orleans Police Department',
        }}
      />
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('search-title')[0].textContent
    ).toEqual(
      '1 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0New Orleans Police Department'
    )

    expect(baseElement.getElementsByClassName('officer-item').length).toEqual(1)
  })

  it('renders documents', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 22,
        documentType: 'pdf',
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
    ]

    const container = render(
      <ParticularSearch
        count={1}
        limit={5}
        docType='documents'
        offset={10}
        results={results}
        searchQuery={'test'}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{}}
      />
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('search-title')[0].textContent
    ).toEqual('1 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0documents')

    expect(baseElement.getElementsByClassName('document-item').length).toEqual(
      1
    )
  })

  it('renders articles', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 25,
        sourceName: 'Source',
        title: 'This is title',
        url: 'http://documents.com/hundred/work.pdf',
        publishedDate: 'Jan 10, 2021',
        author: 'Staff Writer',
        content: 'Text content key',
        contentHighlight: 'Text content <em>key</em>',
        authorHighlight: null,
      },
    ]

    const container = render(
      <ParticularSearch
        count={1}
        limit={5}
        docType='articles'
        offset={10}
        results={results}
        searchQuery={'test'}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{}}
      />
    )

    const { baseElement } = container

    expect(
      baseElement.getElementsByClassName('search-title')[0].textContent
    ).toEqual('1 results for\u00A0\u201Ctest\u201D\u00A0in\u00A0articles')

    expect(
      baseElement.getElementsByClassName('news-article-item').length
    ).toEqual(1)
  })

  it('does not render when no query', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 'petersonmouth-department',
        name: 'Petersonmouth Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: null,
      },
    ]

    const container = render(
      <ParticularSearch
        count={5}
        limit={5}
        docType='agencies'
        offset={10}
        results={results}
        searchQuery={''}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{}}
      />
    )

    const { baseElement } = container

    expect(baseElement.getElementsByClassName('search-title').length).toEqual(0)
  })

  it('does not render when count equal to 0', () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 'petersonmouth-department',
        name: 'Petersonmouth Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: null,
      },
    ]

    const container = render(
      <ParticularSearch
        count={0}
        limit={5}
        docType='agencies'
        offset={10}
        results={results}
        searchQuery='test'
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        department={{}}
      />
    )

    const { baseElement } = container

    expect(baseElement.getElementsByClassName('search-title').length).toEqual(0)
  })

  it('does not load more if is loading', async () => {
    const saveRecentItemSpy = sinon.spy()
    const onItemClickSpy = sinon.spy()
    const performSearchSpy = sinon.spy()

    const results = [
      {
        id: 'petersonmouth-department',
        name: 'Petersonmouth Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: null,
      },
    ]

    render(
      <ParticularSearch
        count={1}
        limit={5}
        docType='agencies'
        offset={10}
        results={results}
        searchQuery={'test'}
        performSearch={performSearchSpy}
        saveRecentItem={saveRecentItemSpy}
        onItemClick={onItemClickSpy}
        isSearching={true}
        department={{}}
      />
    )

    await act(async () => {
      mockLoadMore()
    })
    expect(performSearchSpy).not.toHaveBeenCalled()
  })
})
