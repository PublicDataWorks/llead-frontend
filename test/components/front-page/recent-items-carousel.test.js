import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import RecentItemsCarousel from 'components/front-page/recent-items-carousel'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('Recent Items carousel', () => {
  it('should render correctly', () => {
    const recentItems = [
      {
        id: 1,
        type: RECENT_ITEM_TYPES.DOCUMENT,
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
        id: 1,
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        name: 'Department name',
        city: 'city-1',
        parish: 'parish-1',
      },
      {
        id: 1,
        type: RECENT_ITEM_TYPES.OFFICER,
        name: 'Mark Carlson',
        badges: ['12435', '612'],
        department: {
          id: 9,
          name: 'Baton Rouge Department 1',
        },
      },
    ]
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <RecentItemsCarousel items={recentItems} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const carouselItems = baseElement.getElementsByClassName('swiper-slide')

    expect(baseElement.textContent.includes('Recent activity')).toBe(true)
    expect(carouselItems[0].textContent.includes('document-1')).toBe(true)
    expect(carouselItems[1].textContent.includes('Department name')).toBe(true)
    expect(carouselItems[2].textContent.includes('Mark Carlson')).toBe(true)
  })
})
