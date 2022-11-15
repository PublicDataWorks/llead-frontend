import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-id-swiper'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'
import upperFirst from 'lodash/upperFirst'
import omit from 'lodash/omit'

import './search-bar.scss'

const SearchBar = (props) => {
  const { sectionType, resultCount, switchSection, isDepartmentSearch } = props

  const swiperRef = useRef(null)
  const [swiperValue, setSwiperValue] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const settings = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    shouldSwiperUpdate: true,
    allowTouchMove: false,
  }

  const sectionMapping = {
    all: 0,
    agencies: 1,
    officers: 2,
    documents: 3,
    articles: 4,
  }

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
      setSwiperValue({
        isBeginning: swiperRef.current.swiper.isBeginning,
        isEnd: swiperRef.current.swiper.isEnd,
      })
    }
  }

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
      setSwiperValue({
        isBeginning: swiperRef.current.swiper.isBeginning,
        isEnd: swiperRef.current.swiper.isEnd,
      })
    }
  }

  const handleCardClick = (docType) => {
    switchSection(docType)
  }

  useEffect(() => {
    swiperRef.current.swiper.slideTo(
      sectionMapping[sectionType] - (isDepartmentSearch ? 2 : 0)
    )
    setSwiperValue({
      isBeginning: swiperRef.current.swiper.isBeginning,
      isEnd: swiperRef.current.swiper.isEnd,
    })
  }, [sectionType])

  const results = isDepartmentSearch
    ? omit(resultCount, ['all', 'agencies'])
    : resultCount

  const cards = map(results, (count, docType) => (
    <div
      key={docType}
      className={cx('swiper-slide', {
        'is-active': docType === sectionType,
      })}
      onClick={() => handleCardClick(docType)}
    >
      <div
        className={cx('title', {
          'is-active': docType === sectionType,
        })}
      >
        {upperFirst(docType)}
      </div>
      <div
        className={cx('count', {
          'is-active': docType === sectionType,
        })}
      >
        {count}
      </div>
    </div>
  ))

  return (
    <div className='search-bar-container'>
      <div
        role='button'
        className={cx('carousel-prev', {
          'carousel-disabled': swiperValue.isBeginning,
        })}
        onClick={goPrev}
      />
      <div className='swiper'>
        <Swiper {...settings} ref={swiperRef}>
          {cards}
        </Swiper>
      </div>
      <div
        role='button'
        className={cx('carousel-next', {
          'carousel-disabled': swiperValue.isEnd,
        })}
        onClick={goNext}
      />
    </div>
  )
}

SearchBar.propTypes = {
  sectionType: PropTypes.string,
  resultCount: PropTypes.object,
  switchSection: PropTypes.func,
  isDepartmentSearch: PropTypes.bool,
}

SearchBar.defaultProps = {
  sectionType: 'all',
  resultCount: {},
  switchSection: noop,
}

export default SearchBar
