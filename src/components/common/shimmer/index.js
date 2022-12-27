import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import times from 'lodash/times'

import './shimmer.scss'
import { SHIMMER_ITEM_COUNT } from 'constants/common'

const Shimmer = (props) => {
  const { className } = props

  return (
    <div className={cx('shimmer-container', className)}>
      {times(SHIMMER_ITEM_COUNT, (index) => (
        <div key={index} className='shimmer-item'>
          <div className='line shimmer' />
          <div className='line shimmer' />
        </div>
      ))}
    </div>
  )
}

Shimmer.propTypes = {
  className: PropTypes.string,
}

Shimmer.defaultProps = {
  className: '',
}

export default Shimmer
