import sinon from 'sinon'
import store from 'store'
import axios from 'axios'

import axiosClient from 'utils/axios-client'
import { REFRESH_TOKEN_API_URL } from 'constants/api'

describe('axios-client request interceptors', () => {
  describe('token is empty', () => {
    it('returns correct headers', async () => {
      const requestConfig = await axiosClient.interceptors.request.handlers[0].fulfilled(
        { headers: {} }
      )

      expect(requestConfig).toStrictEqual({ headers: {} })
    })
  })

  describe('token is not empty', () => {
    // This is a jwt token generated for testing only which expired at 2021/1/20 16:37:50
    const accessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzODM5MDcwLC' +
      'JqdGkiOiI5YmExNTZiMTZmMDU0Y2ZjYjIzODY4Y2QxNGMyZjI0YSJ9.ixdg8N3oqUFFdncy0XqsxbD4-aGrlVg0ENvajwz8qcs'

    beforeEach(() => {
      sinon.stub(store, 'getState').returns({
        token: { access: accessToken, refresh: 'refreshToken' },
      })
    })

    describe('token is not expired', () => {
      it('returns correct headers', async () => {
        sinon.useFakeTimers(new Date(2021, 1, 20, 16, 37, 45))

        const requestConfig = await axiosClient.interceptors.request.handlers[0].fulfilled(
          { headers: { responseType: 'json' } }
        )

        expect(requestConfig).toStrictEqual({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            responseType: 'json',
          },
        })
      })
    })

    describe('token is expired', () => {
      it('requests new token successfully', async () => {
        sinon.useFakeTimers(new Date(2021, 1, 20, 16, 50, 10))

        sinon.stub(axios, 'post').resolves({ data: { access: 'newToken' } })
        const requestConfig = await axiosClient.interceptors.request.handlers[0].fulfilled(
          { headers: { responseType: 'json' } }
        )

        expect(axios.post).toHaveBeenCalledWith(REFRESH_TOKEN_API_URL, {
          refresh: 'refreshToken',
        })
        expect(requestConfig).toStrictEqual({
          headers: { Authorization: 'Bearer newToken', responseType: 'json' },
        })
      })

      it('requests new token unsuccessfully', async () => {
        sinon.useFakeTimers(new Date(2021, 1, 20, 16, 50, 10))

        sinon.stub(axios, 'post').rejects({})
        const requestConfig = await axiosClient.interceptors.request.handlers[0].fulfilled(
          { headers: { responseType: 'json' } }
        )

        expect(axios.post).toHaveBeenCalledWith(REFRESH_TOKEN_API_URL, {
          refresh: 'refreshToken',
        })
        expect(requestConfig).toStrictEqual({
          headers: { responseType: 'json' },
        })
      })
    })
  })
})
