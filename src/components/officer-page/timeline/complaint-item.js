import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'
import upperFirst from 'lodash/upperFirst'
import trim from 'lodash/trim'
import isEmpty from 'lodash/isEmpty'

import './complaint-item.scss'
import { complaintItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import {
  analyzeCopyCardLink,
  analyzeExpandEventCard,
} from 'utils/google-analytics'

const ComplaintItem = (props) => {
  const {
    className,
    allegation,
    allegationDesc,
    disposition,
    action,
    trackingId,
    associatedOfficers,
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
      type: TRACK_ITEM_TYPES.COMPLAINT,
      id,
    })
    const timeoutId = setTimeout(
      () => setCopyTimeoutId(null),
      ANIMATION_DURATION
    )
    setCopyTimeoutId(timeoutId)
  }

  const complaintData = [
    {
      title: 'Allegation',
      content: allegation,
    },
    {
      title: 'Allegation Description',
      content: allegationDesc,
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
      content: trackingId,
    },
    {
      title: 'Others named on tracking ID',
      content: associatedOfficers,
    },
  ]

  const handleComplaintExpand = () => {
    if (!expanded) {
      analyzeExpandEventCard({
        type: TRACK_ITEM_TYPES.COMPLAINT,
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
                  <div className='complaint-item-officer-row-value'>
                    {element.title === 'Others named on tracking ID' &&
                      !isEmpty(associatedOfficers) &&
                      element.content.map((officer, index) => (
                        <div
                          key={index}
                          className='complaint-item-officer-name'
                        >
                          <a href={complaintItemUrl(officer.id, id)}>
                            {officer.name}
                          </a>
                        </div>
                      ))}
                    {element.title !== 'Others named on tracking ID' && (
                      <div className='complaint-item-info-row-value'>
                        {upperFirst(trim(element.content, '.'))}
                      </div>
                    )}
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
  allegation: PropTypes.string,
  allegationDesc: PropTypes.string,
  disposition: PropTypes.string,
  action: PropTypes.string,
  trackingId: PropTypes.string,
  highlight: PropTypes.bool,
  showEventDetails: PropTypes.bool,
  officerId: PropTypes.string,
  associatedOfficers: PropTypes.array,
}

ComplaintItem.defaultProps = {
  showEventDetails: false,
}

export default ComplaintItem
