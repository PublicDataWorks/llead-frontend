import { connect } from 'react-redux'

import Document from 'components/document-page/document'
import { getDocument } from 'selectors/document-page'
import { fetchDocument } from 'actions/document-page'

const mapStateToProps = (state) => {
  return {
    document: getDocument(state),
  }
}

const mapDispatchToProps = {
  fetchDocument,
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)
