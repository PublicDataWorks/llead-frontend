import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'

import NewsArticleCard from 'components/officer-page/timeline/news-article-card'

describe('Timeline news article card component', () => {
  it('renders correctly', () => {
    const props = {
      kind: 'NEWS_ARTICLE',
      id: 1,
      sourceName: 'The Lens NOLA',
      title: 'News Article 2019-06-13',
      url: 'url',
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
      'timeline-news-article-card'
    )[0]

    expect(newsArticleCard.classList.value).toContain('custom-class-name')
    expect(newsArticleCard.textContent.includes(props.title)).toBe(true)
    expect(newsArticleCard.textContent.includes('The Lens NOLA')).toBe(true)
  })

  it('clicks on news article card', () => {
    const windowOpenStub = sinon.stub(window, 'open')
    const props = {
      kind: 'NEWS_ARTICLE',
      id: 1,
      sourceName: 'The Lens NOLA',
      title: 'News Article 2019-06-13',
      url: 'https://i.imgur.com/nHTFohI.csv',
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
      'timeline-news-article-card'
    )[0]
    fireEvent.click(newsArticleCard)

    expect(windowOpenStub).toHaveBeenCalledWith(
      'https://i.imgur.com/nHTFohI.csv',
      '_blank',
      'noopener noreferrer'
    )
  })
})
