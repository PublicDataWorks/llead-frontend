import kebabCase from 'lodash/kebabCase'

import { DEPARTMENTS_PATH, OFFICERS_PATH } from 'constants/paths'

export const departmentPath = (id) => `${DEPARTMENTS_PATH}${id}/`

export const generateOfficerSlug = (officerName) => kebabCase(officerName)

export const officerPath = (id, name) =>
  `${OFFICERS_PATH}${id}/${generateOfficerSlug(name)}`
