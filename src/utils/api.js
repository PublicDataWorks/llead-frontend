import axiosClient from 'utils/axios-client'

export const get = (actionTypes, url) => {
  const actionStarted = () => ({
    type: actionTypes[0],
  })

  const actionSuccess = (data) => ({
    type: actionTypes[1],
    payload: data,
  })

  const actionFailure = (error) => ({
    type: actionTypes[2],
    payload: {
      error,
    },
  })

  return (params = {}) => {
    return (dispatch) => {
      dispatch(actionStarted())

      return axiosClient
        .get(url, params)
        .then((res) => {
          dispatch(actionSuccess(res.data))
        })
        .catch((err) => {
          dispatch(actionFailure(err.message))
        })
    }
  }
}

export const post = (actionTypes, url) => {
  const actionStarted = () => ({
    type: actionTypes[0],
  })

  const actionSuccess = (data) => ({
    type: actionTypes[1],
    payload: data,
  })

  const actionFailure = (error) => ({
    type: actionTypes[2],
    payload: {
      error,
    },
  })

  return (payload = {}, params = {}) => {
    return (dispatch) => {
      dispatch(actionStarted())

      return axiosClient
        .post(url, payload, params)
        .then((res) => {
          dispatch(actionSuccess(res.data))
        })
        .catch((err) => {
          dispatch(actionFailure(err.message))
        })
    }
  }
}
