import { connect } from 'react-redux'

import { migratoryGraphsSelector } from 'selectors/front-page/migratory-map'
import { setMapCurrentIndex } from 'actions/front-page'
import DepartmentMigration from 'components/front-page/migratory-map/department-migration'

const mapStateToProps = (state) => ({
  graphs: migratoryGraphsSelector(state),
})

const mapDispatchToProps = {
  setMapCurrentIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentMigration)
