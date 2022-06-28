import * as actionTypes from 'action-types/about-page'
import { get } from 'utils/api'
import { Q_AND_A_API_URL } from 'constants/api'

export const fetchQAA = () =>
  get(
    [
      actionTypes.Q_AND_A_FETCH_START,
      actionTypes.Q_AND_A_FETCH_SUCCESS,
      actionTypes.Q_AND_A_FETCH_FAILURE,
    ],
    `${Q_AND_A_API_URL}`
  )()
