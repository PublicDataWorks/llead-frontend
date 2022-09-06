import sinon from 'sinon'
import store from 'store'
import axios from 'axios'

import { REFRESH_TOKEN_API_URL } from 'constants/api'
import { HTTP_STATUS_CODES } from 'constants/common'

describe('axios-client request interceptors more cases', () => {
  describe('token is expired', () => {
    const accessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzODM5MDcwLC' +
      'JqdGkiOiI5YmExNTZiMTZmMDU0Y2ZjYjIzODY4Y2QxNGMyZjI0YSJ9.ixdg8N3oqUFFdncy0XqsxbD4-aGrlVg0ENvajwz8qcs'

    beforeEach(() => {
      sinon.stub(store, 'getState').returns({
        token: { access: accessToken, refresh: 'refreshToken' },
      })
      sinon.stub(store, 'dispatch')
    })

    it('requests new token unsuccessfully due to unauthorized', async () => {
      let authClient
      let authenticationActions
      jest.isolateModules(() => {
        authClient = require('utils/axios-client').authClient
        authenticationActions = require('actions/authentication')
      })
      sinon.useFakeTimers(new Date(2021, 1, 20, 16, 50, 10))

      sinon
        .stub(axios, 'post')
        .rejects({ response: { status: HTTP_STATUS_CODES.UNAUTHORIZED } })
      const requestConfig = await authClient.interceptors.request.handlers[0].fulfilled(
        { headers: { responseType: 'json' } }
      )

      expect(axios.post).toHaveBeenCalledWith(REFRESH_TOKEN_API_URL, {
        refresh: 'refreshToken',
      })

      expect(store.dispatch).toHaveBeenCalledWith(
        authenticationActions.removeToken()
      )

      expect(requestConfig).toStrictEqual({
        headers: { Authorization: 'Bearer null', responseType: 'json' },
      })
    })

    it('requests new token unsuccessfully due to no refresh token', async () => {
      store.getState.restore()
      sinon.stub(store, 'getState').returns({
        token: { access: accessToken },
      })

      let authClient
      jest.isolateModules(() => {
        authClient = require('utils/axios-client').authClient
      })

      sinon.useFakeTimers(new Date(2021, 1, 20, 16, 50, 10))

      sinon.stub(axios, 'post').resolves({ data: { access: 'newToken' } })
      const requestConfig = await authClient.interceptors.request.handlers[0].fulfilled(
        {
          headers: { responseType: 'json' },
        }
      )

      expect(axios.post).not.toHaveBeenCalled()
      expect(store.dispatch).not.toHaveBeenCalled()
      expect(requestConfig).toStrictEqual({
        headers: { Authorization: 'Bearer null', responseType: 'json' },
      })
    })
  })
})
