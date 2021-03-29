import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'

import './documents-list.scss'
import DocumentItem from 'components/common/items/document-item'

const DocumentsList = (props) => {
  const { items, highlighting, className, saveRecentItem, onItemClick } = props

  const itemsList = map(items, (document) => (
    <DocumentItem
      key={document.id}
      {...document}
      highlighting={highlighting}
      saveRecentItem={saveRecentItem}
      onItemClick={onItemClick}
    />
  ))

  return (
    <div className={cx('documents-list', className)}>
      <div className='documents-list-title'>Documents</div>
      <div className='list-items'>{itemsList}</div>
    </div>
  )
}

DocumentsList.propTypes = {
  items: PropTypes.array,
  highlighting: PropTypes.bool,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
  onItemClick: PropTypes.func,
}

DocumentsList.defaultProps = {
  items: [],
  saveRecentItem: noop,
  onItemClick: noop,
}

export default DocumentsList
