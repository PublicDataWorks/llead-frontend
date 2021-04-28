import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'

import './main-item.scss'

const MainEventItem = (props) => {
  const { kind, className } = props

  return (
    <div
      className={cx(
        'timeline-main-item',
        className,
        `timeline-${lowerCase(kind)}-item`
      )}
    >
      {capitalize(kind)} department
    </div>
  )
}

MainEventItem.propTypes = {
  kind: PropTypes.string,
  className: PropTypes.string,
}

MainEventItem.defaultProps = {}

export default React.memo(MainEventItem)
