import React from 'react'
import { render, screen } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'

import FrontPage from 'components/front-page'

describe('FrontPage component', () => {
  it('should render correctly', () => {
    const cmsData = {
      summary: '<b>Front page</b> summary.',
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <Route path='/'>
          <FrontPage cms={cmsData} />
        </Route>
      </MemoryRouter>
    )

    expect(screen.getByTestId('test--summary').textContent).toContain(
      'Front page summary.'
    )
  })
})
