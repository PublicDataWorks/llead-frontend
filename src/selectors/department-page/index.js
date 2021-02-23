import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

const getDepartment = (state) => get(state.departmentPage, 'department', {})

export const departmentSelector = (state) => {
  const wrglAttributes = [
    'id',
    'name',
    'slug',
    'description',
    'url',
    'downloadUrl',
    'defaultExpanded',
  ]
  const departmentAttributes = [
    'id',
    'city',
    'complaintsCount',
    'documentsCount',
    'locationMapUrl',
    'name',
    'parish',
    'officersCount',
  ]

  const rawDepartment = getDepartment(state)
  const rawWrglFiles = get(rawDepartment, 'wrglFiles')

  return {
    ...pick(rawDepartment, departmentAttributes),
    wrglFiles: map(rawWrglFiles, (wrglFile) => pick(wrglFile, wrglAttributes)),
  }
}
