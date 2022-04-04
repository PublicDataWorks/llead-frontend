import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'

import './appeal-item.scss'
import { appealItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import {
  analyzeCopyCardLink,
  analyzeExpandEventCard,
} from 'utils/google-analytics'

const AppealItem = (props) => {
  const {
    id,
    officerId,
    className,
    highlight,
    showEventDetails,
    date,
    docketNo,
    counsel,
    chargingSupervisor,
    appealDisposition,
    actionAppealed,
    motions,
    department,
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
      type: TRACK_ITEM_TYPES.APPEAL,
      id,
    })
    const timeoutId = setTimeout(
      () => setCopyTimeoutId(null),
      ANIMATION_DURATION
    )
    setCopyTimeoutId(timeoutId)
  }

  const appealData = [
    {
      title: 'Action Appealed',
      content: actionAppealed,
    },
    {
      title: 'Appeal Disposition',
      content: appealDisposition,
    },
    {
      title: 'Motion',
      content: motions,
    },
    {
      title: 'Counsel',
      content: counsel,
    },
    {
      title: 'Charging Supervisor',
      content: chargingSupervisor,
    },
    {
      title: 'Department',
      content: department,
    },
    {
      title: 'Appeal Disposition Date',
      content: date,
    },
    {
      title: 'Docket Number',
      content: docketNo,
    },
  ]

  const handleAppealExpand = () => {
    if (!expanded) {
      analyzeExpandEventCard({
        type: TRACK_ITEM_TYPES.APPEAL,
        id,
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div
      className={cx('timeline-appeal-item', className, {
        'timeline-appeal-highlight': highlighting,
      })}
    >
      <div className='appeal-item-header' onClick={handleAppealExpand}>
        <div className='appeal-item-title'>
          Appealed <span>{actionAppealed}</span>
        </div>
        <div className='appeal-item-subtitle'>{appealDisposition}</div>
        <div
          className={cx('appeal-item-expand-icon', {
            'expanded-icon': expanded,
          })}
          ref={expandItemRef}
        />
      </div>

      <AnimateHeight
        duration={QUICK_ANIMATION_DURATION}
        height={expanded || highlight ? 'auto' : 0}
        data-testid='test--appeal-animation'
      >
        <div className='appeal-item-content'>
          {appealData.map(
            (element) =>
              element.content && (
                <div className='appeal-item-info-row' key={element.title}>
                  <div className='appeal-item-info-row-title'>
                    {element.title}
                  </div>
                  <div className='appeal-item-info-row-value'>
                    {element.content}
                  </div>
                </div>
              )
          )}
          <CopyToClipboard
            text={appealItemUrl(officerId, id)}
            onCopy={handleOnCopied}
            className={cx('appeal-item-copy-link', {
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

AppealItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  officerId: PropTypes.string,
  highlight: PropTypes.bool,
  showEventDetails: PropTypes.bool,
  date: PropTypes.string,
  docketNo: PropTypes.string,
  counsel: PropTypes.string,
  chargingSupervisor: PropTypes.string,
  appealDisposition: PropTypes.string,
  actionAppealed: PropTypes.string,
  motions: PropTypes.string,
  department: PropTypes.string,
}

AppealItem.defaultProps = {
  showEventDetails: false,
}

export default AppealItem
