import get from 'lodash/get'

export const getDepartment = (state) =>
  get(state.departmentPage, 'department', {})
