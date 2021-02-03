import React from 'react'
import { render } from '@testing-library/react'

import DocumentCard from 'components/common/cards/document-card'

describe('Document card component', () => {
  it('should render correctly', () => {
    const props = {
      type: 'csv',
      title: 'document-2',
      previewImageUrl: 'previewImageUrl-2',
      incidentDate: 'Dec 1, 2020',
      departments: [
        {
          id: 10,
          name: 'department-2',
        },
      ],
    }

    const container = render(<DocumentCard {...props} />)
    const { baseElement } = container

    expect(baseElement.textContent.includes(props.type)).toBe(true)
    expect(baseElement.textContent.includes(props.title)).toBe(true)
    expect(baseElement.textContent.includes(props.incidentDate)).toBe(true)
    expect(baseElement.textContent.includes(props.departments[0].name)).toBe(
      true
    )
  })

  describe('Document preview pages', () => {
    it('should render document preview pages correctly', () => {
      const props = {
        title: 'document-2',
        pagesCount: 4,
      }

      const container = render(<DocumentCard {...props} />)
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(3)
    })

    it('should render document preview pages when pagesCount is zero', () => {
      const props = {
        title: 'document-2',
        pagesCount: 0,
      }

      const container = render(<DocumentCard {...props} />)
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(0)
    })

    it('should render document preview pages when pagesCount > 10', () => {
      const props = {
        title: 'document-2',
        pagesCount: 16,
      }

      const container = render(<DocumentCard {...props} />)
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(9)
    })
  })
})
