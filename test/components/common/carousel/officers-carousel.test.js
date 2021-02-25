import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import OfficersCarousel from 'components/common/carousel/officers-carousel'

describe('Officers carousel', () => {
  it('should render correctly', () => {
    const officers = [
      {
        id: 1,
        name: 'Mark Carlson',
        badges: ['12435', '612'],
        department: {
          id: 9,
          name: 'Baton Rouge Department 1',
        },
      },
      {
        id: 9,
        name: 'Eric Patel',
        badges: [],
        department: null,
      },
    ]
    const container = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <OfficersCarousel items={officers} />
        </Route>
      </MemoryRouter>
    )
    const { baseElement } = container

    expect(baseElement.textContent.includes('Officers')).toBe(true)
    expect(baseElement.textContent.includes('Mark Carlson')).toBe(true)
    expect(baseElement.textContent.includes('Eric Patel')).toBe(true)
  })
})
