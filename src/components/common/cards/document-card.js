import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import times from 'lodash/times'

import './document-card.scss'
import OuterLink from 'components/common/links/outer-link'
import CustomLink from 'components/common/links/custom-link'
import { departmentPath } from 'utils/paths'

const DocumentCard = (props) => {
  const {
    documentType,
    departments,
    previewImageUrl,
    title,
    url,
    incidentDate,
    pagesCount,
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

  return (
    <OuterLink href={url} className='document-card'>
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
  documentType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  previewImageUrl: PropTypes.string,
  pagesCount: PropTypes.number,
  departments: PropTypes.array,
}

DocumentCard.defaultProps = {
  documentType: '',
  title: '',
  incidentDate: '',
  previewImageUrl: '',
  pagesCount: 0,
  departments: [],
}

export default DocumentCard
