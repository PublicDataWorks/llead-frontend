import { createAction } from 'redux-actions'

import { UPDATE_TOKEN } from 'action-types/authentication'

export const updateToken = createAction(UPDATE_TOKEN)
