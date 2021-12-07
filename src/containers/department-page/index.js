import { connect } from 'react-redux'

import Department from 'components/department-page'
import {
  departmentSelector,
  documentsSelector,
  documentsPaginationSelector,
  getIsDepartmentRequesting,
  departmentRecentDataSelector,
} from 'selectors/department-page'
import { fetchDepartment, fetchDocuments } from 'actions/department-page'
import { changeSearchDepartment } from 'actions/search-page'
import { saveRecentItem } from 'actions/common/recent-items'
import {
  clearDocumentHead,
  setDocumentHead,
} from 'actions/common/document-head'

const mapStateToProps = (state) => ({
  department: departmentSelector(state),
  recentData: departmentRecentDataSelector(state),
  documents: documentsSelector(state),
  isRequesting: getIsDepartmentRequesting(state),
  ...documentsPaginationSelector(state),
})

const mapDispatchToProps = {
  fetchDepartment,
  fetchDocuments,
  saveRecentItem,
  setDocumentHead,
  clearDocumentHead,
  changeSearchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)
