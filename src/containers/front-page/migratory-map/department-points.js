import { connect } from 'react-redux'

import DepartmentPoints from 'components/front-page/migratory-map/department-points'
import { departmentCoordinatesSelector } from 'selectors/front-page/migratory-map'

const mapStateToProps = (state) => ({
  departmentCoordinates: departmentCoordinatesSelector(state),
})

export default connect(mapStateToProps, null)(DepartmentPoints)
