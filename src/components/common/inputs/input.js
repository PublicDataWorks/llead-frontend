import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import cx from 'classnames'

import './input.scss'

const Input = forwardRef(({ iconSrc, className, ...rest }, ref) => {
  const buildIcon = () => {
    if (isString(iconSrc)) {
      return iconSrc && <img className='svg-icon' src={iconSrc} />
    }
    return <div className='svg-icon'>{iconSrc}</div>
  }

  return (
    <div className={cx('input-container', className)}>
      {buildIcon()}
      <input
        className={cx('input-field', { 'has-icon': !isEmpty(iconSrc) })}
        ref={ref}
        {...rest}
      />
    </div>
  )
})

Input.propTypes = {
  iconSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
}

Input.defaultProps = {
  iconSrc: '',
  className: '',
}

Input.displayName = 'Input'

export default Input
