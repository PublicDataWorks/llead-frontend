import { connect } from 'react-redux'

import Timeline from 'components/officer-page/timeline'
import {
  timelineSelector,
  timelineFilterGroupsSelector,
  getTimelineFilterGroupKey,
  hasEventDetailsSelector,
} from 'selectors/officer-page/timeline'
import {
  changeFilterGroupKey,
  fetchOfficerTimeline,
} from 'actions/officer-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  timeline: timelineSelector(state),
  timelineFilterGroups: timelineFilterGroupsSelector(state),
  filterGroupKey: getTimelineFilterGroupKey(state),
  hasEventDetails: hasEventDetailsSelector(state),
})

const mapDispatchToProps = {
  saveRecentItem,
  changeFilterGroupKey,
  fetchOfficerTimeline,
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
