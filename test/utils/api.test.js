import sinon from 'sinon'
import axiosClient from 'utils/axios-client'
import FileSaver from 'file-saver'

import { download, get, post, deleteApi } from 'utils/api'
import {
  DEPARTMENTS_API_URL,
  TOKEN_API_URL,
  RECENT_ITEMS_API_URL,
} from 'constants/api'

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
        'cancelToken'
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
          },
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
      sinon.stub(axiosClient, 'get').resolves(
        Promise.reject({
          response: {
            data: {
              message: 'error',
            },
          },
        })
      )

      const getFunc = get(
        [FETCH_START, FETCH_SUCCESS, FETCH_FAILURE],
        url,
        'cancelToken'
      )()

      await getFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: FETCH_START,
          request: {
            url,
            params: {},
          },
        },
      ])

      expect(axiosClient.get).toHaveBeenCalledWith(url, {
        params: {},
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: FETCH_FAILURE,
          payload: { message: 'error' },
          request: {
            url,
            params: {},
          },
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
        'cancelToken'
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
          },
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
          },
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

      sinon.stub(axiosClient, 'post').resolves(
        Promise.reject({
          response: {
            data: {
              message: 'error',
            },
          },
        })
      )
      const url = TOKEN_API_URL

      const postFunc = post(
        [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE],
        url,
        'cancelToken'
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
          payload: { message: 'error' },
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

describe('#download', () => {
  const blobStub = sinon.createStubInstance(Blob)

  beforeEach(() => {
    sinon.stub(window, 'Blob').returns(blobStub)
  })

  it('downloads  successfully and saves the file', async () => {
    const DOWNLOAD_START = 'DOWNLOAD_START'
    const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
    const DOWNLOAD_FAILURE = 'DOWNLOAD_FAILURE'

    const fileName = 'download-file-name'
    const fileType = 'download-file-type'
    const requestParams = { field: 'value' }
    const fileParams = { fileName, fileType }
    const params = { ...requestParams, ...fileParams }
    const dispatch = sinon.spy()

    const dataBlob = 'file-data'
    sinon.stub(axiosClient, 'get').resolves(Promise.resolve({ data: dataBlob }))
    sinon.stub(FileSaver, 'saveAs')

    const url = `${DEPARTMENTS_API_URL}1`

    const downloadFunc = download(
      [DOWNLOAD_START, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE],
      url,
      'cancelToken'
    )(params)

    await downloadFunc(dispatch)
    expect(dispatch).toHaveBeenCalledTwice()
    expect(dispatch.getCall(0).args).toStrictEqual([
      {
        type: DOWNLOAD_START,
        request: {
          url,
          params,
        },
      },
    ])

    expect(axiosClient.get).toHaveBeenCalledWith(url, {
      responseType: 'blob',
      params: requestParams,
      cancelToken: 'cancelToken',
    })
    expect(dispatch.getCall(1).args).toStrictEqual([
      {
        type: DOWNLOAD_SUCCESS,
        request: {
          url,
          params,
        },
      },
    ])

    expect(window.Blob).toHaveBeenCalledWith([dataBlob], { type: fileType })
    expect(FileSaver.saveAs).toHaveBeenCalledWith(blobStub, fileName)
  })

  it('downloads error then dispatches error message', async () => {
    const DOWNLOAD_START = 'DOWNLOAD_START'
    const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
    const DOWNLOAD_FAILURE = 'DOWNLOAD_FAILURE'

    const fileName = 'download-file-name'
    const fileType = 'download-file-type'
    const requestParams = { field: 'value' }
    const fileParams = { fileName, fileType }
    const params = { ...requestParams, ...fileParams }
    const dispatch = sinon.spy()

    const url = `${DEPARTMENTS_API_URL}1`

    sinon.stub(axiosClient, 'get').resolves(
      Promise.reject({
        response: {
          data: {
            message: 'error',
          },
        },
      })
    )

    const downloadFunc = download(
      [DOWNLOAD_START, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE],
      url,
      'cancelToken'
    )(params)

    await downloadFunc(dispatch)
    expect(dispatch).toHaveBeenCalledTwice()
    expect(dispatch.getCall(0).args).toStrictEqual([
      {
        type: DOWNLOAD_START,
        request: {
          url,
          params,
        },
      },
    ])

    expect(axiosClient.get).toHaveBeenCalledWith(url, {
      responseType: 'blob',
      params: requestParams,
      cancelToken: 'cancelToken',
    })
    expect(dispatch.getCall(1).args).toStrictEqual([
      {
        type: DOWNLOAD_FAILURE,
        payload: { message: 'error' },
        request: {
          url,
          params,
        },
      },
    ])
  })
})

describe('#deleteApi', () => {
  describe('calls to API server successfully', () => {
    it('dispatches the response data', async () => {
      const DELETE_START = 'DELETE_START'
      const DELETE_SUCCESS = 'DELETE_SUCCESS'
      const DELETE_FAILURE = 'DELETE_FAILURE'
      const params = { type: 'delete-type', id: 'delete-id' }
      const dispatch = sinon.spy()

      const url = RECENT_ITEMS_API_URL

      sinon.stub(axiosClient, 'delete').resolves(
        Promise.resolve({
          data: {
            detail: 'delete successfully',
          },
        })
      )

      const deleteFunc = deleteApi(
        [DELETE_START, DELETE_SUCCESS, DELETE_FAILURE],
        url,
        'cancelToken'
      )(params)

      await deleteFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: DELETE_START,
          request: {
            url,
            params,
          },
        },
      ])

      expect(axiosClient.delete).toHaveBeenCalledWith(RECENT_ITEMS_API_URL, {
        params,
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: DELETE_SUCCESS,
          payload: {
            detail: 'delete successfully',
          },
          request: {
            url,
            params,
          },
        },
      ])
    })
  })

  describe('calls to API server unsuccessfully', () => {
    it('dispatches error message', async () => {
      const DELETE_START = 'DELETE_START'
      const DELETE_SUCCESS = 'DELETE_SUCCESS'
      const DELETE_FAILURE = 'DELETE_FAILURE'
      const dispatch = sinon.spy()
      const params = { type: 'delete-type', id: 'delete-id' }

      sinon.stub(axiosClient, 'delete').resolves(
        Promise.reject({
          response: {
            data: {
              message: 'error',
            },
          },
        })
      )
      const url = RECENT_ITEMS_API_URL

      const deleteFunc = deleteApi(
        [DELETE_START, DELETE_SUCCESS, DELETE_FAILURE],
        url,
        'cancelToken'
      )(params)

      await deleteFunc(dispatch)
      expect(dispatch).toHaveBeenCalledTwice()
      expect(dispatch.getCall(0).args).toStrictEqual([
        {
          type: DELETE_START,
          request: {
            url,
            params,
          },
        },
      ])

      expect(axiosClient.delete).toHaveBeenCalledWith(RECENT_ITEMS_API_URL, {
        params,
        cancelToken: 'cancelToken',
      })
      expect(dispatch.getCall(1).args).toStrictEqual([
        {
          type: DELETE_FAILURE,
          payload: { message: 'error' },
          request: {
            url,
            params,
          },
        },
      ])
    })
  })
})
