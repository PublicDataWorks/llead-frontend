import { connect } from 'react-redux'

import DocumentHead from 'components/common/higher-order/document-head'
import { getDocumentHead } from 'selectors/common'

const mapStateToProps = (state) => ({
  documentHead: getDocumentHead(state),
})

export default connect(mapStateToProps, null)(DocumentHead)
