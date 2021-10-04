import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import NewsArticleItem from 'components/common/items/news-article-item'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('News Articles Item', () => {
  it('should render correctly with normal content', () => {
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

    const container = render(<NewsArticleItem {...newsArticle} />)
    const { baseElement } = container

    expect(baseElement.textContent.includes('news')).toBe(true)
    expect(baseElement.textContent.includes(newsArticle.sourceName)).toBe(true)
    expect(baseElement.textContent.includes(newsArticle.publishedDate)).toBe(
      true
    )
    expect(baseElement.textContent.includes(newsArticle.author)).toBe(true)
  })

  it('should handle click on news article card', () => {
    const windowOpenStub = sinon.stub(window, 'open')
    const saveRecentItemSpy = sinon.spy()

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

    const container = render(
      <NewsArticleItem
        {...newsArticle}
        saveRecentItem={saveRecentItemSpy}
        recentData={newsArticle}
      />
    )
    const { baseElement } = container

    const newsArticleItem = baseElement.getElementsByClassName(
      'news-article-item'
    )[0]

    fireEvent.click(newsArticleItem)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'http://documents.com/hundred/work-1.pdf',
      '_blank',
      'noopener noreferrer'
    )
    expect(saveRecentItemSpy).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: 25,
      data: { ...newsArticle, date: newsArticle.publishedDate },
    })
  })
})
