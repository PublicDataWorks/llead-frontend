import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import NewsArticlesList from 'components/search-page/search-results/news-articles-list'

const mockHistoryReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}))

describe('News Articles List', () => {
  beforeEach(() => {
    mockHistoryReplace.mockClear()
  })

  it('should render correctly', () => {
    const newsArticles = [
      {
        id: 25,
        sourceName: 'Source',
        title: 'This is title 1',
        url: 'http://documents.com/hundred/work-1.pdf',
        date: '2021-01-10',
        author: 'Staff Writer',
        content: 'Text content key',
        contentHighlight: 'Text content <em>key</em>',
        authorHighlight: null,
      },
      {
        id: 27,
        sourceName: 'Source',
        title: 'This is title 2',
        url: 'http://documents.com/hundred/work-2.pdf',
        date: '2021-01-11',
        author: 'Author key',
        content: 'Text content',
        contentHighlight: null,
        authorHighlight: 'Author <em>key</em>',
      },
    ]
    const container = render(<NewsArticlesList items={newsArticles} />)
    const { baseElement } = container

    const newsArticlesListTitle = baseElement.getElementsByClassName(
      'news-articles-list-title'
    )[0]
    const newsArticleItemsList = baseElement.getElementsByClassName(
      'news-article-item'
    )

    expect(newsArticlesListTitle.textContent.includes('News Articles')).toBe(
      true
    )
    expect(newsArticleItemsList.length).toBe(2)
    expect(
      newsArticleItemsList[0].textContent.includes('This is title 1')
    ).toBe(true)
  })

  it('should render show more and perform search more', () => {
    const newsArticles = [
      {
        id: 25,
        sourceName: 'Source',
        title: 'This is title 1',
        url: 'http://documents.com/hundred/work-1.pdf',
        date: '2021-01-10',
        author: 'Staff Writer',
        content: 'Text content key',
        contentHighlight: 'Text content <em>key</em>',
        authorHighlight: null,
      },
      {
        id: 27,
        sourceName: 'Source',
        title: 'This is title 2',
        url: 'http://documents.com/hundred/work-2.pdf',
        date: '2021-01-11',
        author: 'Author key',
        content: 'Text content',
        contentHighlight: null,
        authorHighlight: 'Author <em>key</em>',
      },
    ]
    const params = {
      limit: 2,
      offset: 1,
      count: 10,
      q: 'article',
    }
    const searchQuery = 'key'
    const changeSearchQuery = sinon.stub()
    const performSearch = sinon.stub()

    const container = render(
      <NewsArticlesList
        items={newsArticles}
        params={params}
        searchQuery={searchQuery}
        performSearch={performSearch}
        changeSearchQuery={changeSearchQuery}
      />
    )

    const { baseElement } = container

    const newsArticlesListTitle = baseElement.getElementsByClassName(
      'news-articles-list-title'
    )[0]
    const newsArticleItemsList = baseElement.getElementsByClassName(
      'news-article-item'
    )

    expect(newsArticlesListTitle.textContent.includes('News Articles')).toBe(
      true
    )
    expect(newsArticleItemsList.length).toBe(2)
    expect(
      newsArticleItemsList[0].textContent.includes('This is title 1')
    ).toBe(true)

    const showMoreButton = baseElement.getElementsByClassName(
      'news-articles-search-more'
    )[0]
    expect(showMoreButton).toBeTruthy()
    fireEvent.click(showMoreButton)

    const expectedNewLocation = {
      pathname: '/search/',
      search: '?q=article%3A%20key',
    }

    expect(changeSearchQuery).toHaveBeenCalledWith('article: key')
    expect(mockHistoryReplace).toHaveBeenCalledWith(expectedNewLocation)
  })
})
