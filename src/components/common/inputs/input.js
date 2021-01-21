import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import cx from 'classnames'

import './input.scss'

const Input = forwardRef(({ iconSrc, className, ...rest }, ref) => {
  return (
    <div className={cx('input-container', className)}>
      {iconSrc && <img className='svg-icon' src={iconSrc} />}
      <input
        className={cx('input-field', { 'has-icon': !isEmpty(iconSrc) })}
        ref={ref}
        {...rest}
      />
    </div>
  )
})

Input.propTypes = {
  iconSrc: PropTypes.string,
  className: PropTypes.string,
}

Input.defaultProps = {
  iconSrc: '',
  className: '',
}

Input.displayName = 'Input'

export default Input
