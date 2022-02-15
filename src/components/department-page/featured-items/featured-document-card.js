import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import './featured-document-card.scss'
import OuterLink from 'components/common/links/outer-link'
import { EVENT_TYPES, RECENT_ITEM_TYPES } from 'constants/common'
import DocumentPreview from 'components/common/items/document-preview'
import { analyzeAction } from 'utils/google-analytics'
import { formatDate } from 'utils/formatter'

const FeaturedDocumentCard = (props) => {
  const { item: document, className, saveRecentItem } = props

  const {
    id,
    title,
    isStarred,
    url,
    incidentDate,
    previewImageUrl,
    pagesCount,
  } = document

  const handleClick = () => {
    analyzeAction({
      type: EVENT_TYPES.OPEN_DOCUMENT,
      data: { document_id: id },
    })
    saveRecentItem({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: id,
      data: document,
    })
  }

  return (
    <OuterLink
      href={url}
      className={cx('featured-document-card', className)}
      onClick={handleClick}
    >
      {isStarred && <div className='star-corner' />}
      <div className='document-info'>
        <DocumentPreview
          previewImageUrl={previewImageUrl}
          pagesCount={pagesCount}
        />
        <div className='document-title'>{title}</div>
        <div className='document-subtitle'>{formatDate(incidentDate)}</div>
      </div>
    </OuterLink>
  )
}

FeaturedDocumentCard.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
}

FeaturedDocumentCard.defaultProps = {
  item: {},
  className: '',
  saveRecentItem: noop,
}

export default FeaturedDocumentCard
