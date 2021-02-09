import { connect } from 'react-redux'

import Department from 'components/department-page'
import { getDepartment } from 'selectors/department-page'
import { fetchDepartment } from 'actions/department-page'

const mapStateToProps = (state) => ({
  department: getDepartment(state),
})

const mapDispatchToProps = {
  fetchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)
