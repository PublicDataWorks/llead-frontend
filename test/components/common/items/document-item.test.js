import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import DocumentItem from 'components/common/items/document-item'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('Document item component', () => {
  it('should render correctly', () => {
    const props = {
      id: 1,
      documentType: 'json',
      title: 'title 1',
      url: 'url 1',
      incidentDate: 'May 04, 2020',
      previewImageUrl: 'preview_image_url_1',
      pagesCount: 15,
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
          <DocumentItem {...props} />)
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

  it('should handle click on document item', () => {
    const windowOpenStub = sinon.stub(window, 'open')

    const saveRecentItemSpy = sinon.spy()
    const props = {
      id: 1,
      url: 'url 1',
      saveRecentItem: saveRecentItemSpy,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentItem {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    const documentItem = baseElement.getElementsByClassName('document-item')[0]
    fireEvent.click(documentItem)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'url 1',
      '_blank',
      'noopener noreferrer'
    )
    expect(saveRecentItemSpy).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: 1,
    })
  })
})
