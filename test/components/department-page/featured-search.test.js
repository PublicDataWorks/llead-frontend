import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import { render, fireEvent } from '@testing-library/react'
import Modal from 'react-modal'

import FeaturedSearch from 'components/department-page/featured-search'

describe('featured search component', () => {
  beforeEach(() => {
    Modal.setAppElement(document.createElement('div'))
  })
  it('renders search officers correctly', () => {
    const officersData = [
      {
        id: 15248,
        name: 'Jayson Germann',
        badges: ['84'],
        complaintsCount: 84,
        useOfForcesCount: 0,
      },
      {
        id: 2436,
        name: 'Derrick Burmaster',
        badges: ['85'],
        complaintsCount: 80,
        useOfForcesCount: 15,
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={officersData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'officers'}
          />
        </Route>
      </MemoryRouter>
    )

    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      baseElement,
    } = container

    expect(fetchSearchItemsSpy.firstCall.args).toEqual([
      '1',
      {
        q: '',
        kind: 'officers',
      },
    ])

    const featuredSearchModal = baseElement.getElementsByClassName(
      'featured-search-modal'
    )[0]

    expect(
      getByPlaceholderText('Search officers in Deparment name').className
    ).toEqual('transparent-input')
    expect(
      featuredSearchModal.getElementsByClassName('card-collection')[0]
    ).toBeTruthy()
    expect(getAllByText('Police Officer')).toBeTruthy()
    expect(getByText('Jayson Germann').className).toEqual('officer-name')
    expect(getByText('Derrick Burmaster').className).toEqual('officer-name')
  })

  it('renders news articles correctly', () => {
    const newsArticlesData = [
      {
        id: 25,
        sourceName: 'Source',
        title: 'This is title 1',
        url: 'http://documents.com/hundred/work-1.pdf',
        date: '2021-01-10',
        author: 'Staff Writer',
        content: 'Text content key',
        contentHighlight: 'Text content <em>key</em>',
        authorHighlight: null,
      },
      {
        id: 27,
        sourceName: 'Source',
        title: 'This is title 2',
        url: 'http://documents.com/hundred/work-2.pdf',
        date: '2021-01-11',
        author: 'Author key',
        content: 'Text content',
        contentHighlight: null,
        authorHighlight: 'Author <em>key</em>',
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={newsArticlesData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'news_articles'}
          />
        </Route>
      </MemoryRouter>
    )

    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      baseElement,
    } = container

    expect(fetchSearchItemsSpy.firstCall.args).toEqual([
      '1',
      {
        q: '',
        kind: 'news_articles',
      },
    ])

    const featuredSearchModal = baseElement.getElementsByClassName(
      'featured-search-modal'
    )[0]

    expect(
      getByPlaceholderText('Search news in Deparment name').className
    ).toEqual('transparent-input')
    expect(
      featuredSearchModal.getElementsByClassName('card-collection')[0]
    ).toBeTruthy()
    expect(getAllByText('news')).toBeTruthy()
    expect(getByText('This is title 1').className).toEqual(
      'news-article-item-name'
    )
    expect(getByText('This is title 2').className).toEqual(
      'news-article-item-name'
    )
  })

  it('renders documents correctly', () => {
    const documentsData = [
      {
        id: 1,
        documentType: 'pdf',
        url: 'https://i.imgur.com/document1.pdf',
        title: 'document-1',
        previewImageUrl: '',
        incidentDate: 'Nov 9, 2020',
        departments: [
          {
            id: 101,
            name: 'department-1',
          },
          {
            id: 102,
            name: 'department-2',
          },
        ],
        textContent: 'Text content',
      },
      {
        id: 2,
        documentType: 'csv',
        url: 'https://i.imgur.com/document2.csv',
        title: 'document-2',
        previewImageUrl: 'previewImageUrl-2',
        incidentDate: 'Dec 1, 2020',
        departments: [
          {
            id: 103,
            name: 'department-3',
          },
        ],
        textContentHightlight: 'Text content <em>highlight</em>',
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={documentsData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'documents'}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByText, getByPlaceholderText, baseElement } = container

    expect(fetchSearchItemsSpy.firstCall.args).toEqual([
      '1',
      {
        q: '',
        kind: 'documents',
      },
    ])

    const featuredSearchModal = baseElement.getElementsByClassName(
      'featured-search-modal'
    )[0]

    expect(
      getByPlaceholderText('Search documents in Deparment name').className
    ).toEqual('transparent-input')
    expect(
      featuredSearchModal.getElementsByClassName('card-collection')[0]
    ).toBeTruthy()

    expect(getByText('document-1').className).toEqual('document-item-name')
    expect(getByText('document-2').className).toEqual('document-item-name')
  })

  it('does not render results if items are empty', () => {
    const itemsData = []

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={itemsData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'officers'}
          />
        </Route>
      </MemoryRouter>
    )

    const { baseElement } = container

    expect(fetchSearchItemsSpy.firstCall.args).toEqual([
      '1',
      {
        q: '',
        kind: 'officers',
      },
    ])

    const featuredSearchModal = baseElement.getElementsByClassName(
      'featured-search-modal'
    )[0]

    expect(
      featuredSearchModal.getElementsByClassName('card-collection')[0]
    ).toBeFalsy()
  })

  it('searches for officers', () => {
    const officersData = [
      {
        id: 15248,
        name: 'Jayson Germann',
        badges: ['84'],
        complaintsCount: 84,
        useOfForcesCount: 0,
      },
      {
        id: 2436,
        name: 'Derrick Burmaster',
        badges: ['85'],
        complaintsCount: 80,
        useOfForcesCount: 15,
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={officersData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'officers'}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText } = container

    const searchInput = getByPlaceholderText(
      'Search officers in Deparment name'
    )

    fireEvent.change(searchInput, { target: { value: 'text' } })

    expect(fetchSearchItemsSpy).toHaveBeenCalledWith('1', {
      q: 'text',
      kind: 'officers',
    })
  })

  it('searches for news articles', () => {
    const newsArticlesData = [
      {
        id: 25,
        sourceName: 'Source',
        title: 'This is title 1',
        url: 'http://documents.com/hundred/work-1.pdf',
        date: '2021-01-10',
        author: 'Staff Writer',
        content: 'Text content key',
        contentHighlight: 'Text content <em>key</em>',
        authorHighlight: null,
      },
      {
        id: 27,
        sourceName: 'Source',
        title: 'This is title 2',
        url: 'http://documents.com/hundred/work-2.pdf',
        date: '2021-01-11',
        author: 'Author key',
        content: 'Text content',
        contentHighlight: null,
        authorHighlight: 'Author <em>key</em>',
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={newsArticlesData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'news_articles'}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText } = container

    const searchInput = getByPlaceholderText('Search news in Deparment name')

    fireEvent.change(searchInput, { target: { value: 'text' } })

    expect(fetchSearchItemsSpy).toHaveBeenCalledWith('1', {
      q: 'text',
      kind: 'news_articles',
    })
  })

  it('searches for documents', () => {
    const documentsData = [
      {
        id: 1,
        documentType: 'pdf',
        url: 'https://i.imgur.com/document1.pdf',
        title: 'document-1',
        previewImageUrl: '',
        incidentDate: 'Nov 9, 2020',
        departments: [
          {
            id: 101,
            name: 'department-1',
          },
          {
            id: 102,
            name: 'department-2',
          },
        ],
        textContent: 'Text content',
      },
      {
        id: 2,
        documentType: 'csv',
        url: 'https://i.imgur.com/document2.csv',
        title: 'document-2',
        previewImageUrl: 'previewImageUrl-2',
        incidentDate: 'Dec 1, 2020',
        departments: [
          {
            id: 103,
            name: 'department-3',
          },
        ],
        textContentHightlight: 'Text content <em>highlight</em>',
      },
    ]

    const fetchSearchItemsSpy = sinon.spy()

    const container = render(
      <MemoryRouter initialEntries={['departments/1']}>
        <Route path='departments/:id/'>
          <FeaturedSearch
            isSearchModalOpen={true}
            departmentId='1'
            departmentName='Deparment name'
            searchItems={documentsData}
            fetchSearchItems={fetchSearchItemsSpy}
            itemType={'documents'}
          />
        </Route>
      </MemoryRouter>
    )

    const { getByPlaceholderText } = container

    const searchInput = getByPlaceholderText(
      'Search documents in Deparment name'
    )

    fireEvent.change(searchInput, { target: { value: 'text' } })

    expect(fetchSearchItemsSpy).toHaveBeenCalledWith('1', {
      q: 'text',
      kind: 'documents',
    })
  })
})
