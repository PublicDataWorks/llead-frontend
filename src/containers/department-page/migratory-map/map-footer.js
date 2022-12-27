import { connect } from 'react-redux'

import { departmentSelector } from 'selectors/department-page'
import MapFooter from 'components/department-page/migratory-map/map-footer'

const mapStateToProps = (state) => ({
  department: departmentSelector(state),
})

export default connect(mapStateToProps)(MapFooter)
