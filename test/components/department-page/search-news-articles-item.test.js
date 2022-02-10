import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'
import * as googleAnalytics from 'utils/google-analytics'

import { EVENT_TYPES } from 'constants/common'
import SearchNewsArticleItem from 'components/department-page/featured-search/search-news-articles-item'

describe('Search News Articles Item', () => {
  beforeEach(() => {
    sinon.stub(googleAnalytics, 'analyzeAction')
  })

  it('renders correctly with normal content', () => {
    const newsArticle = {
      id: 25,
      sourceName: 'Source',
      title: 'This is title 1',
      url: 'http://documents.com/hundred/work-1.pdf',
      publishedDate: 'Jan 10, 2021',
      author: 'Staff Writer',
      content: 'Text content key',
      contentHighlight: null,
      authorHighlight: null,
    }

    const container = render(<SearchNewsArticleItem item={newsArticle} />)
    const { getByText, getAllByText } = container

    expect(getAllByText('news')).toBeTruthy()
    expect(getByText('This is title 1').className).toEqual(
      'news-article-item-name'
    )
    expect(getByText('Source').className).toEqual(
      'news-article-item-source-name'
    )
    expect(getByText('Jan 10, 2021').className).toEqual(
      'news-article-item-published-date'
    )
  })

  it('clicks on news article card', () => {
    const windowOpenStub = sinon.stub(window, 'open')

    const newsArticle = {
      id: 25,
      sourceName: 'Source',
      title: 'This is title 1',
      url: 'http://documents.com/hundred/work-1.pdf',
      publishedDate: 'Jan 10, 2021',
      author: 'Staff Writer',
      content: 'Text content key',
      contentHighlight: null,
      authorHighlight: null,
    }

    const container = render(<SearchNewsArticleItem item={newsArticle} />)
    const { baseElement } = container

    const newsArticleItem = baseElement.getElementsByClassName(
      'search-news-article-item'
    )[0]

    fireEvent.click(newsArticleItem)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'http://documents.com/hundred/work-1.pdf',
      '_blank',
      'noopener noreferrer'
    )
  })

  it('analyzes click on news article item', () => {
    sinon.stub(window, 'open')

    const newsArticle = {
      id: 25,
      sourceName: 'Source',
      title: 'This is title 1',
      url: 'http://documents.com/hundred/work-1.pdf',
      publishedDate: 'Jan 10, 2021',
      author: 'Staff Writer',
      content: 'Text content key',
      contentHighlight: null,
      authorHighlight: null,
    }

    const container = render(<SearchNewsArticleItem item={newsArticle} />)
    const { baseElement } = container

    const newsArticleItem = baseElement.getElementsByClassName(
      'search-news-article-item'
    )[0]

    fireEvent.click(newsArticleItem)

    expect(googleAnalytics.analyzeAction).toHaveBeenCalledWith({
      type: EVENT_TYPES.OPEN_ARTICLE,
      data: { article_id: 25 },
    })
  })
})
