import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'
import upperFirst from 'lodash/upperFirst'
import trim from 'lodash/trim'

import './post-decertification-item.scss'
import { postCertificationItemUrl } from 'utils/urls'
import {
  ANIMATION_DURATION,
  TRACK_ITEM_TYPES,
  QUICK_ANIMATION_DURATION,
} from 'constants/common'
import {
  analyzeCopyCardLink,
  analyzeExpandEventCard,
} from 'utils/google-analytics'

const PostDecertificationItem = (props) => {
  const {
    className,
    allegations,
    department,
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
      type: TRACK_ITEM_TYPES.POST_DECERTIFICATION,
      id,
    })
    const timeoutId = setTimeout(
      () => setCopyTimeoutId(null),
      ANIMATION_DURATION
    )
    setCopyTimeoutId(timeoutId)
  }

  const postDecertificationData = [
    {
      title: 'Allegation',
      content: allegations,
    },
    {
      title: 'Agency',
      content: department,
    },
  ]

  const handleCardExpand = () => {
    if (!expanded) {
      analyzeExpandEventCard({
        type: TRACK_ITEM_TYPES.POST_DECERTIFICATION,
        id,
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div
      className={cx('timeline-post-decertification-item', className, {
        'timeline-post-decertification-highlight': highlighting,
      })}
    >
      <div
        className='post-decertification-item-header'
        onClick={handleCardExpand}
      >
        <div className='post-decertification-item-title'>
          <b>
            Decertified by the Louisiana Peace Officer Standards and Training
            Council (POST)
          </b>
        </div>
        <div
          className={cx('post-decertification-item-expand-icon', {
            'expanded-icon': expanded,
          })}
          ref={expandItemRef}
        />
      </div>

      <AnimateHeight
        duration={QUICK_ANIMATION_DURATION}
        height={expanded || highlight ? 'auto' : 0}
        data-testid='test--post-decertification-animation'
      >
        <div className='post-decertification-item-content'>
          {postDecertificationData.map(
            (element) =>
              element.content && (
                <div
                  className='post-decertification-item-info-row'
                  key={element.title}
                >
                  <div className='post-decertification-item-info-row-title'>
                    {element.title}
                  </div>
                  <div className='post-decertification-item-info-row-value'>
                    {upperFirst(trim(element.content, '.'))}
                  </div>
                </div>
              )
          )}

          <CopyToClipboard
            text={postCertificationItemUrl(officerId, id)}
            onCopy={handleOnCopied}
            className={cx('post-decertification-item-copy-link', {
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

PostDecertificationItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  allegations: PropTypes.string,
  department: PropTypes.string,
  highlight: PropTypes.bool,
  showEventDetails: PropTypes.bool,
  officerId: PropTypes.string,
}

PostDecertificationItem.defaultProps = {
  showEventDetails: false,
}

export default PostDecertificationItem
