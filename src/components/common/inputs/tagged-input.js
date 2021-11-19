import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'

import './tagged-input.scss'

const TaggedInput = forwardRef(
  ({ iconSrc, className, searchTag, ...rest }, ref) => {
    return (
      <div className={cx('tagged-input-container', className)}>
        {iconSrc && <img className='svg-icon' src={iconSrc} />}

        <div className={cx('input-field', { 'has-icon': !isEmpty(iconSrc) })}>
          <div className={'search-form-wrapper'}>
            <div className={searchTag && 'search-tag'}>{searchTag}</div>
            <div className='stretch-input'>
              <input className='transparent-input' ref={ref} {...rest} />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

TaggedInput.propTypes = {
  iconSrc: PropTypes.string,
  className: PropTypes.string,
  searchTag: PropTypes.string,
}

TaggedInput.defaultProps = {
  iconSrc: '',
  className: '',
  searchTag: '',
}

TaggedInput.displayName = 'Input'

export default TaggedInput
