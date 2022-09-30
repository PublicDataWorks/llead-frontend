import React from 'react'
import { render } from '@testing-library/react'

import Carousel from 'components/common/carousel'

describe('Carousel', () => {
  it('should render correctly', () => {
    const items = [
      <div key={1}>Department 1</div>,
      <div key={2}>Department 2</div>,
    ]
    const container = render(
      <Carousel
        className='departments-carousel'
        title='Departments Carousel'
        cards={items}
      />
    )
    const { baseElement } = container

    const title = baseElement.getElementsByClassName('carousel-title')[0]
      .textContent
    const carouselItems = baseElement.getElementsByClassName('swiper-slide')

    expect(title).toEqual('Departments Carousel')
    expect(carouselItems.length).toEqual(2)
    expect(carouselItems[0].textContent).toEqual('Department 1')
    expect(carouselItems[1].textContent).toEqual('Department 2')
  })
})
