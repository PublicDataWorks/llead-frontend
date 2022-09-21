import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import RemoveSVG from 'assets/icons/remove.svg'
import './outer-link.scss'

const OuterLink = ({
  href,
  isLoggedIn,
  className,
  onClick,
  removeRecentItem,
  removeData,
  isDisabled,
  ...rest
}) => {
  const handleClick = (event) => {
    if (!isDisabled) {
      event.stopPropagation()
      onClick()
      window.open(href, '_blank', 'noopener noreferrer')
    }
  }

  const handleRemove = (event) => {
    event.stopPropagation()
    removeRecentItem(removeData)
  }

  return (
    <div onClick={handleClick} className={cx('outer-link-wrapper', className)}>
      <div {...rest} />
      {isLoggedIn && removeRecentItem && (
        <img className='remove-btn' src={RemoveSVG} onClick={handleRemove} />
      )}
    </div>
  )
}

OuterLink.propTypes = {
  href: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  removeRecentItem: PropTypes.func,
  removeData: PropTypes.object,
  isDisabled: PropTypes.bool,
}

OuterLink.defaultProps = {
  onClick: noop,
  removeData: {},
  isDisabled: false,
}

export default OuterLink
