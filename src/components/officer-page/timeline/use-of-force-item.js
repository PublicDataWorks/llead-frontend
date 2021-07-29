import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'
import isEmpty from 'lodash/isEmpty'

import './use-of-force-item.scss'
import { uofItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import {
  analyzeCopyCardLink,
  analyzeExpandEventCard,
} from 'utils/google-analytics'

const UseOfForceItem = (props) => {
  const {
    id,
    officerId,
    className,
    highlight,
    showEventDetails,
    forceType,
    forceDescription,
    forceReason,
    disposition,
    serviceType,
    citizenInvolvement,
    citizenInformation,
    uofTrackingNumber,
    details,
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
      setExpanded(true)

      if (expandItemRef.current) {
        expandItemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }

    return () => {
      clearTimeout(copyTimeoutId)
    }
  }, [highlight])

  const handleOnCopied = () => {
    analyzeCopyCardLink({
      type: TRACK_ITEM_TYPES.UOF,
      id,
    })
    const timeoutId = setTimeout(
      () => setCopyTimeoutId(null),
      ANIMATION_DURATION
    )
    setCopyTimeoutId(timeoutId)
  }

  const useOfForceData = [
    {
      title: 'Force Description',
      content: forceDescription,
    },
    {
      title: 'Force Reason',
      content: forceReason,
    },
    {
      title: 'Disposition',
      content: disposition,
    },
    {
      title: 'Service Type',
      content: serviceType,
    },
    {
      title: 'Citizen Involvement',
      content: citizenInvolvement,
    },
    {
      title: 'Citizen Information',
      content: citizenInformation,
    },
    {
      title: 'Tracking ID',
      content: uofTrackingNumber,
    },
  ]

  const handleUseOfForceExpand = () => {
    if (!expanded) {
      analyzeExpandEventCard({
        type: TRACK_ITEM_TYPES.UOF,
        id,
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div
      className={cx('timeline-uof-item', className, {
        'timeline-uof-highlight': highlighting,
      })}
    >
      <div className='uof-item-header' onClick={handleUseOfForceExpand}>
        <div className='uof-item-title'>
          Used <span>force</span>
        </div>
        <div className='uof-item-subtitle'>{forceType}</div>
        <div
          className={cx('uof-item-expand-icon', {
            'expanded-icon': expanded,
          })}
          ref={expandItemRef}
        />
      </div>

      <AnimateHeight
        duration={QUICK_ANIMATION_DURATION}
        height={expanded || highlight ? 'auto' : 0}
        data-testid='test--uof-animation'
      >
        <div className='uof-item-content'>
          {useOfForceData.map(
            (element) =>
              element.content && (
                <div className='uof-item-info-row' key={element.title}>
                  <div className='uof-item-info-row-title'>{element.title}</div>
                  <div className='uof-item-info-row-value'>
                    {element.content}
                  </div>
                </div>
              )
          )}
          {!isEmpty(details) && (
            <div className='uof-item-info-row'>
              <div className='uof-item-info-row-title'>Details</div>
              <div className='uof-item-info-row-value'>
                {details.map((element, index) => (
                  <div className='uof-item-detail-element' key={index}>
                    {element}
                  </div>
                ))}
              </div>
            </div>
          )}

          <CopyToClipboard
            text={uofItemUrl(officerId, id)}
            onCopy={handleOnCopied}
            className={cx('uof-item-copy-link', {
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

UseOfForceItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  officerId: PropTypes.string,
  highlight: PropTypes.bool,
  showEventDetails: PropTypes.bool,
  forceType: PropTypes.string,
  forceDescription: PropTypes.string,
  forceReason: PropTypes.string,
  disposition: PropTypes.string,
  serviceType: PropTypes.string,
  citizenInvolvement: PropTypes.string,
  citizenInformation: PropTypes.string,
  uofTrackingNumber: PropTypes.string,
  details: PropTypes.array,
}

UseOfForceItem.defaultProps = {
  showEventDetails: false,
}

export default UseOfForceItem
