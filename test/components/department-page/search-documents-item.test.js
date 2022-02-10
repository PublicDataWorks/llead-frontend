import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'
import * as googleAnalytics from 'utils/google-analytics'

import SearchDocumentItem from 'components/department-page/featured-search/search-documents-item'
import { EVENT_TYPES } from 'constants/common'

describe('Search Documents Item', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeAction')
  })

  it('renders correctly with normal content', () => {
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
    const container = render(<SearchDocumentItem item={document} />)
    const { getByText } = container

    expect(getByText('csv').className).toEqual('document-item-type')
    expect(getByText('Dec 1, 2020').className).toEqual(
      'document-item-incident-date'
    )
    expect(getByText('Text content').className).toEqual(
      'document-item-text-content'
    )
  })

  it('renders correctly with highlight content', () => {
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
    const container = render(<SearchDocumentItem item={document} />)
    const { getByText, baseElement } = container

    expect(getByText('Dec 1, 2020').className).toEqual(
      'document-item-incident-date'
    )

    const documentItemHighlight = baseElement.getElementsByClassName(
      'document-item-text-content'
    )
    expect(documentItemHighlight[0].textContent).toEqual(
      '...Text content highlight...'
    )
  })

  it('clicks on document item', () => {
    const windowOpenStub = sinon.stub(window, 'open')

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
    const container = render(<SearchDocumentItem item={document} />)
    const { baseElement } = container

    const documentItem = baseElement.getElementsByClassName(
      'search-document-item'
    )[0]

    fireEvent.click(documentItem)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/document2.csv',
      '_blank',
      'noopener noreferrer'
    )

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.OPEN_DOCUMENT,
      data: { document_id: 2 },
    })
  })
})
