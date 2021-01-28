import { connect } from 'react-redux'

import Header from 'components/common/header'
import { isLoggedInSelector } from 'selectors/common'
import { logOut } from 'actions/authentication'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
})

const mapDispatchToProps = {
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
