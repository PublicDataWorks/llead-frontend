import { connect } from 'react-redux'

import Header from 'components/common/header'
import { isLoggedInSelector } from 'selectors/common'

import { toggleSearchModal } from 'actions/common/search-feature'
import { getIsSearchModalOpen } from 'selectors/common/search-feature'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  isSearchModalOpen: getIsSearchModalOpen(state),
})

const mapDispatchToProps = {
  toggleSearchModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
