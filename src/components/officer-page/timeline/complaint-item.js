import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'
import join from 'lodash/join'
import compact from 'lodash/compact'

import './complaint-item.scss'
import { complaintItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  EXPAND_TRACK_ITEMS,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import { analyzeExpandEventCard } from 'utils/google-analytics'

const ComplaintItem = (props) => {
  const {
    className,
    ruleCode,
    ruleViolation,
    paragraphCode,
    paragraphViolation,
    disposition,
    action,
    trackingNumber,
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
    const timeoutId = setTimeout(
      () => setCopyTimeoutId(null),
      ANIMATION_DURATION
    )
    setCopyTimeoutId(timeoutId)
  }

  const complaintData = [
    {
      title: 'Rule Violation',
      content: join(compact([ruleCode, ruleViolation]), ' - '),
    },
    {
      title: 'Paragraph Violation',
      content: join(compact([paragraphCode, paragraphViolation]), ' - '),
    },
    {
      title: 'Disposition',
      content: disposition,
    },
    {
      title: 'Action',
      content: action,
    },
    {
      title: 'Tracking ID',
      content: trackingNumber,
    },
  ]

  const handleComplaintExpand = () => {
    if (!expanded) {
      analyzeExpandEventCard({
        type: EXPAND_TRACK_ITEMS.COMPLAINT,
        id,
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div
      className={cx('timeline-complaint-item', className, {
        'timeline-complaint-highlight': highlighting,
      })}
    >
      <div className='complaint-item-header' onClick={handleComplaintExpand}>
        <div className='complaint-item-title'>
          Accused of <span>misconduct</span>
        </div>
        <div className='complaint-item-subtitle'>{disposition}</div>
        <div
          className={cx('complaint-item-expand-icon', {
            'expanded-icon': expanded,
          })}
          ref={expandItemRef}
        />
      </div>

      <AnimateHeight
        duration={QUICK_ANIMATION_DURATION}
        height={expanded || highlight ? 'auto' : 0}
        data-testid='test--complaint-animation'
      >
        <div className='complaint-item-content'>
          {complaintData.map(
            (element) =>
              element.content && (
                <div className='complaint-item-info-row' key={element.title}>
                  <div className='complaint-item-info-row-title'>
                    {element.title}
                  </div>
                  <div className='complaint-item-info-row-value'>
                    {element.content}
                  </div>
                </div>
              )
          )}

          <CopyToClipboard
            text={complaintItemUrl(officerId, id)}
            onCopy={handleOnCopied}
            className={cx('complaint-item-copy-link', {
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

ComplaintItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  ruleViolation: PropTypes.string,
  paragraphViolation: PropTypes.string,
  disposition: PropTypes.string,
  action: PropTypes.string,
  trackingNumber: PropTypes.string,
  highlight: PropTypes.bool,
  showEventDetails: PropTypes.bool,
  officerId: PropTypes.string,
  ruleCode: PropTypes.string,
  paragraphCode: PropTypes.string,
}

ComplaintItem.defaultProps = {
  showEventDetails: false,
}

export default ComplaintItem
