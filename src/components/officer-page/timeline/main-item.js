import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './main-item.scss'
import { TIMELINE_KINDS } from 'constants/common'

const EVENT_KINDS_MAPPING = {
  [TIMELINE_KINDS.JOINED]: {
    description: 'Joined department',
    className: 'timeline-joined-item',
  },
  [TIMELINE_KINDS.LEFT]: {
    description: 'Left from department',
    className: 'timeline-left-item',
  },
}

const MainEventItem = (props) => {
  const { kind, className } = props

  const event = EVENT_KINDS_MAPPING[kind]

  return (
    <div className={cx('timeline-main-item', className, event.className)}>
      {event.description}
    </div>
  )
}

MainEventItem.propTypes = {
  kind: PropTypes.string,
  className: PropTypes.string,
}

MainEventItem.defaultProps = {}

export default React.memo(MainEventItem)
