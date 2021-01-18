import sinon from 'sinon'
import axios from 'axios'

import { get, post } from 'utils/api'
import { API_URL, SIGN_IN_API_URL } from 'constants/api'

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
        `${API_URL}/documents/1`
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
      const dispatch = sinon.spy()

      sinon.stub(axios, 'get').resolves(Promise.reject({ message: 'error' }))

      const getFunc = get(
        [FETCH_START, FETCH_SUCCESS, FETCH_FAILURE],
        `${API_URL}documents/1`
      )()

      await getFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: FETCH_START,
        },
      ])

      expect(axios.get).toHaveBeenCalledWith(`${API_URL}documents/1`, {})
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: FETCH_FAILURE,
          payload: { error: 'error' },
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

      const body = {
        email: 'email@mail.com',
        password: 'password',
      }

      sinon
        .stub(axios, 'post')
        .resolves(Promise.resolve({ data: { accessToken: 'accessToken' } }))

      const postFunc = post(
        [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE],
        SIGN_IN_API_URL,
        body
      )(params)

      await postFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: LOGIN_START,
        },
      ])

      expect(axios.post).toHaveBeenCalledWith(SIGN_IN_API_URL, body, params)
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: LOGIN_SUCCESS,
          payload: { accessToken: 'accessToken' },
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

      const body = {
        email: 'email@mail.com',
        password: 'password',
      }

      sinon.stub(axios, 'post').resolves(Promise.reject({ message: 'error' }))

      const postFunc = post(
        [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE],
        SIGN_IN_API_URL,
        body
      )()

      await postFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: LOGIN_START,
        },
      ])

      expect(axios.post).toHaveBeenCalledWith(SIGN_IN_API_URL, body, {})
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: LOGIN_FAILURE,
          payload: { error: 'error' },
        },
      ])
    })
  })
})
