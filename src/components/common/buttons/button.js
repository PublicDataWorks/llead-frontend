import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './button.scss'

const Button = (props) => {
  const { className, ...rest } = props
  return <button className={cx('btn', className)} {...rest} />
}

Button.propTypes = {
  className: PropTypes.string,
}

Button.defaultProps = {
  className: '',
}

export default Button
