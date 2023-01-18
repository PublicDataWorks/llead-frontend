import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'

import './accordion.scss'
import { QUICK_ANIMATION_DURATION } from 'constants/common'

const Accordion = (props) => {
  const { title, content } = props

  const [isActive, setIsActive] = useState(false)

  return (
    <div className='accordion' onClick={() => setIsActive(!isActive)}>
      <div className='accordion-item'>
        <div className='accordion-title'>
          <div className='title'>{title}</div>
          <div className={cx('icon', { expanded: isActive })}>&nbsp;</div>
        </div>
        <AnimateHeight
          data-testid='answer'
          duration={QUICK_ANIMATION_DURATION}
          height={isActive ? 'auto' : 0}
        >
          <ReactMarkdown className='accordion-content'>{content}</ReactMarkdown>
        </AnimateHeight>
      </div>
    </div>
  )
}

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}

Accordion.defaultProps = {
  title: '',
  content: '',
}

export default Accordion
