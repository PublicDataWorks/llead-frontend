import { connect } from 'react-redux'

import { migrationDetailsSelector } from 'selectors/front-page/migratory-map'
import MigrationDetailsBox from 'components/front-page/migratory-map/migration-details'

const mapStateToProps = (state) => ({
  migratedOfficer: migrationDetailsSelector(state),
})

export default connect(mapStateToProps, null)(MigrationDetailsBox)
