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
          dispatch(actionFailure(requestData, err.response.data))
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
          dispatch(actionFailure(requestData, err.response.data))
        })
    }
  }
}
