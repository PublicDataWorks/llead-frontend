import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import DocumentCard from 'components/common/cards/document-card'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('Document card component', () => {
  it('should render correctly', () => {
    const props = {
      id: 1,
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

  it('should handle click on document card', () => {
    const windowOpenStub = sinon.stub(window, 'open')
    const saveRecentItemSpy = sinon.spy()
    const props = {
      id: 1,
      url: 'https://i.imgur.com/nHTFohI.csv',
      saveRecentItem: saveRecentItemSpy,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    const documentCard = baseElement.getElementsByClassName('document-card')[0]
    fireEvent.click(documentCard)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/nHTFohI.csv',
      '_blank',
      'noopener noreferrer'
    )
    expect(saveRecentItemSpy).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: 1,
    })
  })

  describe('Document preview pages', () => {
    it('should render document preview pages correctly', () => {
      const props = {
        id: 1,
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
        id: 1,
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
        id: 1,
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
