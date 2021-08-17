import { connect } from 'react-redux'

import Officer from 'components/officer-page'
import {
  officerSelector,
  getIsOfficerRequesting,
  officerRecentDataSelector,
} from 'selectors/officer-page'
import { fetchOfficer } from 'actions/officer-page'
import { saveRecentItem } from 'actions/common/recent-items'
import { timelinePeriodSelector } from 'selectors/officer-page/timeline'
import {
  clearDocumentHead,
  setDocumentHead,
} from 'actions/common/document-head'

const mapStateToProps = (state) => ({
  officer: officerSelector(state),
  timelinePeriod: timelinePeriodSelector(state),
  recentData: officerRecentDataSelector(state),
  isRequesting: getIsOfficerRequesting(state),
})

const mapDispatchToProps = {
  fetchOfficer,
  saveRecentItem,
  clearDocumentHead,
  setDocumentHead,
}

export default connect(mapStateToProps, mapDispatchToProps)(Officer)
