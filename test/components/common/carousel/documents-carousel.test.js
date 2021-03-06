import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import DocumentsCarousel from 'components/common/carousel/documents-carousel'

describe('Document carousel', () => {
  it('should render correctly', () => {
    const documents = [
      {
        id: 1,
        documentType: 'pdf',
        url: 'https://i.imgur.com/document1.pdf',
        title: 'document-1',
        previewImageUrl: '',
        incidentDate: 'Nov 9, 2020',
        departments: [
          {
            id: 101,
            name: 'department-1',
          },
        ],
      },
      {
        id: 2,
        documentType: 'csv',
        url: 'https://i.imgur.com/document2.csv',
        title: 'document-2',
        previewImageUrl: 'previewImageUrl-2',
        incidentDate: 'Dec 1, 2020',
        departments: [
          {
            id: 102,
            name: 'department-2',
          },
        ],
      },
    ]
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <DocumentsCarousel items={documents} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const carouselItems = baseElement.getElementsByClassName('swiper-slide')

    expect(baseElement.textContent.includes('Documents')).toBe(true)
    expect(carouselItems[0].textContent.includes('document-1')).toBe(true)
    expect(carouselItems[1].textContent.includes('document-2')).toBe(true)
  })
})
