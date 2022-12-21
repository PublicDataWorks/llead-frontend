import { connect } from 'react-redux'

import {
  departmentCoordinatesSelector,
  departmentMigratoryGraphsSelector,
} from 'selectors/department-page/department-migratory-map'
import { departmentSelector } from 'selectors/department-page'
import DepartmentMigrationData from 'components/department-page/migratory-map/migration-data'

const mapStateToProps = (state) => ({
  nodes: departmentCoordinatesSelector(state),
  graphs: departmentMigratoryGraphsSelector(state),
  department: departmentSelector(state),
})

export default connect(mapStateToProps)(DepartmentMigrationData)
