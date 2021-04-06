import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import times from 'lodash/times'
import noop from 'lodash/noop'
import cx from 'classnames'

import './document-card.scss'
import OuterLink from 'components/common/links/outer-link'
import CustomLink from 'components/common/links/custom-link'
import { departmentPath } from 'utils/paths'
import { RECENT_ITEM_TYPES } from 'constants/common'

const DocumentCard = (props) => {
  const {
    id,
    documentType,
    departments,
    previewImageUrl,
    title,
    url,
    incidentDate,
    pagesCount,
    saveRecentItem,
    className,
    recentData,
  } = props

  const departmentsList = map(
    departments,
    (department) => (
      <CustomLink
        to={departmentPath(department.id)}
        key={department.id}
        className='document-department-name'
      >
        {department.name}
      </CustomLink>
    ),
    []
  )

  const documentPreview = (previewImageUrl, pagesCount) => {
    const elementStyles = isEmpty(previewImageUrl)
      ? {}
      : { backgroundImage: `url(${previewImageUrl})` }

    const displayPages = Math.min(pagesCount || 1, 10) - 1

    return (
      <div className='document-preview-container'>
        <div className='document-preview' style={elementStyles} />
        {times(displayPages, (num) => (
          <div key={num} className='document-preview-page' />
        ))}
      </div>
    )
  }

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
      className={cx('document-card', className)}
      onClick={handleClick}
    >
      <div className='document-info'>
        <div className='document-type'>{documentType}</div>
        {documentPreview(previewImageUrl, pagesCount)}
        <div className='document-title'>{title}</div>
        <div className='document-incident-date'>{incidentDate}</div>
      </div>
      {!isEmpty(departmentsList) && (
        <div className='document-card-footer'>{departmentsList}</div>
      )}
    </OuterLink>
  )
}

DocumentCard.propTypes = {
  id: PropTypes.number.isRequired,
  documentType: PropTypes.string,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  previewImageUrl: PropTypes.string,
  pagesCount: PropTypes.number,
  departments: PropTypes.array,
  saveRecentItem: PropTypes.func,
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
