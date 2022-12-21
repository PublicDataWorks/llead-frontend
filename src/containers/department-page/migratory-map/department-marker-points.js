import { connect } from 'react-redux'

import DepartmentMarkerPoints from 'components/department-page/migratory-map/department-marker-points'
import { departmentSelector } from 'selectors/department-page'
import { departmentCoordinatesSelector } from 'selectors/department-page/department-migratory-map'

const mapStateToProps = (state) => ({
  departmentCoordinates: departmentCoordinatesSelector(state),
  department: departmentSelector(state),
})

export default connect(mapStateToProps)(DepartmentMarkerPoints)
