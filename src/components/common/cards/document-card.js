import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import './document-card.scss'

const DocumentCard = (props) => {
  const {
    type,
    departments,
    previewImageUrl,
    title,
    incidentDate,
    pagesCount,
  } = props
  const elementStyles = isEmpty(previewImageUrl)
    ? {}
    : { backgroundImage: `url(${previewImageUrl})` }

  const departmentsView = map(
    departments,
    (department) => (
      <div key={department.id} className='document-department-name'>
        {department.name}
      </div>
    ),
    []
  )

  // const pagesStyle = pagesCount >= 3 ? 3 : pagesCount

  return (
    <div className='document-card'>
      <div className='document-info'>
        <div className='document-type'>{type}</div>
        <div className='document-preview' style={elementStyles} />
        <div className='document-title'>{title}</div>
        <div className='document-incident-date'>{incidentDate}</div>
      </div>
      <div className='document-card-footer'>{departmentsView}</div>
    </div>
  )
}

DocumentCard.propTypes = {
  type: PropTypes.string.isRequired,
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
