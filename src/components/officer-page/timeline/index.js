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
import UseOfForceItem from './use-of-force-item'
import MainItem from './main-item'
import DocumentCard from './document-card'
import SalaryChangeItem from './salary-change-item'
import RankChangeItem from './rank-change-item'
import UnitChangeItem from './unit-change-item'
import BradyItem from './brady-item'
import TimelineFilters from './filters'
import {
  ANIMATION_DURATION,
  EVENT_TYPES,
  TIMELINE_KINDS,
} from 'constants/common'
import { analyzeAction } from 'utils/google-analytics'
import NewsArticleCard from './news-article-card'
import AppealItem from './appeal-item'
import PostDecertificationItem from './post-decertification-item'
import FirearmCertItem from './firearm-cert-item'
import PC12QualificationItem from './pc12-qualification-item'
import LeftEventItem from './left-item'
import JoinedEventItem from './joined-item'

const TIMELINE_COMPONENTS_MAPPING = {
  [TIMELINE_KINDS.JOINED]: { component: JoinedEventItem },
  [TIMELINE_KINDS.LEFT]: { component: MainItem },
  [TIMELINE_KINDS.TERMINATED]: { component: LeftEventItem },
  [TIMELINE_KINDS.RESIGNED]: { component: LeftEventItem },
  [TIMELINE_KINDS.COMPLAINT]: {
    component: ComplaintItem,
  },
  [TIMELINE_KINDS.UOF]: {
    component: UseOfForceItem,
  },
  [TIMELINE_KINDS.APPEAL]: {
    component: AppealItem,
  },
  [TIMELINE_KINDS.DOCUMENT]: {
    component: DocumentCard,
    customLine: 'white-dot',
  },
  [TIMELINE_KINDS.SALARY_CHANGE]: {
    component: SalaryChangeItem,
  },
  [TIMELINE_KINDS.RANK_CHANGE]: {
    component: RankChangeItem,
  },
  [TIMELINE_KINDS.UNIT_CHANGE]: {
    component: UnitChangeItem,
  },
  [TIMELINE_KINDS.NEWS_ARTICLE]: {
    component: NewsArticleCard,
    customLine: 'white-dot',
  },
  [TIMELINE_KINDS.BRADY_LIST]: {
    component: BradyItem,
  },
  [TIMELINE_KINDS.POST_DECERTIFICATION]: {
    component: PostDecertificationItem,
  },
  [TIMELINE_KINDS.FIREARM_CERTIFICATION]: {
    component: FirearmCertItem,
  },
  [TIMELINE_KINDS.PC_12_QUALIFICATION]: {
    component: PC12QualificationItem,
  },
}

const Timeline = (props) => {
  const {
    officerName,
    timeline,
    saveRecentItem,
    timelineFilterGroups,
    changeFilterGroupKey,
    filterGroupKey,
    fetchOfficerTimeline,
    downloadOfficerTimeline,
    hasEventDetails,
    isDownloadingFile,
  } = props

  const [highlightItemId, setHighlightItemId] = useState()
  const [highlightItemKind, setHighlightItemKind] = useState()
  const [showActionsPanel, setShowActionsPanel] = useState(false)
  const [showDownloadPanel, setShowDownloadPanel] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)

  const location = useLocation()
  const { id: officerId } = useParams()

  useEffect(() => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true })
    const {
      complaint_id: complaintId,
      uof_id: uofId,
      appeal_id: appealId,
    } = search
    if (complaintId) {
      setHighlightItemId(complaintId)
      setHighlightItemKind(TIMELINE_KINDS.COMPLAINT)
    } else if (uofId) {
      setHighlightItemId(uofId)
      setHighlightItemKind(TIMELINE_KINDS.UOF)
    } else if (appealId) {
      setHighlightItemId(appealId)
      setHighlightItemKind(TIMELINE_KINDS.APPEAL)
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
    const { component: Component, customLine } = get(
      TIMELINE_COMPONENTS_MAPPING,
      item.kind,
      {}
    )

    return (
      Component && (
        <div
          className={cx('timeline-item', {
            'first-timeline-item': index === 0,
          })}
          key={index}
        >
          {group.isDateEvent && (
            <div className='timeline-connected-line-container'>
              <div className={cx('timeline-connected-line', customLine)}>
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
            highlight={
              !!item.id &&
              item.kind === highlightItemKind &&
              item.id == highlightItemId
            }
            officerId={officerId}
            showEventDetails={showEventDetails}
          />
        </div>
      )
    )
  }

  const hideActionsPanel = () => {
    setShowActionsPanel(false)
  }

  const handleShowEventDetails = () => {
    setShowEventDetails(!showEventDetails)
    hideActionsPanel()
  }

  const handleDownloadFile = () => {
    const fileName = `${officerName.replace(' ', '_')}.xlsx`
    setShowDownloadPanel(!showDownloadPanel)
    downloadOfficerTimeline(officerId, fileName)
    analyzeAction({
      type: EVENT_TYPES.DOWNLOAD_SPREADSHEET,
      data: { officer_id: officerId },
    })
  }

  const showHeaderActionsButton =
    hasEventDetails || (isMobile && !isEmpty(timelineFilterGroups))

  return (
    !isEmpty(timeline) && (
      <div className='officer-timeline'>
        <div className='timeline-header'>
          <div className='timeline-header-text'>Timeline</div>
          <div className='timeline-action-buttons-container'>
            {showHeaderActionsButton && (
              <div className='timeline-header-actions-container'>
                <div
                  className={cx('timeline-header-actions-btn', {
                    'active-btn': showActionsPanel,
                  })}
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
            <BrowserView className='timeline-header-download-container'>
              <div
                className={cx(
                  'timeline-download-btn',
                  {
                    'timeline-download-btn-disable': isDownloadingFile,
                  },
                  { 'active-btn': showDownloadPanel }
                )}
                onClick={() => setShowDownloadPanel(!showDownloadPanel)}
              />
              {showDownloadPanel && (
                <div className='timeline-header-download'>
                  <div
                    className='show-download-file'
                    onClick={handleDownloadFile}
                  >
                    <div className='download-button'>
                      <span className='bold-text'>Download</span> officer
                      timeline (.xlsx)
                    </div>
                  </div>
                </div>
              )}
            </BrowserView>
          </div>
        </div>
        <BrowserView>
          <TimelineFilters
            className='center-items'
            timelineFilterGroups={timelineFilterGroups}
            changeFilterGroupKey={changeFilterGroupKey}
            filterGroupKey={filterGroupKey}
          />
        </BrowserView>
        {timeline.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={cx('timeline-group', {
              'left-group': group.leftGroup,
              'date-event-group': group.isDateEvent,
            })}
          >
            <div className='timeline-group-title'>{group.groupName}</div>
            {group.items.map((item, index) =>
              renderTimelineItem(item, index, {
                group,
                leftGroup: group.leftGroup,
              })
            )}
          </div>
        ))}
        <div className='clearfix' />
      </div>
    )
  )
}

Timeline.propTypes = {
  officerName: PropTypes.string,
  timeline: PropTypes.array,
  hasEventDetails: PropTypes.bool,
  timelineFilterGroups: PropTypes.array,
  filterGroupKey: PropTypes.string,
  saveRecentItem: PropTypes.func,
  changeFilterGroupKey: PropTypes.func,
  fetchOfficerTimeline: PropTypes.func,
  downloadOfficerTimeline: PropTypes.func,
  isDownloadingFile: PropTypes.bool,
}

Timeline.defaultProps = {
  officerName: 'officer',
  saveRecentItem: noop,
  changeFilterGroupKey: noop,
  fetchOfficerTimeline: noop,
  downloadOfficerTimeline: noop,
}

export default Timeline
