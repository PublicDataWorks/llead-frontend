import { connect } from 'react-redux'

import Department from 'components/department-page'
import {
  departmentSelector,
  getIsDepartmentRequesting,
  departmentRecentDataSelector,
  featuredOfficersSelector,
  featuredDocumentsSelector,
  featuredNewsArticlesSelector,
  datasetsSelector,
} from 'selectors/department-page'
import {
  fetchDepartment,
  fetchFeaturedOfficers,
  fetchFeaturedDocuments,
  fetchFeaturedNewsArticles,
  fetchDatasets,
} from 'actions/department-page'
import { changeSearchDepartment } from 'actions/search-page'
import { saveRecentItem } from 'actions/common/recent-items'
import {
  clearDocumentHead,
  setDocumentHead,
} from 'actions/common/document-head'

const mapStateToProps = (state) => ({
  department: departmentSelector(state),
  featuredOfficers: featuredOfficersSelector(state),
  featuredDocuments: featuredDocumentsSelector(state),
  featuredNewsArticles: featuredNewsArticlesSelector(state),
  datasets: datasetsSelector(state),
  recentData: departmentRecentDataSelector(state),
  isRequesting: getIsDepartmentRequesting(state),
})

const mapDispatchToProps = {
  fetchDepartment,
  fetchFeaturedOfficers,
  fetchFeaturedDocuments,
  fetchFeaturedNewsArticles,
  fetchDatasets,
  saveRecentItem,
  setDocumentHead,
  clearDocumentHead,
  changeSearchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)
