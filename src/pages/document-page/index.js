import { connect } from 'react-redux'

import Document from 'components/document-page'
import { getDocument } from 'selectors/document-page'
import { fetchDocument } from 'actions/document-page'

const mapStateToProps = (state) => ({
  document: getDocument(state),
})

const mapDispatchToProps = {
  fetchDocument,
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)
