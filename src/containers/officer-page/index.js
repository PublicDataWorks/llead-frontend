import { connect } from 'react-redux'

import Officer from 'components/officer-page'
import {
  officerSelector,
  getIsOfficerRequesting,
  documentsSelector,
  officerRecentDataSelector,
  timelineSelector,
} from 'selectors/officer-page'
import { fetchOfficer, fetchOfficerDocuments, fetchOfficerTimeline } from 'actions/officer-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  officer: officerSelector(state),
  recentData: officerRecentDataSelector(state),
  documents: documentsSelector(state),
  timeline: timelineSelector(state),
  isRequesting: getIsOfficerRequesting(state),
})

const mapDispatchToProps = {
  fetchOfficer,
  fetchOfficerDocuments,
  fetchOfficerTimeline,
  saveRecentItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(Officer)
