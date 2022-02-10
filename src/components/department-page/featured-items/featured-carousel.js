import React from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-id-swiper'
import 'swiper/swiper.scss'

import './featured-carousel.scss'

const FeaturedCarousel = (props) => {
  const { cards } = props

  const settings = {
    spaceBetween: 8,
    slidesPerView: 'auto',
    shouldSwiperUpdate: true,
    navigation: {
      nextEl: '.carousel-next',
      prevEl: '.carousel-prev',
    },
    mousewheel: {
      forceToAxis: true,
    },
  }

  return (
    <div className='featured-swiper'>
      <Swiper {...settings}>{cards}</Swiper>
    </div>
  )
}

FeaturedCarousel.propTypes = {
  cards: PropTypes.array,
}

FeaturedCarousel.defaultProps = {
  cards: [],
}

export default FeaturedCarousel
