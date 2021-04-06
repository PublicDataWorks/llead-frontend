import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'
import noop from 'lodash/noop'

import './custom-link.scss'

const CustomLink = ({ to, className, onClick, ...rest }) => {
  const history = useHistory()
  const handleClick = (event) => {
    event.stopPropagation()
    onClick()
    history.push(to)
  }

  return (
    <div
      className={cx('custom-link', className)}
      onClick={handleClick}
      {...rest}
    />
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

CustomLink.defaultProps = {
  onClick: noop,
}

export default CustomLink
