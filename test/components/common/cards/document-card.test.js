import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import DocumentCard from 'components/common/cards/document-card'
import { CARD_TYPES, EVENT_TYPES, RECENT_ITEM_TYPES } from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'

describe('Document card component', () => {
  let windowOpenStub

  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeAction')
    windowOpenStub = sinon.stub(window, 'open')
  })

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
      className: 'custom-class-name',
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

    expect(documentCard.classList.value).toContain('custom-class-name')
    expect(documentCard.textContent.includes(CARD_TYPES.DOCUMENT)).toBe(true)
    expect(documentCard.textContent.includes(props.title)).toBe(true)
    expect(documentCard.textContent.includes(props.incidentDate)).toBe(true)
    expect(documentCard.textContent.includes(props.departments[0].name)).toBe(
      true
    )
  })

  it('should remove correctly', () => {
    const removeRecentItemStub = sinon.stub()
    const props = {
      isLoggedIn: true,
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
      className: 'custom-class-name',
      removeRecentItem: removeRecentItemStub,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const removeIconItem = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeIconItem)

    expect(removeRecentItemStub).toHaveBeenCalledWith({
      id: 1,
      type: 'DOCUMENT',
    })
  })

  it('does not show remove button if anonymous user', () => {
    const removeRecentItemStub = sinon.stub()
    const props = {
      isLoggedIn: false,
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
      className: 'custom-class-name',
      removeRecentItem: removeRecentItemStub,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('remove-btn').length).toEqual(0)
  })

  it('should handle click on document card', () => {
    const saveRecentItemSpy = sinon.spy()
    const documentData = {
      id: 1,
      url: 'https://i.imgur.com/nHTFohI.csv',
    }
    const props = {
      ...documentData,
      saveRecentItem: saveRecentItemSpy,
      recentData: documentData,
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
      data: documentData,
    })
  })

  it('should analyze click on document card', () => {
    const saveRecentItemSpy = sinon.spy()
    const documentData = {
      id: 1,
      url: 'https://i.imgur.com/nHTFohI.csv',
    }
    const props = {
      ...documentData,
      saveRecentItem: saveRecentItemSpy,
      recentData: documentData,
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

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.OPEN_DOCUMENT,
      data: { document_id: 1 },
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
