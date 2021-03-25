import React from 'react'
import { render } from '@testing-library/react'

import DepartmentsCarousel from 'components/common/carousel/departments-carousel'

describe('Department carousel', () => {
  it('should render correctly', () => {
    const departments = [
      {
        id: 1,
        name: 'card-1',
        city: 'city-1',
        parish: 'parish-1',
        locationMapUrl: '',
      },
      {
        id: 2,
        name: 'card-2',
        city: 'city-2',
        parish: 'parish-2',
        locationMapUrl: 'locationMapUrl',
      },
    ]
    const container = render(<DepartmentsCarousel items={departments} />)
    const { baseElement } = container
    const carouselItems = baseElement.getElementsByClassName('swiper-slide')

    expect(baseElement.textContent.includes('Departments')).toBe(true)
    expect(carouselItems[0].textContent.includes('card-1')).toBe(true)
    expect(carouselItems[1].textContent.includes('card-2')).toBe(true)
  })
})
