import { connect } from 'react-redux'

import Department from 'components/department-page'
import {
  departmentSelector,
  documentsSelector,
  documentsPaginationSelector,
  getIsRequesting,
} from 'selectors/department-page'
import { fetchDepartment, fetchDocuments } from 'actions/department-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  department: departmentSelector(state),
  documents: documentsSelector(state),
  isRequesting: getIsRequesting(state),
  ...documentsPaginationSelector(state),
})

const mapDispatchToProps = {
  fetchDepartment,
  fetchDocuments,
  saveRecentItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)
