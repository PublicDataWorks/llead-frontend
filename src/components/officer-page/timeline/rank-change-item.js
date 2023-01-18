import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './change-item.scss'

const RankChangeItem = (props) => {
  const { rank, className } = props

  return (
    <div className={cx('timeline-change-item', 'rank-change-item', className)}>
      Changed rank to
      <span className='change-item-value'> {rank}</span>
    </div>
  )
}

RankChangeItem.propTypes = {
  className: PropTypes.string,
  rank: PropTypes.string,
}

RankChangeItem.defaultProps = {}

export default RankChangeItem
