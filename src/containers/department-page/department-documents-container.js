import { connect } from 'react-redux'

import { fetchDocuments } from 'actions/department-page'
import {
  documentsSelector,
  documentsPaginationSelector,
} from 'selectors/department-page'
import DepartmentDocuments from 'components/department-page/department-documents'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  documents: documentsSelector(state),
  ...documentsPaginationSelector(state),
})

const mapDispatchToProps = {
  fetchDocuments,
  saveRecentItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDocuments)
