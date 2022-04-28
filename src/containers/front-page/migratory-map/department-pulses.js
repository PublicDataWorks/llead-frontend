import { connect } from 'react-redux'

import DepartmentPulses from 'components/front-page/migratory-map/department-pulses'
import { pulsingPointsSelector } from 'selectors/front-page/migratory-map'

const mapStateToProps = (state) => ({
  pulsingPoints: pulsingPointsSelector(state),
})

export default connect(mapStateToProps, null)(DepartmentPulses)
