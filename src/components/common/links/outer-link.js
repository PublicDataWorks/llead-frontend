import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import './outer-link.scss'

const OuterLink = ({ href, className, onClick, ...rest }) => {
  const handleClick = (event) => {
    event.stopPropagation()
    onClick()
    window.open(href, '_blank', 'noopener noreferrer')
  }

  return (
    <div
      className={cx('outer-link', className)}
      onClick={handleClick}
      {...rest}
    />
  )
}

OuterLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

OuterLink.defaultProps = {
  onClick: noop,
}

export default OuterLink
