import { connect } from 'react-redux'

import { departmentMigratoryInfoSelector } from 'selectors/department-page/department-migratory-map'
import MigratoryInformationBox from 'components/department-page/migratory-map/information-box'

const mapStateToProps = (state) => ({
  information: departmentMigratoryInfoSelector(state),
})

export default connect(mapStateToProps)(MigratoryInformationBox)
