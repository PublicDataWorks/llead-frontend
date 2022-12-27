import { connect } from 'react-redux'

import { departmentMigratoryGraphsSelector } from 'selectors/department-page/department-migratory-map'
import DepartmentMigrationData from 'components/department-page/migratory-map/migration-data'

const mapStateToProps = (state) => ({
  graphs: departmentMigratoryGraphsSelector(state),
})

export default connect(mapStateToProps)(DepartmentMigrationData)
