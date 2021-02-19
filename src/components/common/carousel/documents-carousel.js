import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'

import Carousel from 'components/common/carousel'
import DocumentCard from 'components/common/cards/document-card'
import './documents-carousel.scss'

const DocumentsCarousel = (props) => {
  const { items, sortedField, className } = props

  const cards = map(items, (document) => (
    <DocumentCard key={document.id} {...document} />
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
}

DocumentsCarousel.defaultProps = {
  items: [],
  className: '',
}

export default DocumentsCarousel
