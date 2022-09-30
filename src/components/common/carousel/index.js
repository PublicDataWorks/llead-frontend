import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Swiper from 'react-id-swiper'

import './carousel.scss'

const Carousel = (props) => {
  const { className, title, cards } = props

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
    <div className={cx('carousel-container', className)}>
      <div className='carousel-title-container'>
        <div className='carousel-title'>{title}</div>
      </div>
      {<Swiper {...settings}>{cards}</Swiper>}
    </div>
  )
}

Carousel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  cards: PropTypes.array,
}

Carousel.defaultProps = {
  className: '',
  title: '',
  cards: [],
}

export default Carousel
