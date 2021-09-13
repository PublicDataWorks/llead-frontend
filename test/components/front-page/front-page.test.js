import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'

import FrontPage from 'components/front-page'
import { RECENT_ITEM_TYPES } from 'constants/common'

describe('FrontPage component', () => {
  it('should fetch data', () => {
    const fetchAnalyticSummarySpy = sinon.spy()
    const fetchDepartmentsSpy = sinon.spy()
    const fetchOfficersSpy = sinon.spy()
    const fetchDocumentsSpy = sinon.spy()
    const fetchNewsArticlesSpy = sinon.spy()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              fetchAnalyticSummary={fetchAnalyticSummarySpy}
              fetchDepartments={fetchDepartmentsSpy}
              fetchOfficers={fetchOfficersSpy}
              fetchDocuments={fetchDocumentsSpy}
              fetchNewsArticles={fetchNewsArticlesSpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchAnalyticSummarySpy).toHaveBeenCalled()
    expect(fetchDepartmentsSpy).toHaveBeenCalled()
    expect(fetchOfficersSpy).toHaveBeenCalled()
    expect(fetchDocumentsSpy).toHaveBeenCalled()
    expect(fetchNewsArticlesSpy).toHaveBeenCalled()
  })

  it('should render correctly', () => {
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

  it('should render multi data correctly', () => {
    const cmsData = {
      summary: '**Front page** summary.',
    }
    const newsArticlesData = [
      {
        id: 1,
        sourceName: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        publishedDate: 'Nov 9, 2020',
      },
    ]
    const recentItemsData = [
      {
        ...newsArticlesData[0],
        type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      },
    ]
    const documentsData = [
      {
        id: 36,
        documentType: 'csv',
        title: 'Her hard step sea.',
        url: 'http://documents.com/century/five.pdf',
        previewImageUrl: '/cell/least.jpg',
        incidentDate: 'Jan 6, 2020',
        pagesCount: 5,
        departments: [
          {
            id: 22,
            name: 'Petersonmouth Department',
          },
        ],
      },
    ]
    const officersData = [
      {
        id: 23,
        name: 'Mark Carlson',
        badges: ['12345', '567'],
        department: {
          id: 'north-paulaberg-department',
          name: 'North Paulaberg Department',
        },
      },
    ]
    const departmentsData = [
      {
        id: '1',
        name: 'Baton Rouge Department',
        city: 'Baton Rouge',
        parish: 'East Baton Rouge',
        locationMapUrl: 'http://mapurl.com/department1',
      },
    ]

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              cms={cmsData}
              departments={departmentsData}
              officers={officersData}
              newsArticles={newsArticlesData}
              documents={documentsData}
              recentItems={recentItemsData}
            />
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

    const recentItemSection = baseElement.getElementsByClassName(
      'recent-items-carousel'
    )[0]
    const departmentSection = baseElement.getElementsByClassName(
      'departments-carousel'
    )[0]
    const newsActicleSection = baseElement.getElementsByClassName(
      'news-articles-carousel'
    )[0]
    const documentSection = baseElement.getElementsByClassName(
      'documents-carousel'
    )[0]
    const officerSection = baseElement.getElementsByClassName(
      'officers-carousel'
    )[0]

    expect(recentItemSection.textContent).toContain('Recent activity')
    expect(departmentSection.textContent).toContain('Departments')
    expect(newsActicleSection.textContent).toContain('News')
    expect(documentSection.textContent).toContain('Documents')
    expect(officerSection.textContent).toContain('Officers')
  })
})
