import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import times from 'lodash/times'

import './document-preview.scss'
import documentThumbnail from 'assets/icons/document-thumbnail.svg'

const DocumentPreview = (props) => {
  const { previewImageUrl, pagesCount, small } = props

  const backgroundImage = previewImageUrl || documentThumbnail
  const elementStyles = { backgroundImage: `url(${backgroundImage})` }

  const displayPages = Math.min(pagesCount || 1, 10) - 1

  return (
    <div className={cx('document-preview-container', { small })}>
      <div className='document-preview' style={elementStyles} />
      {times(displayPages, (num) => (
        <div key={num} className='document-preview-page' />
      ))}
    </div>
  )
}

DocumentPreview.propTypes = {
  previewImageUrl: PropTypes.string,
  pagesCount: PropTypes.number,
  small: PropTypes.bool,
}

export default DocumentPreview
