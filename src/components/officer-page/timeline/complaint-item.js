import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './complaint-item.scss'

const ComplaintItem = (props) => {
  const [expanded, setExpanded] = useState(false)

  const {
    className,
    ruleViolation,
    paragraphViolation,
    disposition,
    action,
    trackingNumber,
  } = props

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
    <div className={cx('timeline-complaint-item', className)}>
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

          <div className='complaint-item-copy-link'>Copy link</div>
        </div>
      )}
    </div>
  )
}

ComplaintItem.propTypes = {
  className: PropTypes.string,
  ruleViolation: PropTypes.string,
  paragraphViolation: PropTypes.string,
  disposition: PropTypes.string,
  action: PropTypes.string,
  trackingNumber: PropTypes.string,
}

ComplaintItem.defaultProps = {}

export default ComplaintItem
