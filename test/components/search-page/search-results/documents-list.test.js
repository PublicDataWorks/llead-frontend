import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import DocumentsList from 'components/search-page/search-results/documents-list'

const mockHistoryReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}))

describe('Documents List', () => {
  beforeEach(() => {
    mockHistoryReplace.mockClear()
  })

  it('should render correctly', () => {
    const documents = [
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
    const container = render(<DocumentsList items={documents} />)
    const { baseElement } = container

    const documentsListTitle = baseElement.getElementsByClassName(
      'documents-list-title'
    )[0]
    const documentLItemsList = baseElement.getElementsByClassName(
      'document-item'
    )

    expect(documentsListTitle.textContent.includes('Documents')).toBe(true)
    expect(documentLItemsList.length).toBe(2)
  })

  it('should render show more and perform search more', () => {
    const documents = [
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
    const params = {
      limit: 2,
      offset: 1,
      count: 10,
      q: 'document',
    }
    const searchQuery = 'keyword'
    const docType = null
    const changeSearchQuery = sinon.stub()
    const performSearch =sinon.stub()

    const container = render(
     
    <DocumentsList 
      items={documents}
      params={params}
      docType={docType}
      searchQuery={searchQuery}
      performSearch={performSearch}
      changeSearchQuery={changeSearchQuery}
      />
     )

    const { baseElement } = container

    const documentsListTitle = baseElement.getElementsByClassName(
      'documents-list-title'
    )[0]
    const documentLItemsList = baseElement.getElementsByClassName(
      'document-item'
    )

    expect(documentsListTitle.textContent.includes('Documents')).toBe(true)
    expect(documentLItemsList.length).toBe(2)

    const showMoreButton = baseElement.getElementsByClassName(
      'documents-search-more'
    )[0]
    expect(showMoreButton).toBeTruthy()
    fireEvent.click(showMoreButton)

    const expectedNewLocation = {
      pathname: '/search/',
      search: '?q=document%3A%20keyword',
    }
    
    expect(changeSearchQuery).toHaveBeenCalledWith('document: keyword')
    expect(mockHistoryReplace).toHaveBeenCalledWith(expectedNewLocation)
  })
  
})
