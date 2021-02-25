import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import DocumentCard from 'components/common/cards/document-card'

describe('Document card component', () => {
  it('should render correctly', () => {
    const props = {
      documentType: 'csv',
      url: 'https://i.imgur.com/nHTFohI.csv',
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

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.textContent.includes(props.documentType)).toBe(true)
    expect(baseElement.textContent.includes(props.title)).toBe(true)
    expect(baseElement.textContent.includes(props.incidentDate)).toBe(true)
    expect(baseElement.textContent.includes(props.departments[0].name)).toBe(
      true
    )
  })

  describe('Document preview pages', () => {
    it('should render document preview pages correctly', () => {
      const props = {
        documentType: 'csv',
        url: 'https://i.imgur.com/nHTFohI.csv',
        title: 'document-2',
        pagesCount: 4,
      }

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <DocumentCard {...props} />)
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(3)
    })

    it('should render document preview pages when pagesCount is zero', () => {
      const props = {
        documentType: 'csv',
        url: 'https://i.imgur.com/nHTFohI.csv',
        title: 'document-2',
        pagesCount: 0,
      }

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <DocumentCard {...props} />)
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(0)
    })

    it('should render document preview pages when pagesCount > 10', () => {
      const props = {
        documentType: 'csv',
        url: 'https://i.imgur.com/nHTFohI.csv',
        title: 'document-2',
        pagesCount: 16,
      }

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <DocumentCard {...props} />)
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(9)
    })
  })
})