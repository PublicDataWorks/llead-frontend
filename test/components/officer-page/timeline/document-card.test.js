import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import DocumentCard from 'components/officer-page/timeline/document-card'
import DocumentPreview from 'components/common/items/document-preview'
import { RECENT_ITEM_TYPES } from 'constants/common'

const MockDocumentPreviewComponent = () => {
  return <div>Document Preview</div>
}
jest.mock('components/common/items/document-preview', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

beforeAll(() => {
  DocumentPreview.mockImplementation(MockDocumentPreviewComponent)
})

beforeEach(() => {
  DocumentPreview.mockClear()
})

describe('Timeline document card component', () => {
  it('renders correctly', () => {
    const mockSaveRecentItem = jest.fn()
    const props = {
      id: 1,
      documentType: 'csv',
      url: 'https://i.imgur.com/nHTFohI.csv',
      title: 'document',
      previewImageUrl: 'previewImageUrl',
      pagesCount: 3,
      className: 'custom-class-name',
      saveRecentItem: mockSaveRecentItem,
      recentData: { field: 'recent-data' },
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const documentCard = baseElement.getElementsByClassName(
      'timeline-document-card'
    )[0]

    expect(documentCard.classList.value).toContain('custom-class-name')
    expect(documentCard.textContent.includes(props.title)).toBe(true)
    expect(documentCard.textContent.includes('3 pages')).toBe(true)
    expect(DocumentPreview.mock.calls[0][0]).toStrictEqual({
      previewImageUrl: 'previewImageUrl',
      pagesCount: 3,
      small: true,
    })
  })

  it('renders single page count', () => {
    const mockSaveRecentItem = jest.fn()
    const props = {
      id: 1,
      documentType: 'csv',
      url: 'https://i.imgur.com/nHTFohI.csv',
      title: 'document',
      previewImageUrl: 'previewImageUrl',
      pagesCount: 1,
      className: 'custom-class-name',
      saveRecentItem: mockSaveRecentItem,
      recentData: { field: 'recent-data' },
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const documentCard = baseElement.getElementsByClassName(
      'timeline-document-card'
    )[0]

    expect(documentCard.classList.value).toContain('custom-class-name')
    expect(documentCard.textContent.includes(props.title)).toBe(true)
    expect(documentCard.textContent.includes('1 page')).toBe(true)
    expect(DocumentPreview.mock.calls[0][0]).toStrictEqual({
      previewImageUrl: 'previewImageUrl',
      pagesCount: 1,
      small: true,
    })
  })

  it('clicks on document card', () => {
    const windowOpenStub = sinon.stub(window, 'open')
    const mockSaveRecentItem = jest.fn()
    const documentData = {
      id: 1,
      documentType: 'csv',
      url: 'https://i.imgur.com/nHTFohI.csv',
      title: 'document',
      previewImageUrl: 'previewImageUrl',
      pagesCount: 3,
      className: 'custom-class-name',
      saveRecentItem: mockSaveRecentItem,
      recentData: { field: 'recent-data' },
    }
    const props = {
      ...documentData,
      saveRecentItem: mockSaveRecentItem,
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

    const documentCard = baseElement.getElementsByClassName(
      'timeline-document-card'
    )[0]
    fireEvent.click(documentCard)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/nHTFohI.csv',
      '_blank',
      'noopener noreferrer'
    )
    expect(mockSaveRecentItem).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: 1,
      data: documentData,
    })
  })
})
