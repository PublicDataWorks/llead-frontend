import { connect } from 'react-redux'

import DepartmentPoints from 'components/front-page/migratory-map/department-points'
import { getDepartmentCoordinates } from 'selectors/front-page/migratory-map'

const mapStateToProps = (state) => ({
  departmentCoordinates: getDepartmentCoordinates(state),
})

export default connect(mapStateToProps, null)(DepartmentPoints)
