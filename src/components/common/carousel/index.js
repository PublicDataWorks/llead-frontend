import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Swiper from 'react-id-swiper'
import 'swiper/swiper.scss'

import './carousel.scss'

const Carousel = (props) => {
  const { className, title, sortedField, cards } = props

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
        {sortedField && (
          <div className='carousel-sorted-info'>
            Sorted by&nbsp;
            <span className='sorted-by'>{sortedField}</span>
          </div>
        )}
      </div>
      {<Swiper {...settings}>{cards}</Swiper>}
    </div>
  )
}

Carousel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  sortedField: PropTypes.string,
  cards: PropTypes.array,
}

Carousel.defaultProps = {
  className: '',
  title: '',
  sortedField: '',
  cards: [],
}

export default Carousel
