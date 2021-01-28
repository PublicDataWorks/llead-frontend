import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'

import FrontPage from 'components/front-page'

describe('FrontPage component', () => {
  it('should render correctly', () => {
    const cmsData = {
      summary: '<b>Front page</b> summary.',
    }
    const analyticSummary = {
      departmentsCount: 4,
      officersCount: 5,
      documentsCount: 6,
      recentDepartmentsCount: 1,
      recentOfficersCount: 2,
      recentDocumentsCount: 3,
      recentDays: 30,
    }
    const fetchAnalyticSummary = sinon.spy()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              cms={cmsData}
              fetchAnalyticSummary={fetchAnalyticSummary}
              analyticSummary={analyticSummary}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    expect(screen.getByTestId('test--summary').textContent).toContain(
      'Front page summary.'
    )
    expect(baseElement.textContent).toContain('4 departments')
    expect(baseElement.textContent).toContain('+1 in the past 30 days')
    expect(baseElement.textContent).toContain('5 officers')
    expect(baseElement.textContent).toContain('+2 in the past 30 days')
    expect(baseElement.textContent).toContain('6 documents')
    expect(baseElement.textContent).toContain('+3 in the past 30 days')
    expect(fetchAnalyticSummary).toHaveBeenCalledTimes(1)
  })
})
