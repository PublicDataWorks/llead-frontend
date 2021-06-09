import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import './user-panel.scss'

const UserPanel = (props) => {
  const { refreshToken, userInfo, logOut, fetchUserInfo } = props

  const [hideUserPanel, setHideUserPannel] = useState(true)

  const toggleUserPanel = () => setHideUserPannel(!hideUserPanel)

  const handleLogout = () => {
    setHideUserPannel(true)
    logOut({ refresh: refreshToken })
  }

  const { email } = userInfo

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div
      className={cx('panel-toggle', {
        'highlight-blue': !hideUserPanel,
      })}
    >
      <div className='logout-img' onClick={toggleUserPanel} />
      <div
        className={cx('user-panel', {
          'hide-panel': hideUserPanel,
        })}
      >
        {!isEmpty(email) && <div className='user-email'>{email}</div>}
        <div className='logout-button' onClick={handleLogout}>
          Log out
        </div>
      </div>
    </div>
  )
}

UserPanel.propTypes = {
  isLoggedIn: PropTypes.bool,
  searchQuery: PropTypes.string,
  refreshToken: PropTypes.string,
  searchQuerySuggestions: PropTypes.array,
  userInfo: PropTypes.object,
  logOut: PropTypes.func,
  changeSearchQuery: PropTypes.func,
  fetchUserInfo: PropTypes.func,
}

UserPanel.defaultProps = {
  isLoggedIn: false,
  searchQuerySuggestions: [],
  userInfo: {},
  logOut: noop,
  changeSearchQuery: noop,
  fetchUserInfo: noop,
}

export default UserPanel
