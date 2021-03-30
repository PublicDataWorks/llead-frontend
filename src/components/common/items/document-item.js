import React from 'react'
import PropTypes from 'prop-types'
import { sanitize } from 'dompurify'
import isEmpty from 'lodash/isEmpty'

import './document-item.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'
import OuterLink from 'components/common/links/outer-link'

const DocumentItem = (props) => {
  const {
    documentType,
    departments,
    title,
    incidentDate,
    textContent,
    textContentHighlight,
    url,
  } = props

  const items = departments.map((department) => (
    <span key={department.id}>{department.name}</span>
  ))

  const santinizedHTML = !isEmpty(textContentHighlight)
    ? sanitize(`...${textContentHighlight}...`)
    : sanitize(textContent)

  return (
    <OuterLink className='document-item' href={url}>
      <div className='document-item-title'>
        <div className='document-item-type'>{documentType}</div>
        <div className='document-item-name'>{title}</div>
        <div className='document-item-department-name'>
          <ArrayWithSeparator items={items} separator=',&nbsp;' />
        </div>
      </div>
      <div className='document-item-subtitle'>
        {incidentDate && (
          <div className='document-item-incident-date'>{incidentDate}</div>
        )}
        <div
          className='document-item-text-content'
          dangerouslySetInnerHTML={{
            __html: santinizedHTML,
          }}
        />
      </div>
    </OuterLink>
  )
}

DocumentItem.propTypes = {
  documentType: PropTypes.string.isRequired,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  departments: PropTypes.array,
  url: PropTypes.string,
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
