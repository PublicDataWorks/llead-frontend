import { connect } from 'react-redux'

import DepartmentMigratoryMap from 'components/department-page/migratory-map'
import { fetchDepartmentMigratoryData } from 'actions/department-page'
import {
  departmentCoordinatesSelector,
  departmentMigratoryGraphsSelector,
  departmentMigratoryInfoSelector,
} from 'selectors/department-page/department-migratory-map'

const mapStateToProps = (state) => ({
  nodes: departmentCoordinatesSelector(state),
  graphs: departmentMigratoryGraphsSelector(state),
  information: departmentMigratoryInfoSelector(state),
})

const mapDispatchToProps = {
  fetchDepartmentMigratoryData,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentMigratoryMap)
