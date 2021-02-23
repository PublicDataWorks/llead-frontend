import { connect } from 'react-redux'

import Department from 'components/department-page'
import { departmentSelector } from 'selectors/department-page'
import { fetchDepartment } from 'actions/department-page'

const mapStateToProps = (state) => ({
  department: departmentSelector(state),
})

const mapDispatchToProps = {
  fetchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)
