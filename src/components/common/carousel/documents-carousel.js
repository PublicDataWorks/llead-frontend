import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'

import Carousel from 'components/common/carousel'
import DocumentCard from 'components/common/cards/document-card'

const DocumentsCarousel = (props) => {
  const { items, sortedField, className, saveRecentItem } = props

  const cards = map(items, (document) => (
    <DocumentCard
      key={document.id}
      className='swiper-slide'
      {...document}
      recentData={document}
      saveRecentItem={saveRecentItem}
    />
  ))

  return (
    <Carousel
      className={cx('documents-carousel', className)}
      title='Documents'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

DocumentsCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
}

DocumentsCarousel.defaultProps = {
  items: [],
  className: '',
  saveRecentItem: noop,
}

export default DocumentsCarousel
