import { createAction } from 'redux-actions'

import * as actionTypes from 'action-types/authentication'
import { LOG_OUT_API_URL } from 'constants/api'
import { authPost } from 'utils/api'

export const updateToken = createAction(actionTypes.UPDATE_TOKEN)

export const removeToken = createAction(actionTypes.REMOVE_TOKEN)

export const logOut = (params) =>
  authPost(
    [
      actionTypes.LOG_OUT_START,
      actionTypes.LOG_OUT_SUCCESS,
      actionTypes.LOG_OUT_FAILURE,
    ],
    `${LOG_OUT_API_URL}`
  )(params)
