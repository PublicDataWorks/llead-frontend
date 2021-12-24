import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'
import noop from 'lodash/noop'

import RemoveSVG from 'assets/icons/remove.svg'
import './custom-link.scss'

const CustomLink = ({
  to,
  className,
  onClick,
  removeRecentItem,
  removeData,
  ...rest
}) => {
  const history = useHistory()
  const handleClick = (event) => {
    event.stopPropagation()
    onClick()
    history.push(to)
  }

  const handleRemove = () => {
    removeRecentItem(removeData)
  }

  return (
    <div className={cx('custom-link-wrapper', className)}>
      <div onClick={handleClick} className='custom-link' {...rest} />
      {removeRecentItem && (
        <img className='remove-btn' src={RemoveSVG} onClick={handleRemove} />
      )}
    </div>
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  removeRecentItem: PropTypes.func,
  removeData: PropTypes.object,
}

CustomLink.defaultProps = {
  onClick: noop,
  removeData: {},
}

export default CustomLink
