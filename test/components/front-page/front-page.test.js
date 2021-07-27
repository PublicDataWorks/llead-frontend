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

  it('should render correctly', () => {
    const cmsData = {
      summary: '**Front page** summary.',
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

    const summarySection = baseElement.getElementsByClassName('summary')[0]
    expect(summarySection.textContent).toEqual('Front page summary.')
    expect(
      summarySection.getElementsByTagName('strong')[0].textContent
    ).toEqual('Front page')

    expect(baseElement.textContent).toContain('4 departments')
    expect(baseElement.textContent).toContain('+1 in the past\u00A030 days')
    expect(baseElement.textContent).toContain('5 officers')
    expect(baseElement.textContent).toContain('+2 in the past\u00A030 days')
    expect(baseElement.textContent).toContain('60,000 documents')
    expect(baseElement.textContent).toContain('+3 in the past\u00A030 days')
  })
})
