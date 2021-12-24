import { saveAs } from 'file-saver'
import lodashGet from 'lodash/get'

import axiosClient from 'utils/axios-client'

export const get = (actionTypes, url, cancelToken) => {
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

      return axiosClient
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

export const post = (actionTypes, url, cancelToken) => {
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

      return axiosClient
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

export const deleteApi = (actionTypes, url, cancelToken) => {
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

      return axiosClient
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

export const download = (actionTypes, url, cancelToken) => {
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

      return axiosClient
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
