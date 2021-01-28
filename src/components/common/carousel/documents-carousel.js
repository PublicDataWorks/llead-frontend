import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import DocumentCard from 'components/common/cards/document-card'
import './documents-carousel.scss'

const DocumentsCarousel = (props) => {
  const { fetchDocuments, documents } = props

  useEffect(() => {
    fetchDocuments()
  }, [])

  const items = map(documents, (document) => (
    <DocumentCard key={document.id} {...document} />
  ))

  return (
    <Carousel
      className='documents-carousel'
      title='Documents'
      sortedField='most recently added'
      items={items}
    />
  )
}

DocumentsCarousel.propTypes = {
  documents: PropTypes.array,
  fetchDocuments: PropTypes.func,
}

DocumentsCarousel.defaultProps = {
  documents: [],
  fetchDocuments: noop,
}

export default DocumentsCarousel
