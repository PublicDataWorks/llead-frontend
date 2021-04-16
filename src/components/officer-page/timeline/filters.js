import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './filters.scss'

const TimelineFilters = (props) => {
  const {
    timelineFilterGroups,
    className,
    changeFilterGroupKey,
    filterGroupKey,
    hideActionsPanel,
  } = props

  const handleOnFilterGroupClick = (filterGroupKey) => {
    changeFilterGroupKey(filterGroupKey)
    hideActionsPanel()
  }

  return (
    !isEmpty(timelineFilterGroups) && (
      <div className={cx('timeline-filters', className)}>
        {timelineFilterGroups.map((filterGroup) => (
          <div
            key={filterGroup.filterGroupKey}
            className={cx('filter-item', {
              'filter-item-selected':
                filterGroupKey === filterGroup.filterGroupKey,
            })}
            onClick={() => handleOnFilterGroupClick(filterGroup.filterGroupKey)}
          >
            {filterGroup.title}
            {filterGroup.count && ` (${filterGroup.count})`}
          </div>
        ))}
      </div>
    )
  )
}
TimelineFilters.propTypes = {
  className: PropTypes.string,
  filterGroupKey: PropTypes.string,
  timelineFilterGroups: PropTypes.array,
  changeFilterGroupKey: PropTypes.func,
  hideActionsPanel: PropTypes.func,
}

TimelineFilters.defaultProps = {
  timelineFilterGroups: [],
  changeFilterGroupKey: noop,
  hideActionsPanel: noop,
}

export default TimelineFilters
