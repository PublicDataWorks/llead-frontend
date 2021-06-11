import { connect } from 'react-redux'

import UserPanel from 'components/common/header/user-panel'
import { getRefreshToken, getUserInfo } from 'selectors/common'
import { fetchUserInfo } from 'actions/common/user-info'
import { logOut } from 'actions/authentication'

const mapStateToProps = (state) => ({
  refreshToken: getRefreshToken(state),
  userInfo: getUserInfo(state),
})

const mapDispatchToProps = {
  logOut,
  fetchUserInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
