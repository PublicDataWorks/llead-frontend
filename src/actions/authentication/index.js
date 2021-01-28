import { createAction } from 'redux-actions'

import { UPDATE_TOKEN, LOG_OUT } from 'action-types/authentication'

export const updateToken = createAction(UPDATE_TOKEN)
export const logOut = createAction(LOG_OUT)
