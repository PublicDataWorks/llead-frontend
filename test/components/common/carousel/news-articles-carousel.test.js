import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import NewsArticlesCarousel from 'components/common/carousel/news-articles-carousel'

describe('News article carousel', () => {
  it('should render correctly', () => {
    const newsArticles = [
      {
        id: 1,
        sourceName: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        publishedDate: 'Nov 9, 2020',
      },
      {
        id: 2,
        sourceName: 'The advocate',
        url: 'https://i.imgur.com/news-article2.pdf',
        title: 'news-article-2',
        publishedDate: 'Nov 10, 2020',
      },
    ]
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <NewsArticlesCarousel items={newsArticles} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container
    const carouselItems = baseElement.getElementsByClassName('swiper-slide')

    expect(baseElement.textContent.includes('News')).toBe(true)
    expect(carouselItems[0].textContent.includes('news-article-1')).toBe(true)
    expect(carouselItems[1].textContent.includes('news-article-2')).toBe(true)
  })
})
