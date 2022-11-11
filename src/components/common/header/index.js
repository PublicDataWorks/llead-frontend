import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import noop from 'lodash/noop'

import './header.scss'
import UserPanel from 'containers/common/header/user-panel'
import SearchFeature from 'containers/common/search-feature'
import Input from 'components/common/inputs/input'
import SearchSVG from 'assets/icons/search.svg'
import { FRONT_PAGE_PATH } from 'constants/paths'
import Navbar from 'components/common/navbar'
import Menu from 'components/common/menu'

const Header = (props) => {
  const { isLoggedIn, isSearchModalOpen, toggleSearchModal } = props

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openSearchModal = () => {
    toggleSearchModal(true)
  }

  const closeSearchModal = () => {
    toggleSearchModal(false)
  }

  return (
    <div className='header'>
      {isMenuOpen && <Menu closeMenu={toggleMenu} />}
      <div className='navigation'>
        <div className='hamburger-button' onClick={toggleMenu} />
        <Link to={FRONT_PAGE_PATH} className='logo'>
          LLEAD
        </Link>
        <Navbar />
      </div>

      <SearchFeature
        isSearchModalOpen={isSearchModalOpen}
        searchModalOnClose={closeSearchModal}
        itemType='all'
      />
      <div className='search-and-logout'>
        <div className='search-icon' onClick={openSearchModal} />
        <div className='search-container'>
          <Input
            iconSrc={SearchSVG}
            placeholder='Search by name, agency, or keyword'
            className='search-input'
            onClick={openSearchModal}
            readOnly
          />
        </div>

        {isLoggedIn && <UserPanel />}
      </div>
    </div>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  isSearchModalOpen: PropTypes.bool,
  toggleSearchModal: PropTypes.func,
}

Header.defaultProps = {
  isLoggedIn: false,
  isSearchModalOpen: false,
  toggleSearchModal: noop,
}

export default Header
