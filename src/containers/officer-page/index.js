import { connect } from 'react-redux'

import Officer from 'components/officer-page'
import {
  officerSelector,
  getIsOfficerRequesting,
  officerRecentDataSelector,
} from 'selectors/officer-page'
import { fetchOfficer } from 'actions/officer-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  officer: officerSelector(state),
  recentData: officerRecentDataSelector(state),
  isRequesting: getIsOfficerRequesting(state),
})

const mapDispatchToProps = {
  fetchOfficer,
  saveRecentItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(Officer)
