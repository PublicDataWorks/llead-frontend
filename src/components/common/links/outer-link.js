import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './outer-link.scss'

const OuterLink = ({ href, className, ...rest }) => {
  const handleClick = (event) => {
    event.stopPropagation()
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
}

export default OuterLink
