import { connect } from 'react-redux'

import IntroSection from 'components/front-page/intro-section'
import {
  analyticSummarySelector,
  frontPageCardsSelector,
} from 'selectors/front-page/intro-section'
import { fetchAnalyticSummary, fetchFrontPageCards } from 'actions/front-page'

const mapStateToProps = (state) => ({
  analyticSummary: analyticSummarySelector(state),
  frontPageCards: frontPageCardsSelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
  fetchFrontPageCards,
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroSection)
