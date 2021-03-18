import { connect } from 'react-redux'

import Officer from 'components/officer-page'
import {
  officerSelector,
  getIsOfficerRequesting,
  documentsSelector,
} from 'selectors/officer-page'
import { fetchOfficer, fetchOfficerDocuments } from 'actions/officer-page'

const mapStateToProps = (state) => ({
  officer: officerSelector(state),
  documents: documentsSelector(state),
  isOfficerRequesting: getIsOfficerRequesting(state),
})

const mapDispatchToProps = {
  fetchOfficer,
  fetchOfficerDocuments,
}

export default connect(mapStateToProps, mapDispatchToProps)(Officer)
