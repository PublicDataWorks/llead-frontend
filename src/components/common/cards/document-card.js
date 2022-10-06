import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'
import cx from 'classnames'

import './document-card.scss'
import OuterLink from 'components/common/links/outer-link'
import CustomLink from 'components/common/links/custom-link'
import { departmentPath } from 'utils/paths'
import { CARD_TYPES, EVENT_TYPES, RECENT_ITEM_TYPES } from 'constants/common'
import DocumentPreview from 'components/common/items/document-preview'
import { analyzeAction } from 'utils/google-analytics'

const DocumentCard = (props) => {
  const {
    isLoggedIn,
    id,
    departments,
    previewImageUrl,
    title,
    url,
    incidentDate,
    pagesCount,
    removeRecentItem,
    saveRecentItem,
    className,
    recentData,
  } = props

  const handleClick = () => {
    analyzeAction({
      type: EVENT_TYPES.OPEN_DOCUMENT,
      data: { document_id: id },
    })
    saveRecentItem({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: id,
      data: recentData,
    })
  }

  return (
    <OuterLink
      href={url}
      isLoggedIn={isLoggedIn}
      className={cx('document-card', className)}
      onClick={handleClick}
      removeRecentItem={removeRecentItem}
      removeData={{
        id,
        type: RECENT_ITEM_TYPES.DOCUMENT,
      }}
    >
      <div className='document-info'>
        <div className='document-type'>{CARD_TYPES.DOCUMENT}</div>
        <DocumentPreview
          previewImageUrl={previewImageUrl}
          pagesCount={pagesCount}
        />
        <div className='document-title'>{title}</div>
        <div className='document-subtitle'>{incidentDate}</div>
      </div>
      <div className='document-card-footer'>
        {!isEmpty(departments) && (
          <CustomLink
            to={departmentPath(departments[0].id)}
            isLoggedIn={isLoggedIn}
            className='document-department-name'
          >
            {departments[0].name}
          </CustomLink>
        )}
        {departments.length > 1 && (
          <div className='document-department-name'>
            +{departments.length - 1} more
          </div>
        )}
      </div>
    </OuterLink>
  )
}

DocumentCard.propTypes = {
  isLoggedIn: PropTypes.bool,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  previewImageUrl: PropTypes.string,
  pagesCount: PropTypes.number,
  departments: PropTypes.array,
  saveRecentItem: PropTypes.func,
  removeRecentItem: PropTypes.func,
  className: PropTypes.string,
  recentData: PropTypes.object,
}

DocumentCard.defaultProps = {
  title: '',
  incidentDate: '',
  previewImageUrl: '',
  pagesCount: 0,
  departments: [],
  saveRecentItem: noop,
  className: '',
  recentData: {},
}

export default DocumentCard
