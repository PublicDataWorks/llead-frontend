import config from 'config'
import { OFFICERS_PATH } from 'constants/paths'

const { host } = config

export const complaintItemUrl = (officerId, complaintId) =>
  `${host}${OFFICERS_PATH}${officerId}/?complaint_id=${complaintId}`

export const uofItemUrl = (officerId, useOfForceId) =>
  `${host}${OFFICERS_PATH}${officerId}/?uof_id=${useOfForceId}`

export const appealItemUrl = (officerId, appealId) =>
  `${host}${OFFICERS_PATH}${officerId}/?appeal_id=${appealId}`
