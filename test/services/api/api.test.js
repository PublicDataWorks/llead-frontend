import sinon from 'sinon'
import axios from 'axios'

import { get } from 'services/api'
import { API_URL } from 'constants/common'

describe('#get', () => {
  describe('calls to API server successfully', () => {
    it('dispatches the response data', async () => {
      const FETCH_START = 'FETCH_START'
      const FETCH_SUCCESS = 'FETCH_SUCCESS'
      const FETCH_FAILURE = 'FETCH_FAILURE'
      const params = { field: 'value' }
      const dispatch = sinon.spy()

      sinon.stub(axios, 'get').resolves(Promise.resolve({ data: { id: 1 } }))

      const getFunc = get(
        [FETCH_START, FETCH_SUCCESS, FETCH_FAILURE],
        '/documents/1'
      )(params)

      await getFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: FETCH_START,
        },
      ])

      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/documents/1`, params)
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: FETCH_SUCCESS,
          payload: { id: 1 },
        },
      ])
    })
  })

  describe('calls to API server unsuccessfully', () => {
    it('dispatches error message', async () => {
      const FETCH_START = 'FETCH_START'
      const FETCH_SUCCESS = 'FETCH_SUCCESS'
      const FETCH_FAILURE = 'FETCH_FAILURE'
      const params = { field: 'value' }
      const dispatch = sinon.spy()

      sinon.stub(axios, 'get').resolves(Promise.reject({ message: 'error' }))

      const getFunc = get(
        [FETCH_START, FETCH_SUCCESS, FETCH_FAILURE],
        '/documents/1'
      )(params)

      await getFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: FETCH_START,
        },
      ])

      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/documents/1`, params)
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: FETCH_FAILURE,
          payload: { error: 'error' },
        },
      ])
    })
  })
})
