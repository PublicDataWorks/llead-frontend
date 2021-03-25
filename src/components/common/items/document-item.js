import React from 'react'
import PropTypes from 'prop-types'
import { sanitize } from 'dompurify'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import './document-item.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'
import OuterLink from 'components/common/links/outer-link'
import { RECENT_ITEM_TYPES } from 'constants/common'

const DocumentItem = (props) => {
  const {
    id,
    documentType,
    departments,
    title,
    incidentDate,
    textContent,
    textContentHighlight,
    url,
    highlighting,
    saveRecentItem,
    recentData,
  } = props

  const items = departments.map((department) => (
    <span key={department.id}>{department.name}</span>
  ))

  const santinizedHTML = !isEmpty(textContentHighlight)
    ? sanitize(`...${textContentHighlight}...`)
    : sanitize(textContent)

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: id,
      data: recentData,
    })
  }

  return (
    <OuterLink className='document-item' href={url} onClick={handleClick}>
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
        {(highlighting || !incidentDate) && (
          <div
            className='document-item-text-content'
            dangerouslySetInnerHTML={{
              __html: santinizedHTML,
            }}
          />
        )}
      </div>
    </OuterLink>
  )
}

DocumentItem.propTypes = {
  id: PropTypes.number.isRequired,
  documentType: PropTypes.string,
  title: PropTypes.string,
  incidentDate: PropTypes.string,
  departments: PropTypes.array,
  url: PropTypes.string,
  textContent: PropTypes.string,
  textContentHighlight: PropTypes.string,
  highlighting: PropTypes.bool,
  saveRecentItem: PropTypes.func,
  recentData: PropTypes.object,
}

DocumentItem.defaultProps = {
  title: '',
  incidentDate: '',
  departments: [],
  textContent: '',
  textContentHighlight: '',
  saveRecentItem: noop,
  recentData: {},
}

export default DocumentItem
