import documentHeadReducer from 'reducers/document-head-reducer'

import {
  CLEAR_DOCUMENT_HEAD,
  SET_DOCUMENT_HEAD,
} from 'action-types/common/document-head'
import { DEFAULT_DOCUMENT_HEAD } from 'constants/common'

describe('#documentHeadReducer', () => {
  it('should return initial state', () => {
    expect(documentHeadReducer(undefined, {})).toStrictEqual(
      DEFAULT_DOCUMENT_HEAD
    )
  })

  describe('handle SET_DOCUMENT_HEAD', () => {
    it('merges old state with new action payload', () => {
      const result = documentHeadReducer(
        {
          title: 'old-title',
          description: 'description',
        },
        {
          type: SET_DOCUMENT_HEAD,
          payload: { title: 'new-title' },
        }
      )

      expect(result).toStrictEqual({
        title: 'new-title',
        description: 'description',
      })
    })
  })

  describe('handle CLEAR_DOCUMENT_HEAD', () => {
    it('clears document head', () => {
      const result = documentHeadReducer(
        {
          title: 'old-title',
          description: 'description',
        },
        {
          type: CLEAR_DOCUMENT_HEAD,
          payload: {},
        }
      )

      expect(result).toStrictEqual(DEFAULT_DOCUMENT_HEAD)
    })
  })
})
