import { connect } from 'react-redux'

import Document from './components/document'
import { getDocument } from './services/selectors'
import { fetchDocument } from './services/actions'

const mapStateToProps = (state) => {
  return {
    document: getDocument(state),
  }
}

const mapDispatchToProps = {
  fetchDocument,
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)
