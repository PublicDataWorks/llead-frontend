import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './change-item.scss'

const RankChangeItem = (props) => {
  const { rankDesc, className } = props

  return (
    <div className={cx('timeline-change-item', className)}>
      Changed rank to
      <span className='change-item-value'> {rankDesc}</span>
    </div>
  )
}

RankChangeItem.propTypes = {
  className: PropTypes.string,
  rankDesc: PropTypes.string,
}

RankChangeItem.defaultProps = {}

export default RankChangeItem
