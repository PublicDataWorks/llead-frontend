import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import times from 'lodash/times'

import './document-card.scss'

const DocumentCard = (props) => {
  const {
    type,
    departments,
    previewImageUrl,
    title,
    url,
    incidentDate,
    pagesCount,
  } = props

  const departmentsView = map(
    departments,
    (department) => (
      <div key={department.id} className='document-department-name'>
        {department.name}
      </div>
    ),
    []
  )

  const documentPreview = (previewImageUrl, pagesCount, url) => {
    const elementStyles = isEmpty(previewImageUrl)
      ? {}
      : { backgroundImage: `url(${previewImageUrl})` }

    const displayPages = Math.min(pagesCount || 1, 10) - 1

    return (
      <a className='document-preview-container' href={ url } rel='noopener noreferrer' target='_blank'>
        <div className='document-preview' style={elementStyles} />
        {times(displayPages, (num) => (
          <div key={num} className='document-preview-page' />
        ))}
      </a>
    )
  }

  return (
    <div className='document-card'>
      <div className='document-info'>
        <div className='document-type'>{type}</div>
        {documentPreview(previewImageUrl, pagesCount, url)}
        <div className='document-title'>{title}</div>
        <div className='document-incident-date'>{incidentDate}</div>
      </div>
      <div className='document-card-footer'>{departmentsView}</div>
    </div>
  )
}

DocumentCard.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  previewImageUrl: PropTypes.string,
  pagesCount: PropTypes.number,
  departments: PropTypes.array,
}

DocumentCard.defaultProps = {
  type: '',
  title: '',
  incidentDate: '',
  previewImageUrl: '',
  pagesCount: 0,
  departments: [],
}

export default DocumentCard
