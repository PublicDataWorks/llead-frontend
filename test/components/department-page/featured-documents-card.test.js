import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import { EVENT_TYPES, RECENT_ITEM_TYPES } from 'constants/common'
import * as googleAnalytics from 'utils/google-analytics'
import FeaturedDocumentCard from 'components/department-page/featured-items/featured-document-card'

describe('Document card component', () => {
  let windowOpenStub

  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeAction')
    windowOpenStub = sinon.stub(window, 'open')
  })

  it('renders correctly', () => {
    const props = {
      item: {
        id: 15248,
        title: 'Appeal hearing: Eric Curlee on 2020-3-12',
        url: 'https://i.imgur.com/nHTFohI.csv',
        isStarred: true,
        incidentDate: '2020-03-12',
        previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
        pagesCount: 5,
      },
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedDocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container
    const featuredDocumentCard = baseElement.getElementsByClassName(
      'featured-document-card'
    )[0]

    expect(featuredDocumentCard.classList.value).toContain('custom-class-name')
    expect(
      featuredDocumentCard.getElementsByClassName('star-corner')[0].classList
        .length
    ).toEqual(1)
    expect(
      getByText('Appeal hearing: Eric Curlee on 2020-3-12').className
    ).toEqual('document-title')
    expect(getByText('Mar 12, 2020').className).toEqual('document-subtitle')
  })

  it('handles click on featured document card', () => {
    const props = {
      item: { id: 1, url: 'https://i.imgur.com/nHTFohI.csv' },
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedDocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )

    const { baseElement } = container

    const featuredDocumentCard = baseElement.getElementsByClassName(
      'featured-document-card'
    )[0]
    fireEvent.click(featuredDocumentCard)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/nHTFohI.csv',
      '_blank',
      'noopener noreferrer'
    )
  })

  it('analyzes click on featured document card', () => {
    const saveRecentItemSpy = sinon.spy()
    const documentData = { id: 1, url: 'https://i.imgur.com/nHTFohI.csv' }
    const props = {
      item: documentData,
      saveRecentItem: saveRecentItemSpy
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedDocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    const featuredDocumentCard = baseElement.getElementsByClassName(
      'featured-document-card'
    )[0]
    fireEvent.click(featuredDocumentCard)

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.OPEN_DOCUMENT,
      data: { document_id: 1 },
    })
    expect(saveRecentItemSpy).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: 1,
      data: documentData,
    })
  })

  describe('Document preview pages', () => {
    it('should render document preview pages correctly', () => {
      const props = {
        item: {
          id: 1,
          url: 'https://i.imgur.com/nHTFohI.csv',
          previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
          title: 'document-2',
          pagesCount: 4,
        },
        className: 'custom-class-name',
      }

      const container = render(
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FeaturedDocumentCard {...props} />)
          </Route>
        </MemoryRouter>
      )
      const { baseElement } = container

      const documentPreviewPages = baseElement.getElementsByClassName(
        'document-preview-page'
      )
      expect(documentPreviewPages.length).toEqual(3)
    })
  })

  it('should render document preview pages when pagesCount is zero', () => {
    const props = {
      item: {
        id: 1,
        url: 'https://i.imgur.com/nHTFohI.csv',
        previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
        title: 'document-2',
        pagesCount: 0,
      },
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedDocumentCard {...props} />)
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
      item: {
        id: 1,
        url: 'https://i.imgur.com/nHTFohI.csv',
        previewImageUrl: 'https://i.imgur.com/nHTFohI.csv',
        title: 'document-2',
        pagesCount: 16,
      },
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedDocumentCard {...props} />)
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
