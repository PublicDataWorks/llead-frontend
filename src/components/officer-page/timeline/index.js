import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import qs from 'qs'
import { useLocation, useParams } from 'react-router-dom'
import get from 'lodash/get'
import noop from 'lodash/noop'

import './timeline.scss'
import ComplaintItem from './complaint-item'
import MainItem from './main-item'
import DocumentCard from './document-card'
import SalaryChangeItem from './salary-change-item'
import RankChangeItem from './rank-change-item'
import { TIMELINE_KINDS } from 'constants/common'

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
  const { timeline, saveRecentItem } = props
  const [highlightItemId, sethighlightItemId] = useState(null)

  const location = useLocation()
  const { id: officerId } = useParams()

  useEffect(() => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
    const { complaint_id: complaintId } = search
    if (complaintId) {
      sethighlightItemId(complaintId)
    }
  }, [])

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
          />
        </div>
      )
    )
  }

  return (
    <div className='officer-timeline'>
      <div className='timeline-header'>
        <div className='timeline-header-text'>Timeline</div>
      </div>
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
}

Timeline.propTypes = {
  timeline: PropTypes.array,
  saveRecentItem: PropTypes.func,
}

Timeline.defaultProps = {
  saveRecentItem: noop,
}

export default Timeline
