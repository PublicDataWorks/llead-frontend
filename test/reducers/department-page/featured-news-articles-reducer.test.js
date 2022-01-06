import featuredNewsArticlesReducer from 'reducers/department-page/featured-news-articles-reducer'

import {
  DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_START,
  DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_SUCCESS,
} from 'action-types/department-page'

describe('#featuredNewsArticlesReducer', () => {
  it('returns initial state', () => {
    expect(featuredNewsArticlesReducer(undefined, {})).toStrictEqual([])
  })

  it('handles DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_START', () => {
    const result = featuredNewsArticlesReducer(
      { id: 1 },
      {
        type: DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_START,
      }
    )

    expect(result).toStrictEqual([])
  })

  it('handles DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_SUCCESS', () => {
    const featuredNewsArticlesData = { id: 1, title: 'NewsArticle title' }

    const result = featuredNewsArticlesReducer(
      {},
      {
        type: DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_SUCCESS,
        payload: featuredNewsArticlesData,
      }
    )

    expect(result).toStrictEqual(featuredNewsArticlesData)
  })
})
