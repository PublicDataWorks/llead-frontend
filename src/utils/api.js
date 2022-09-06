import { saveAs } from 'file-saver'
import lodashGet from 'lodash/get'

import { anonymousClient, authClient, inferClient } from 'utils/axios-client'

const baseGet = (getClient) => (actionTypes, url, cancelToken) => {
  const client = getClient()
  const actionStarted = (request) => ({
    type: actionTypes[0],
    request,
  })

  const actionSuccess = (request, data) => ({
    type: actionTypes[1],
    request,
    payload: data,
  })

  const actionFailure = (request, error) => ({
    type: actionTypes[2],
    request,
    payload: error,
  })

  return (params = {}) => {
    const requestData = {
      url,
      params,
    }
    return (dispatch) => {
      dispatch(actionStarted(requestData))

      return client
        .get(url, { params, cancelToken })
        .then((res) => {
          dispatch(actionSuccess(requestData, res.data))
        })
        .catch((err) => {
          dispatch(actionFailure(requestData, lodashGet(err, 'response.data')))
        })
    }
  }
}

const basePost = (getClient) => (actionTypes, url, cancelToken) => {
  const client = getClient()
  const actionStarted = (request) => ({
    type: actionTypes[0],
    request,
  })

  const actionSuccess = (request, data) => ({
    type: actionTypes[1],
    request,
    payload: data,
  })

  const actionFailure = (request, error) => ({
    type: actionTypes[2],
    request,
    payload: error,
  })

  return (data = {}, params = {}) => {
    const requestData = {
      url,
      data,
      params,
    }
    return (dispatch) => {
      dispatch(actionStarted(requestData))

      return client
        .post(url, data, { params, cancelToken })
        .then((res) => {
          dispatch(actionSuccess(requestData, res.data))
        })
        .catch((err) => {
          dispatch(actionFailure(requestData, lodashGet(err, 'response.data')))
        })
    }
  }
}

const baseDeleteApi = (getClient) => (actionTypes, url, cancelToken) => {
  const client = getClient()
  const actionStarted = (request) => ({
    type: actionTypes[0],
    request,
  })

  const actionSuccess = (request, data) => ({
    type: actionTypes[1],
    request,
    payload: data,
  })

  const actionFailure = (request, error) => ({
    type: actionTypes[2],
    request,
    payload: error,
  })

  return (params = {}) => {
    const requestData = {
      url,
      params,
    }

    return (dispatch) => {
      dispatch(actionStarted(requestData))

      return client
        .delete(url, { params, cancelToken })
        .then((res) => {
          dispatch(actionSuccess(requestData, res.data))
        })
        .catch((err) => {
          dispatch(actionFailure(requestData, lodashGet(err, 'response.data')))
        })
    }
  }
}

const baseDownload = (getClient) => (actionTypes, url, cancelToken) => {
  const client = getClient()
  const actionStarted = (request) => ({
    type: actionTypes[0],
    request,
  })

  const actionSuccess = (request) => ({
    type: actionTypes[1],
    request,
  })

  const actionFailure = (request, error) => ({
    type: actionTypes[2],
    request,
    payload: error,
  })

  return (params = {}) => {
    const { fileName, fileType, ...requestParams } = params
    const requestData = {
      url,
      params,
    }
    return async (dispatch) => {
      dispatch(actionStarted(requestData))

      return client
        .get(url, { responseType: 'blob', params: requestParams, cancelToken })
        .then((res) => {
          const blob = new Blob([res.data], {
            type: fileType,
          })
          saveAs(blob, fileName)

          dispatch(actionSuccess(requestData))
        })
        .catch((err) =>
          dispatch(actionFailure(requestData, lodashGet(err, 'response.data')))
        )
    }
  }
}

const getAnonymousClient = () => anonymousClient
export const get = baseGet(getAnonymousClient)
export const post = basePost(getAnonymousClient)
export const deleteApi = baseDeleteApi(getAnonymousClient)
export const download = baseDownload(getAnonymousClient)

const getAuthClient = () => authClient
export const authGet = baseGet(getAuthClient)
export const authPost = basePost(getAuthClient)
export const authDelete = baseDeleteApi(getAuthClient)
export const authDownload = baseDownload(getAuthClient)

export const inferGet = baseGet(inferClient)
export const inferPost = basePost(inferClient)
export const inferDelete = baseDeleteApi(inferClient)
export const inferDownload = baseDownload(inferClient)
