import { connect } from 'react-redux'

import Department from 'components/department-page'
import {
  departmentSelector,
  documentsSelector,
  documentsPaginationSelector,
} from 'selectors/department-page'
import { fetchDepartment, fetchDocuments } from 'actions/department-page'

const mapStateToProps = (state) => ({
  department: departmentSelector(state),
  documents: documentsSelector(state),
  ...documentsPaginationSelector(state),
})

const mapDispatchToProps = {
  fetchDepartment,
  fetchDocuments,
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)