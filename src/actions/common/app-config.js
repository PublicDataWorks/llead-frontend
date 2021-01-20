import * as actionTypes from 'action-types/common/app-config'
import { get } from 'utils/api'

import { APP_CONFIG_API_URL } from 'constants/api'

export const fetchAppConfig = () =>
  get(
    [
      actionTypes.APP_CONFIG_FETCH_START,
      actionTypes.APP_CONFIG_FETCH_SUCCESS,
      actionTypes.APP_CONFIG_FETCH_FAILURE,
    ],
    APP_CONFIG_API_URL
  )()
