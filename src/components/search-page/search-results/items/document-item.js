import React from 'react'
import PropTypes from 'prop-types'
import { sanitize } from 'dompurify'
import isEmpty from 'lodash/isEmpty'

import './document-item.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'

const DocumentItem = (props) => {
  const {
    documentType,
    departments,
    title,
    incidentDate,
    textContent,
    textContentHighlight,
  } = props

  const items = departments.map((department) => (
    <span key={department.id}>{department.name}</span>
  ))

  const santinizedHTML = !isEmpty(textContentHighlight)
    ? sanitize(`...${textContentHighlight}...`)
    : sanitize(textContent)

  return (
    <div className='document-item'>
      <div className='document-item-title'>
        <span className='document-item-type'>{documentType}</span>
        <span className='document-item-title'>{title}</span>
        <span className='document-item-department-name'>
          <ArrayWithSeparator items={items} separator=',&nbsp;' />
        </span>
      </div>
      <div className='document-item-subtitle'>
        <div className='document-item-incident-date'>{incidentDate}</div>
        <div
          className='document-item-text-content'
          dangerouslySetInnerHTML={{
            __html: santinizedHTML,
          }}
        />
      </div>
    </div>
  )
}

DocumentItem.propTypes = {
  documentType: PropTypes.string.isRequired,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  departments: PropTypes.array,
  textContent: PropTypes.string,
  textContentHighlight: PropTypes.string,
}

DocumentItem.defaultProps = {
  documentType: '',
  title: '',
  incidentDate: '',
  departments: [],
  textContent: '',
  textContentHighlight: '',
}

export default DocumentItem
