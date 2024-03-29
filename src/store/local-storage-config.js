import get from 'lodash/get'

export default {
  // eslint-disable-next-line no-unused-vars
  slicer(paths) {
    /* istanbul ignore next */
    return (state) => ({
      token: state.token,
      recentItems: state.recentItems,
      searchFeature: {
        searchQueries: get(state.searchFeature, 'searchQueries'),
      },
    })
  },
}
