import * as actionTypes from 'action-types/common/user-info'
import { get } from 'utils/api'

import { USER_INFO_API_URL } from 'constants/api'

export const fetchUserInfo = () =>
  get(
    [
      actionTypes.USER_INFO_FETCH_START,
      actionTypes.USER_INFO_FETCH_SUCCESS,
      actionTypes.USER_INFO_FETCH_FAILURE,
    ],
    USER_INFO_API_URL
  )()
