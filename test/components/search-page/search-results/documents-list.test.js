import React from 'react'
import { render } from '@testing-library/react'

import DocumentsList from 'components/search-page/search-results/documents-list'

describe('Documents List', () => {
  it('should render correctly', () => {
    const documents = [
      {
        id: 1,
        type: 'pdf',
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
        type: 'csv',
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
})
