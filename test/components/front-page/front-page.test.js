import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'
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

  it('should render cms correctly', () => {
    const cmsData = {
      summary: '**Front page** summary.',
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage cms={cmsData} />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    const summarySection = baseElement.getElementsByClassName('summary')[0]
    expect(summarySection.textContent).toEqual('Front page summary.')
    expect(
      summarySection.getElementsByTagName('strong')[0].textContent
    ).toEqual('Front page')
  })
})
