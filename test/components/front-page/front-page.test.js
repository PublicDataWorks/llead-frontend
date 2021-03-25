import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'

import FrontPage from 'components/front-page'

describe('FrontPage component', () => {
  it('should fetch data', () => {
    const fetchAnalyticSummarySpy = sinon.spy()
    const fetchDepartmentsSpy = sinon.spy()
    const fetchOfficersSpy = sinon.spy()
    const fetchDocumentsSpy = sinon.spy()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              fetchAnalyticSummary={fetchAnalyticSummarySpy}
              fetchDepartments={fetchDepartmentsSpy}
              fetchOfficers={fetchOfficersSpy}
              fetchDocuments={fetchDocumentsSpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchAnalyticSummarySpy).toHaveBeenCalled()
    expect(fetchDepartmentsSpy).toHaveBeenCalled()
    expect(fetchOfficersSpy).toHaveBeenCalled()
    expect(fetchDocumentsSpy).toHaveBeenCalled()
  })

  describe('recent items', () => {
    it('should fetch recent items', () => {
      const fetchRecentItemsSpy = sinon.spy()
      const recentItemIds = {
        officer_ids: [1, 2, 3],
        department_ids: [3, 7],
        document_ids: [1, 8],
      }

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['/']}>
            <Route path='/'>
              <FrontPage
                recentItemIds={recentItemIds}
                fetchRecentItems={fetchRecentItemsSpy}
              />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(fetchRecentItemsSpy).toHaveBeenCalledWith(recentItemIds)
    })

    it('should not fetch recent items when there is no recent items', () => {
      const fetchRecentItemsSpy = sinon.spy()

      render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['/']}>
            <Route path='/'>
              <FrontPage fetchRecentItems={fetchRecentItemsSpy} />
            </Route>
          </MemoryRouter>
        </Provider>
      )

      expect(fetchRecentItemsSpy).not.toHaveBeenCalled()
    })
  })

  it('should render correctly', () => {
    const cmsData = {
      summary: '<b>Front page</b> summary.',
    }
    const analyticSummary = {
      departmentsCount: 4,
      officersCount: 5,
      documentsCount: 60000,
      recentDepartmentsCount: 1,
      recentOfficersCount: 2,
      recentDocumentsCount: 3,
      recentDays: 30,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage cms={cmsData} analyticSummary={analyticSummary} />
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
    expect(baseElement.textContent).toContain('60,000 documents')
    expect(baseElement.textContent).toContain('+3 in the past 30 days')
  })
})
