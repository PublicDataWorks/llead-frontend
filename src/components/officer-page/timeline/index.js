import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'
import cx from 'classnames'
import qs from 'qs'
import get from 'lodash/get'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './timeline.scss'
import ComplaintItem from './complaint-item'
import MainItem from './main-item'
import DocumentCard from './document-card'
import SalaryChangeItem from './salary-change-item'
import RankChangeItem from './rank-change-item'
import TimelineFilters from './filters'
import { ANIMATION_DURATION, TIMELINE_KINDS } from 'constants/common'

const TIMELINE_COMPONENTS_MAPPING = {
  [TIMELINE_KINDS.JOINED]: { component: MainItem },
  [TIMELINE_KINDS.LEFT]: { component: MainItem },
  [TIMELINE_KINDS.COMPLAINT]: {
    component: ComplaintItem,
  },
  [TIMELINE_KINDS.DOCUMENT]: {
    component: DocumentCard,
    className: 'inline-item',
  },
  [TIMELINE_KINDS.SALARY_CHANGE]: {
    component: SalaryChangeItem,
  },
  [TIMELINE_KINDS.RANK_CHANGE]: {
    component: RankChangeItem,
  },
}

const Timeline = (props) => {
  const {
    timeline,
    saveRecentItem,
    timelineFilterGroups,
    changeFilterGroupKey,
    filterGroupKey,
    fetchOfficerTimeline,
    hasEventDetails,
  } = props

  const [highlightItemId, setHighlightItemId] = useState()
  const [showActionsPanel, setShowActionsPanel] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)

  const location = useLocation()
  const { id: officerId } = useParams()

  useEffect(() => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
    const { complaint_id: complaintId } = search
    if (complaintId) {
      setHighlightItemId(complaintId)
    }
    const setHighlightItemIdTimeoutId = setTimeout(
      () => setHighlightItemId(null),
      ANIMATION_DURATION
    )

    return () => {
      clearTimeout(setHighlightItemIdTimeoutId)
    }
  }, [])

  useEffect(() => {
    fetchOfficerTimeline(officerId)
  }, [officerId])

  const renderTimelineItem = (item, index, { group, leftGroup }) => {
    const { component: Component, className } = get(
      TIMELINE_COMPONENTS_MAPPING,
      item.kind,
      {}
    )

    return (
      Component && (
        <div
          className={cx('timeline-item', className, {
            'first-timeline-item': index === 0,
          })}
          key={index}
        >
          {group.isDateEvent && (
            <div className='timeline-connected-line-container'>
              <div className='timeline-connected-line'>
                <div className='line' />
              </div>
            </div>
          )}
          <Component
            {...item}
            saveRecentItem={saveRecentItem}
            className={cx({
              'has-connected-line': group.isDateEvent,
              'left-item': leftGroup,
            })}
            highlight={!!item.id && item.id == highlightItemId}
            officerId={officerId}
            showEventDetails={showEventDetails}
          />
        </div>
      )
    )
  }

  const handleShowEventDetails = () => {
    setShowEventDetails(!showEventDetails)
    hideActionsPanel()
  }

  const hideActionsPanel = () => {
    setShowActionsPanel(false)
  }

  const showHeaderActionsButton =
    hasEventDetails || (isMobile && !isEmpty(timelineFilterGroups))

  return (
    !isEmpty(timeline) && (
      <div className='officer-timeline'>
        <div className='timeline-header'>
          <div className='timeline-header-text'>Timeline</div>
          {showHeaderActionsButton && (
            <div className='timeline-header-actions-container'>
              <div
                className='timeline-header-actions-btn'
                onClick={() => setShowActionsPanel(!showActionsPanel)}
              />
              {showActionsPanel && (
                <div className='timeline-header-actions'>
                  {hasEventDetails && (
                    <div
                      className='show-event-details'
                      onClick={handleShowEventDetails}
                    >
                      {showEventDetails ? 'Hide' : 'Show'} event details
                    </div>
                  )}
                  <MobileView className='filters-panel'>
                    <div className='filters-panel-title'>
                      Filter by event type
                    </div>
                    <TimelineFilters
                      timelineFilterGroups={timelineFilterGroups}
                      changeFilterGroupKey={changeFilterGroupKey}
                      filterGroupKey={filterGroupKey}
                      hideActionsPanel={hideActionsPanel}
                    />
                  </MobileView>
                </div>
              )}
            </div>
          )}
        </div>
        <BrowserView>
          <TimelineFilters
            className='center-items'
            timelineFilterGroups={timelineFilterGroups}
            changeFilterGroupKey={changeFilterGroupKey}
            filterGroupKey={filterGroupKey}
          />
        </BrowserView>
        {timeline.map((group, groupIndex) => {
          const leftGroup = groupIndex % 2 === 0
          return (
            <div
              key={groupIndex}
              className={cx('timeline-group', {
                'left-group': leftGroup,
                'date-event-group': group.isDateEvent,
              })}
            >
              <div className='timeline-group-title'>{group.groupName}</div>
              {group.items.map((item, index) =>
                renderTimelineItem(item, index, { group, leftGroup })
              )}
            </div>
          )
        })}
        <div className='clearfix' />
      </div>
    )
  )
}

Timeline.propTypes = {
  timeline: PropTypes.array,
  hasEventDetails: PropTypes.bool,
  timelineFilterGroups: PropTypes.array,
  filterGroupKey: PropTypes.string,
  saveRecentItem: PropTypes.func,
  changeFilterGroupKey: PropTypes.func,
  fetchOfficerTimeline: PropTypes.func,
}

Timeline.defaultProps = {
  saveRecentItem: noop,
  changeFilterGroupKey: noop,
  fetchOfficerTimeline: noop,
}

export default Timeline
