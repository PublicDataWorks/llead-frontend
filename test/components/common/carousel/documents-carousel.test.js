import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'

import DocumentsCarousel from 'components/common/carousel/documents-carousel'

describe('Document carousel', () => {
  it('should render correctly', () => {
    const fetchDocumentsSpy = sinon.spy()
    const documents = [
      {
        id: 1,
        type: 'pdf',
        title: 'document-1',
        previewImageUrl: '',
        incidentDate: 'Nov 9, 2020',
        departments: [
          {
            id: 101,
            name: 'department-1',
          },
        ],
      },
      {
        id: 2,
        type: 'csv',
        title: 'document-2',
        previewImageUrl: 'previewImageUrl-2',
        incidentDate: 'Dec 1, 2020',
        departments: [
          {
            id: 102,
            name: 'department-2',
          },
        ],
      },
    ]
    const container = render(
      <DocumentsCarousel
        fetchDocuments={fetchDocumentsSpy}
        documents={documents}
      />
    )
    const { baseElement } = container

    expect(fetchDocumentsSpy).toHaveBeenCalled()
    expect(baseElement.textContent.includes('Documents')).toBe(true)
    expect(baseElement.textContent.includes('document-1')).toBe(true)
    expect(baseElement.textContent.includes('document-2')).toBe(true)
  })
})
