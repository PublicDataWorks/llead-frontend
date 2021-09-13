import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import NewsArticleCard from 'components/common/cards/news-article-card'

describe('News article card component', () => {
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
})
