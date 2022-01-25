import React from 'react'
import PropTypes from 'prop-types'
import { sanitize } from 'dompurify'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import './search-documents-items.scss'
import OuterLink from 'components/common/links/outer-link'
import { EVENT_TYPES, RECENT_ITEM_TYPES } from 'constants/common'
import { analyzeAction } from 'utils/google-analytics'

const SearchDocumentItem = (props) => {
  const { item: document, saveRecentItem } = props
  const {
    id,
    documentType,
    title,
    incidentDate,
    textContent,
    textContentHighlight,
    url,
  } = document

  const santinizedHTML = !isEmpty(textContentHighlight)
    ? sanitize(`...${textContentHighlight}...`)
    : sanitize(textContent)

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.DOCUMENT,
      id: id,
      data: document,
    })
    analyzeAction({
      type: EVENT_TYPES.OPEN_DOCUMENT,
      data: { document_id: id },
    })
  }

  return (
    <OuterLink
      className='search-document-item'
      href={url}
      onClick={handleClick}
    >
      <div className='document-item-title'>
        <div className='document-item-type'>{documentType}</div>
        <div className='document-item-name'>{title}</div>
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

SearchDocumentItem.propTypes = {
  item: PropTypes.object,
  saveRecentItem: PropTypes.func,
}

SearchDocumentItem.defaultProps = {
  item: {},
  saveRecentItem: noop,
}

export default SearchDocumentItem
