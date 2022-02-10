import React from 'react'
import { render } from '@testing-library/react'

import FeaturedCarousel from 'components/department-page/featured-items/featured-carousel'

describe('Featured Carousel', () => {
  it('renders correctly', () => {
    const items = [<div key={1}>Item 1</div>, <div key={2}>Item 2</div>]
    const container = render(<FeaturedCarousel cards={items} />)
    const { baseElement } = container

    const carouselItems = baseElement.getElementsByClassName('swiper-slide')

    expect(carouselItems.length).toEqual(2)
    expect(carouselItems[0].textContent).toEqual('Item 1')
    expect(carouselItems[1].textContent).toEqual('Item 2')
  })
})
