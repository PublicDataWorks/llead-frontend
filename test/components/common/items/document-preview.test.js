import React from 'react'
import { render } from '@testing-library/react'

import DocumentPreview from 'components/common/items/document-preview'

describe('Document preview component', () => {
  it('renders normal document preview', () => {
    const props = {
      previewImageUrl: 'previewImageUrl',
      pagesCount: 5,
    }

    const container = render(<DocumentPreview {...props} />)
    const { baseElement } = container

    const documentPreviewContainer = baseElement.getElementsByClassName(
      'document-preview-container'
    )[0]

    expect(documentPreviewContainer.classList).not.toContain('small')
    const documentPreview = documentPreviewContainer.getElementsByClassName(
      'document-preview'
    )[0]
    expect(documentPreview.style['background-image']).toEqual(
      `url(previewImageUrl)`
    )

    const documentPreviewPages = documentPreviewContainer.getElementsByClassName(
      'document-preview-page'
    )
    expect(documentPreviewPages.length).toEqual(4)
  })

  it('renders small document preview', () => {
    const props = {
      previewImageUrl: 'previewImageUrl',
      pagesCount: 5,
      small: true,
    }

    const container = render(<DocumentPreview {...props} />)
    const { baseElement } = container

    const documentPreviewContainer = baseElement.getElementsByClassName(
      'document-preview-container'
    )[0]

    expect(documentPreviewContainer.classList).toContain('small')
    const documentPreview = documentPreviewContainer.getElementsByClassName(
      'document-preview'
    )[0]
    expect(documentPreview.style['background-image']).toEqual(
      `url(previewImageUrl)`
    )

    const documentPreviewPages = documentPreviewContainer.getElementsByClassName(
      'document-preview-page'
    )
    expect(documentPreviewPages.length).toEqual(4)
  })

  it('renders document preview with maximum 10 page preview', () => {
    const props = {
      previewImageUrl: 'previewImageUrl',
      pagesCount: 30,
    }

    const container = render(<DocumentPreview {...props} />)
    const { baseElement } = container

    const documentPreviewContainer = baseElement.getElementsByClassName(
      'document-preview-container'
    )[0]

    const documentPreview = documentPreviewContainer.getElementsByClassName(
      'document-preview'
    )[0]
    expect(documentPreview.style['background-image']).toEqual(
      `url(previewImageUrl)`
    )

    const documentPreviewPages = documentPreviewContainer.getElementsByClassName(
      'document-preview-page'
    )
    expect(documentPreviewPages.length).toEqual(9)
  })

  it('renders document preview withthout pagesCount', () => {
    const props = {
      previewImageUrl: 'previewImageUrl',
    }

    const container = render(<DocumentPreview {...props} />)
    const { baseElement } = container

    const documentPreviewContainer = baseElement.getElementsByClassName(
      'document-preview-container'
    )[0]

    const documentPreview = documentPreviewContainer.getElementsByClassName(
      'document-preview'
    )[0]
    expect(documentPreview.style['background-image']).toEqual(
      `url(previewImageUrl)`
    )

    const documentPreviewPages = documentPreviewContainer.getElementsByClassName(
      'document-preview-page'
    )
    expect(documentPreviewPages.length).toEqual(0)
  })
})
