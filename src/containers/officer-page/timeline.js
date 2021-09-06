import { connect } from 'react-redux'

import Timeline from 'components/officer-page/timeline'
import {
  timelineSelector,
  timelineFilterGroupsSelector,
  getTimelineFilterGroupKey,
  hasEventDetailsSelector,
  isDownloadingFileSelector,
} from 'selectors/officer-page/timeline'
import {
  changeFilterGroupKey,
  fetchOfficerTimeline,
  downloadOfficerTimeline,
} from 'actions/officer-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  timeline: timelineSelector(state),
  timelineFilterGroups: timelineFilterGroupsSelector(state),
  filterGroupKey: getTimelineFilterGroupKey(state),
  hasEventDetails: hasEventDetailsSelector(state),
  isDownloadingFile: isDownloadingFileSelector(state),
})

const mapDispatchToProps = {
  saveRecentItem,
  changeFilterGroupKey,
  fetchOfficerTimeline,
  downloadOfficerTimeline,
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
