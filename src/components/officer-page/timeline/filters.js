import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import './filters.scss'

const TimelineFilters = (props) => {
  const {
    timelineFilterGroups,
    className,
    changeFilterGroupKey,
    filterGroupKey,
  } = props

  return (
    <div className={cx('timeline-filters', className)}>
      {timelineFilterGroups.map((filterGroup) => (
        <div
          key={filterGroup.filterGroupKey}
          className={cx('filter-item', {
            'filter-item-selected':
              filterGroupKey === filterGroup.filterGroupKey,
          })}
          onClick={() => changeFilterGroupKey(filterGroup.filterGroupKey)}
        >
          {filterGroup.title}
          {filterGroup.count && ` (${filterGroup.count})`}
        </div>
      ))}
    </div>
  )
}
TimelineFilters.propTypes = {
  className: PropTypes.string,
  filterGroupKey: PropTypes.string,
  timelineFilterGroups: PropTypes.array,
  changeFilterGroupKey: PropTypes.func,
}

TimelineFilters.defaultProps = {
  timelineFilterGroups: [],
  changeFilterGroupKey: noop,
}

export default TimelineFilters
