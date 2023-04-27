import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'
import upperFirst from 'lodash/upperFirst'
import trim from 'lodash/trim'

import './brady-item.scss'
import { bradyItemUrl } from 'utils/urls'
import { formatDate } from 'utils/formatter'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import {
  analyzeCopyCardLink,
  analyzeExpandEventCard,
} from 'utils/google-analytics'

const BradyItem = (props) => {
  const {
    className,
    allegationDesc,
    disposition,
    action,
    chargingDepartment,
    department,
    sourceDepartment,
    date,
    trackingIdOg,
    highlight,
    showEventDetails,
    officerId,
    id,
  } = props

  const [expanded, setExpanded] = useState(false)
  const [highlighting, setHighlighting] = useState(false)
  const [copyTimeoutId, setCopyTimeoutId] = useState()
  const expandItemRef = useRef()

  useEffect(() => {
    setExpanded(showEventDetails)
  }, [showEventDetails])

  useEffect(() => {
    setHighlighting(highlight)

    if (highlight) {
      if (expandItemRef.current) {
        expandItemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
      setExpanded(true)
    }

    return () => {
      clearTimeout(copyTimeoutId)
    }
  }, [highlight])

  const handleOnCopied = () => {
    analyzeCopyCardLink({
      type: TRACK_ITEM_TYPES.BRADY,
      id,
    })
    const timeoutId = setTimeout(
      () => setCopyTimeoutId(null),
      ANIMATION_DURATION
    )
    setCopyTimeoutId(timeoutId)
  }

  const bradyData = [
    {
      title: 'Allegation Description',
      content: allegationDesc,
    },
    {
      title: 'Action',
      content: action,
    },
    {
      title: 'Disposition',
      content: disposition,
    },
    {
      title: 'Charging Agency',
      content: chargingDepartment,
    },
    {
      title: 'Agency of Employment',
      content: department,
    },
    {
      title: 'Brady List Source Agency',
      content: sourceDepartment,
    },
    {
      title: 'Brady List Received Date',
      content: formatDate(date),
    },
    {
      title: 'Tracking ID',
      content: trackingIdOg,
    },
  ]

  const handleComplaintExpand = () => {
    if (!expanded) {
      analyzeExpandEventCard({
        type: TRACK_ITEM_TYPES.BRADY,
        id,
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div
      className={cx('timeline-brady-item', className, {
        'timeline-brady-highlight': highlighting,
      })}
    >
      <div className='brady-item-header' onClick={handleComplaintExpand}>
        <div className='brady-item-title'>
          <b>Named on Brady List by</b> {sourceDepartment}
        </div>
        <div
          className={cx('brady-item-expand-icon', {
            'expanded-icon': expanded,
          })}
          ref={expandItemRef}
        />
      </div>

      <AnimateHeight
        duration={QUICK_ANIMATION_DURATION}
        height={expanded || highlight ? 'auto' : 0}
        data-testid='test--brady-animation'
      >
        <div className='brady-item-content'>
          {bradyData.map(
            (element) =>
              element.content && (
                <div className='brady-item-info-row' key={element.title}>
                  <div className='brady-item-info-row-title'>
                    {element.title}
                  </div>
                  <div className='brady-item-info-row-value'>
                    {upperFirst(trim(element.content, '.'))}
                  </div>
                </div>
              )
          )}

          <CopyToClipboard
            text={bradyItemUrl(officerId, id)}
            onCopy={handleOnCopied}
            className={cx('brady-item-copy-link', {
              'copy-link-active': copyTimeoutId,
            })}
          >
            <div>
              {copyTimeoutId ? 'Link copied to your clipboard' : 'Copy link'}
            </div>
          </CopyToClipboard>
        </div>
      </AnimateHeight>
    </div>
  )
}

BradyItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  allegationDesc: PropTypes.string,
  disposition: PropTypes.string,
  action: PropTypes.string,
  chargingDepartment: PropTypes.string,
  department: PropTypes.string,
  sourceDepartment: PropTypes.string,
  date: PropTypes.string,
  trackingIdOg: PropTypes.string,
  highlight: PropTypes.bool,
  showEventDetails: PropTypes.bool,
  officerId: PropTypes.string,
}

BradyItem.defaultProps = {
  showEventDetails: false,
}

export default BradyItem
