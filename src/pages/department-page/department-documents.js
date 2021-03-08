import { connect } from 'react-redux'

import { fetchDocuments } from 'actions/department-page'
import {
  documentsSelector,
  documentsPaginationSelector,
} from 'selectors/department-page'
import DepartmentDocuments from 'components/department-page/department-documents'

const mapStateToProps = (state) => ({
  documents: documentsSelector(state),
  ...documentsPaginationSelector(state),
})

const mapDispatchToProps = {
  fetchDocuments,
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDocuments)
