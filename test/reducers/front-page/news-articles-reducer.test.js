import newsArticlesReducer from 'reducers/front-page/news-articles-reducer'

import { NEWS_ARTICLES_FETCH_SUCCESS } from 'action-types/front-page'

describe('#newsArticlesReducer', () => {
  it('should return initial state', () => {
    expect(newsArticlesReducer(undefined, {})).toStrictEqual([])
  })

  it('should handle NEWS_ARTICLES_FETCH_SUCCESS', () => {
    const newsArticles = [
      {
        id: 1,
        source_name: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        date: 'Nov 9, 2020',
      },
      {
        id: 2,
        source_name: 'The advocate',
        url: 'https://i.imgur.com/news-article2.pdf',
        title: 'news-article-2',
        date: 'Nov 10, 2020',
      },
    ]

    const result = newsArticlesReducer(
      {},
      {
        type: NEWS_ARTICLES_FETCH_SUCCESS,
        payload: newsArticles,
      }
    )

    expect(result).toStrictEqual(newsArticles)
  })
})
