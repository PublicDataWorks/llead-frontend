import sinon from 'sinon'
import axiosClient from 'utils/axios-client'

import { get, post } from 'utils/api'
import { DEPARTMENTS_API_URL, TOKEN_API_URL } from 'constants/api'

describe('#get', () => {
  describe('calls to API server successfully', () => {
    it('dispatches the response data', async () => {
      const FETCH_START = 'FETCH_START'
      const FETCH_SUCCESS = 'FETCH_SUCCESS'
      const FETCH_FAILURE = 'FETCH_FAILURE'
      const params = { field: 'value' }
      const dispatch = sinon.spy()

      sinon
        .stub(axiosClient, 'get')
        .resolves(Promise.resolve({ data: { id: 1 } }))

      const url = `${DEPARTMENTS_API_URL}1`

      const getFunc = get(
        [FETCH_START, FETCH_SUCCESS, FETCH_FAILURE],
        url,
        'cancelToken',
      )(params)

      await getFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: FETCH_START,
          request: {
            url,
            params,
          },
        },
      ])

      expect(axiosClient.get).toHaveBeenCalledWith(url, {
        params,
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: FETCH_SUCCESS,
          payload: { id: 1 },
          request: {
            url,
            params,
          }
        },
      ])
    })
  })

  describe('calls to API server unsuccessfully', () => {
    it('dispatches error message', async () => {
      const FETCH_START = 'FETCH_START'
      const FETCH_SUCCESS = 'FETCH_SUCCESS'
      const FETCH_FAILURE = 'FETCH_FAILURE'
      const dispatch = sinon.spy()

      const url = `${DEPARTMENTS_API_URL}1`
      sinon
        .stub(axiosClient, 'get')
        .resolves(Promise.reject({ message: 'error' }))

      const getFunc = get(
        [FETCH_START, FETCH_SUCCESS, FETCH_FAILURE],
        url,
        'cancelToken',
      )()

      await getFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: FETCH_START,
          request: {
            url,
            params: {},
          }
        },
      ])

      expect(axiosClient.get).toHaveBeenCalledWith(url, {
        params: {},
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: FETCH_FAILURE,
          payload: { error: 'error' },
          request: {
            url,
            params: {},
          }
        },
      ])
    })
  })
})

describe('#post', () => {
  describe('calls to API server successfully', () => {
    it('dispatches the response data', async () => {
      const LOGIN_START = 'LOGIN_START'
      const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
      const LOGIN_FAILURE = 'LOGIN_FAILURE'
      const params = { field: 'value' }
      const dispatch = sinon.spy()

      const data = {
        email: 'email@mail.com',
        password: 'password',
      }

      const url = TOKEN_API_URL

      sinon
        .stub(axiosClient, 'post')
        .resolves(Promise.resolve({ data: { access: 'accessToken' } }))

      const postFunc = post(
        [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE],
        url,
        'cancelToken',
      )(data, params)

      await postFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: LOGIN_START,
          request: {
            url,
            data,
            params,
          }
        },
      ])

      expect(axiosClient.post).toHaveBeenCalledWith(TOKEN_API_URL, data, {
        params,
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: LOGIN_SUCCESS,
          payload: { access: 'accessToken' },
          request: {
            url,
            data,
            params,
          }
        },
      ])
    })
  })

  describe('calls to API server unsuccessfully', () => {
    it('dispatches error message', async () => {
      const LOGIN_START = 'LOGIN_START'
      const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
      const LOGIN_FAILURE = 'LOGIN_FAILURE'
      const dispatch = sinon.spy()

      const data = {
        email: 'email@mail.com',
        password: 'password',
      }

      sinon
        .stub(axiosClient, 'post')
        .resolves(Promise.reject({ message: 'error' }))
      const url = TOKEN_API_URL

      const postFunc = post(
        [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE],
        url,
        'cancelToken',
      )(data)

      await postFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: LOGIN_START,
          request: {
            url,
            data,
            params: {},
          },
        },
      ])

      expect(axiosClient.post).toHaveBeenCalledWith(TOKEN_API_URL, data, {
        params: {},
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: LOGIN_FAILURE,
          payload: { error: 'error' },
          request: {
            url,
            data,
            params: {},
          },
        },
      ])
    })
  })
})
