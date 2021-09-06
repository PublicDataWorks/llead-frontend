import downloadFileReducer from 'reducers/officer-page/download-file-reducer'

import {
  OFFICER_TIMELINE_DOWNLOAD_FAILURE,
  OFFICER_TIMELINE_DOWNLOAD_START,
  OFFICER_TIMELINE_DOWNLOAD_SUCCESS,
} from 'action-types/officer-page'

describe('#downloadFileReducer', () => {
  it('should return initial state', () => {
    expect(downloadFileReducer(undefined, {})).toStrictEqual(false)
  })

  it('should handle OFFICER_TIMELINE_DOWNLOAD_START', () => {
    const result = downloadFileReducer([], {
      type: OFFICER_TIMELINE_DOWNLOAD_START,
    })

    expect(result).toStrictEqual(true)
  })

  it('should handle OFFICER_TIMELINE_DOWNLOAD_SUCCESS', () => {
    const result = downloadFileReducer(
      {},
      {
        type: OFFICER_TIMELINE_DOWNLOAD_SUCCESS,
      }
    )

    expect(result).toStrictEqual(false)
  })

  it('should handle OFFICER_TIMELINE_DOWNLOAD_FAILURE', () => {
    const result = downloadFileReducer(
      {},
      {
        type: OFFICER_TIMELINE_DOWNLOAD_FAILURE,
      }
    )

    expect(result).toStrictEqual(false)
  })
})
