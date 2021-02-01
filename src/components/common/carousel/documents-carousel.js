import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import DocumentCard from 'components/common/cards/document-card'
import './documents-carousel.scss'

const DocumentsCarousel = (props) => {
  const { items, sortedField } = props

  const cards = map(items, (document) => (
    <DocumentCard key={document.id} {...document} />
  ))

  return (
    <Carousel
      className='documents-carousel'
      title='Documents'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

DocumentsCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
}

DocumentsCarousel.defaultProps = {
  items: [],
}

export default DocumentsCarousel
