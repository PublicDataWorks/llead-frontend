import { connect } from 'react-redux'

import ContactPage from 'components/contact-page'
import { saveFeedback } from 'actions/contact-page'
import { getResponse } from 'selectors/contact-page'

const mapStateToProps = (state) => ({
  sendMessageResponse: getResponse(state),
})

const mapDispatchToProps = {
  saveFeedback,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
