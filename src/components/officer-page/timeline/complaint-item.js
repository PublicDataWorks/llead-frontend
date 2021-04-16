import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import noop from 'lodash/noop'

import './complaint-item.scss'
import { complaintItemUrl } from 'utils/urls'
import { ANIMATION_DURATION } from 'constants/common'

const ComplaintItem = (props) => {
  const {
    className,
    ruleViolation,
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

  let highlightTimeoutId

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
      clearTimeout(highlightTimeoutId)
      clearTimeout(copyTimeoutId)
    }
  }, [highlight])

  const handleOnCopied = () => {
    setCopyTimeoutId(
      setTimeout(() => setCopyTimeoutId(null), ANIMATION_DURATION)
    )
  }

  const complaintData = [
    {
      title: 'Rule Violation',
      content: ruleViolation,
    },
    {
      title: 'Paragraph Violation',
      content: paragraphViolation,
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

  return (
    <div
      className={cx('timeline-complaint-item', className, {
        'timeline-complaint-highlight': highlighting,
      })}
    >
      <div
        className='complaint-item-header'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='complaint-item-title'>Accused of misconduct</div>
        <div className='complaint-item-subtitle'>Exonerated</div>
        <div
          className={cx('complaint-item-expand-icon', {
            'expanded-icon': expanded,
          })}
          ref={expandItemRef}
        />
      </div>

      {expanded && (
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

          <div
            className={cx('complaint-item-copy-link', {
              'copy-link-active': copyTimeoutId,
            })}
          >
            <CopyToClipboard
              text={complaintItemUrl(officerId, id)}
              onCopy={handleOnCopied}
            >
              <div>
                {copyTimeoutId ? 'Link copied to your clipboard' : 'Copy link'}
              </div>
            </CopyToClipboard>
          </div>
        </div>
      )}
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
}

ComplaintItem.defaultProps = {
  showEventDetails: noop,
}

export default ComplaintItem
