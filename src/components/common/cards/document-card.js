import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import noop from 'lodash/noop'
import cx from 'classnames'

import './document-card.scss'
import OuterLink from 'components/common/links/outer-link'
import CustomLink from 'components/common/links/custom-link'
import { departmentPath } from 'utils/paths'
import { RECENT_ITEM_TYPES } from 'constants/common'
import DocumentPreview from 'components/common/items/document-preview'

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
        <DocumentPreview
          previewImageUrl={previewImageUrl}
          pagesCount={pagesCount}
        />
        <div className='document-title'>{title}</div>
        <div className='document-subtitle'>{incidentDate}</div>
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
