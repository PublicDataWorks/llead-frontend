import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import './documents-list.scss'
import DocumentItem from 'components/common/items/document-item'

const DocumentsList = (props) => {
  const { items, highlighting } = props

  const itemsList = map(items, (document) => (
    <DocumentItem key={document.id} {...document} highlighting={highlighting} />
  ))

  return (
    <div className='documents-list'>
      <div className='documents-list-title'>Documents</div>
      <div className='list-items'>{map(itemsList, (item) => item)}</div>
    </div>
  )
}

DocumentsList.propTypes = {
  items: PropTypes.array,
  highlighting: PropTypes.bool,
}

DocumentsList.defaultProps = {
  items: [],
}

export default DocumentsList
