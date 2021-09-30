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

    const newsArticleItemTypes = baseElement.getElementsByClassName(
      'news-article-item-type'
    )
    const newsArticleItemTitles = baseElement.getElementsByClassName(
      'news-article-item-name'
    )
    const newsArticleItemPublishedDates = baseElement.getElementsByClassName(
      'news-article-item-published-date'
    )
    const newsArticleItemHighlight = baseElement.getElementsByClassName(
      'news-article-item-text-content'
    )
    const newsArticleItemSource = baseElement.getElementsByClassName(
      'news-article-item-source-name'
    )

    expect(newsArticleItemTypes[0].textContent).toContain('news')
    expect(newsArticleItemTitles[0].textContent).toContain('This is title 1')
    expect(newsArticleItemPublishedDates[0].textContent).toContain(
      'Jan 10, 2021'
    )

    expect(newsArticleItemSource[0].textContent).toEqual('Source')
    expect(newsArticleItemHighlight[0].textContent).toEqual(
      'by Staff Writer  Text content key'
    )
  })

  it('should render correctly with highlight content', () => {
    const newsArticle = {
      id: 25,
      sourceName: 'Source',
      title: 'This is title 1',
      url: 'http://documents.com/hundred/work-1.pdf',
      publishedDate: 'Jan 10, 2021',
      author: 'Key Staff Writer',
      content: 'Text content key',
      contentHighlight: 'Text content <em>key</em>',
      authorHighlight: '<em>Key</em> Staff Writer',
    }
    const container = render(<NewsArticleItem {...newsArticle} />)
    const { baseElement } = container

    const newsArticleItemPublishedDates = baseElement.getElementsByClassName(
      'news-article-item-published-date'
    )
    expect(newsArticleItemPublishedDates[0].textContent).toContain(
      'Jan 10, 2021'
    )

    const newsArticleItemHighlight = baseElement.getElementsByClassName(
      'news-article-item-text-content'
    )
    expect(newsArticleItemHighlight[0].textContent).toEqual(
      'by Key Staff Writer  ...Text content key...'
    )
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
