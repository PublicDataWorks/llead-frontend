import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import DocumentItem from 'components/common/items/document-item'

describe('Document item component', () => {
  it('should render correctly', () => {
    const props = {
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
})
