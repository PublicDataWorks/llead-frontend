import React from 'react'
import { render } from '@testing-library/react'

import DocumentsItem from 'components/search-page/search-results/items/document-item'

describe('Documents Item', () => {
  it('should render correctly with normal content', () => {
    const document = {
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
        {
          id: 104,
          name: 'department-4',
        },
      ],
      textContent: 'Text content',
    }
    const container = render(<DocumentsItem {...document} />)
    const { baseElement } = container

    const documentItemTypes = baseElement.getElementsByClassName(
      'document-item-type'
    )
    const documentItemIncidentDates = baseElement.getElementsByClassName(
      'document-item-incident-date'
    )
    const documentItemDepartmentName = baseElement.getElementsByClassName(
      'document-item-department-name'
    )
    const documentItemHighlight = baseElement.getElementsByClassName(
      'document-item-text-content'
    )

    expect(documentItemTypes[0].textContent).toContain('csv')
    expect(documentItemIncidentDates[0].textContent).toContain('Dec 1, 2020')

    expect(documentItemDepartmentName[0].textContent).toEqual(
      'department-3,\u00a0department-4'
    )
    expect(documentItemHighlight[0].textContent).toEqual('Text content')
  })

  it('should render correctly with highlight content', () => {
    const document = {
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
        {
          id: 104,
          name: 'department-4',
        },
      ],
      textContent: 'Text content',
      textContentHighlight: 'Text content <em>highlight</em>',
    }
    const container = render(<DocumentsItem {...document} />)
    const { baseElement } = container
    const documentItemHighlight = baseElement.getElementsByClassName(
      'document-item-text-content'
    )

    expect(documentItemHighlight[0].textContent).toEqual(
      '...Text content highlight...'
    )
  })
})
