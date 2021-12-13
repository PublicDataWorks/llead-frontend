import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import NewsArticleCard from 'components/common/cards/news-article-card'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('News article card component', () => {
  let windowOpenStub
  beforeEach(() => {
    windowOpenStub = sinon.stub(window, 'open')
  })

  it('should render correctly', () => {
    const props = {
      id: 1,
      sourceName: 'The lens',
      url: 'https://i.imgur.com/news-article1.pdf',
      title: 'news-article-1',
      publishedDate: 'Nov 9, 2020',
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <NewsArticleCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const newsArticleCard = baseElement.getElementsByClassName(
      'news-article-card'
    )[0]

    expect(newsArticleCard.classList.value).toContain('custom-class-name')
    expect(newsArticleCard.textContent.includes(props.sourceName)).toBe(true)
    expect(newsArticleCard.textContent.includes(props.title)).toBe(true)
    expect(newsArticleCard.textContent.includes(props.publishedDate)).toBe(true)
  })

  it('should remove correctly', () => {
    const removeRecentItemStub = sinon.stub()
    const saveRecentItemSpy = sinon.spy()
    const props = {
      id: 1,
      sourceName: 'The lens',
      url: 'https://i.imgur.com/news-article1.pdf',
      title: 'news-article-1',
      publishedDate: 'Nov 9, 2020',
      className: 'custom-class-name',
      removeRecentItem: removeRecentItemStub,
      saveRecentItem: saveRecentItemSpy,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <NewsArticleCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const removeIconItem = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeIconItem)

    expect(removeRecentItemStub).toHaveBeenCalledWith({
      id: 1,
      type: 'NEWS_ARTICLE',
    })
  })

  it('should handle click on news article card', () => {
    const saveRecentItemSpy = sinon.spy()
    const newsArticleData = {
      id: 1,
      sourceName: 'The lens',
      url: 'https://i.imgur.com/news-article1.pdf',
      title: 'news-article-1',
      publishedDate: 'Nov 9, 2020',
      className: 'custom-class-name',
    }
    const props = {
      ...newsArticleData,
      saveRecentItem: saveRecentItemSpy,
      recentData: { ...newsArticleData, date: newsArticleData.publishedDate },
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <NewsArticleCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    const newsArticleCard = baseElement.getElementsByClassName(
      'news-article-card'
    )[0]
    fireEvent.click(newsArticleCard)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/news-article1.pdf',
      '_blank',
      'noopener noreferrer'
    )
    expect(saveRecentItemSpy).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: 1,
      data: { ...newsArticleData, date: newsArticleData.publishedDate },
    })
  })
})
