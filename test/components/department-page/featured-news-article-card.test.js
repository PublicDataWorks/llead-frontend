import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import FeaturedNewsArticleCard from 'components/department-page/featured-items/featured-news-article-card'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('Featured news article card component', () => {
  let windowOpenStub
  beforeEach(() => {
    windowOpenStub = sinon.stub(window, 'open')
  })

  it('renders correctly', () => {
    const props = {
      item: {
        id: 1,
        sourceName: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        publishedDate: 'Nov 9, 2020',
        isStarred: true,
      },
      className: 'custom-class-name',
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedNewsArticleCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement, getByText } = container
    const featuredNewsArticleCard = baseElement.getElementsByClassName(
      'featured-news-article-card'
    )[0]

    expect(featuredNewsArticleCard.classList.value).toContain(
      'custom-class-name'
    )
    expect(
      featuredNewsArticleCard.getElementsByClassName('star-corner')[0].classList
        .length
    ).toEqual(1)
    expect(getByText('news-article-1').className).toEqual('news-article-title')
    expect(getByText('Nov 9, 2020').className).toEqual('news-article-subtitle')
    expect(getByText('The lens').className).toEqual('news-article-subtitle')
  })

  it('handles click on news article card', () => {
    const saveRecentItemSpy = sinon.spy()
    const newsArticleData = {
      id: 1,
      sourceName: 'The lens',
      url: 'https://i.imgur.com/news-article1.pdf',
      title: 'news-article-1',
      publishedDate: 'Nov 9, 2020',
      isStarred: true,
    }
    const props = {
      item: newsArticleData,
      className: 'custom-class-name',
      saveRecentItem: saveRecentItemSpy,
    }

    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FeaturedNewsArticleCard {...props} />)
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    const featuredNewsArticleCard = baseElement.getElementsByClassName(
      'featured-news-article-card'
    )[0]
    fireEvent.click(featuredNewsArticleCard)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/news-article1.pdf',
      '_blank',
      'noopener noreferrer'
    )
    expect(saveRecentItemSpy).toHaveBeenCalledWith({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: 1,
      data: newsArticleData,
    })
  })
})
