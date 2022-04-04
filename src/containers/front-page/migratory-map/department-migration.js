import { connect } from 'react-redux'

import {
  migratoryGraphsSelector,
} from 'selectors/front-page/migratory-map'
import DepartmentMigration from 'components/front-page/migratory-map/department-migration'

const mapStateToProps = (state) => ({
  graphs: migratoryGraphsSelector(state),
})

export default connect(mapStateToProps, null)(DepartmentMigration)
