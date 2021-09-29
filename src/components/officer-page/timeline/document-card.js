import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cx from 'classnames'

import './document-card.scss'
import OuterLink from 'components/common/links/outer-link'
import DocumentPreview from 'components/common/items/document-preview'
import { RECENT_ITEM_TYPES } from 'constants/common'
import { stringifyTotalItems } from 'utils/formatter'

const DocumentCard = (props) => {
  const {
    id,
    previewImageUrl,
    title,
    url,
    pagesCount,
    saveRecentItem,
    className,
    recentData,
  } = props

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: id,
      data: recentData,
    })
  }

  return (
    <OuterLink
      href={url}
      className={cx('timeline-document-card', className)}
      onClick={handleClick}
    >
      <div className='document-timeline-preview'>
        <DocumentPreview
          previewImageUrl={previewImageUrl}
          pagesCount={pagesCount}
          small
        />
      </div>
      <div className='document-timeline-content'>
        <div className='document-title'>{title}</div>
        {pagesCount && (
          <div className='document-subtitle'>
            {stringifyTotalItems(pagesCount, 'page')}
          </div>
        )}
      </div>
    </OuterLink>
  )
}

DocumentCard.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  previewImageUrl: PropTypes.string,
  pagesCount: PropTypes.number,
  saveRecentItem: PropTypes.func,
  className: PropTypes.string,
  recentData: PropTypes.object,
}

DocumentCard.defaultProps = {
  title: '',
  previewImageUrl: '',
  pagesCount: 0,
  departments: [],
  saveRecentItem: noop,
  className: '',
  recentData: {},
}

export default DocumentCard
