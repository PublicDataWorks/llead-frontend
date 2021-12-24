import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import RemoveSVG from 'assets/icons/remove.svg'
import './outer-link.scss'

const OuterLink = ({
  href,
  className,
  onClick,
  removeRecentItem,
  removeData,
  ...rest
}) => {
  const handleClick = (event) => {
    event.stopPropagation()
    onClick()
    window.open(href, '_blank', 'noopener noreferrer')
  }

  const handleRemove = (event) => {
    event.stopPropagation()
    removeRecentItem(removeData)
  }

  return (
    <div onClick={handleClick} className={cx('outer-link-wrapper', className)}>
      <div {...rest} />
      {removeRecentItem && (
        <img className='remove-btn' src={RemoveSVG} onClick={handleRemove} />
      )}
    </div>
  )
}

OuterLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  removeRecentItem: PropTypes.func,
  removeData: PropTypes.object,
}

OuterLink.defaultProps = {
  onClick: noop,
  removeData: {},
}

export default OuterLink
