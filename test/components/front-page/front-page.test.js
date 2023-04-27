import React from 'react'
import sinon from 'sinon'
import { fireEvent, render, act } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MockStore from 'redux-mock-store'
import * as rdd from 'react-device-detect'

import FrontPage from 'components/front-page'
import { RECENT_ITEM_TYPES } from 'constants/common'
import IntroSection from 'containers/front-page/intro-section'
import Findings from 'containers/front-page/findings'

jest.mock('containers/front-page/intro-section', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockIntroSectionComponent = () => {
  return <div>Intro Section</div>
}

jest.mock('containers/front-page/findings', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}))

const MockFindingsComponent = () => {
  return <div>Findings Section</div>
}

beforeAll(() => {
  IntroSection.mockImplementation(MockIntroSectionComponent)
  Findings.mockImplementation(MockFindingsComponent)
})

beforeEach(() => {
  IntroSection.mockClear()
  Findings.mockClear()
})

describe('FrontPage component', () => {
  it('should fetch data', () => {
    const fetchDepartmentsSpy = sinon.spy()
    const fetchOfficersSpy = sinon.spy()
    const fetchDocumentsSpy = sinon.spy()
    const fetchNewsArticlesSpy = sinon.spy()
    const fetchFrontPageOrdersSpy = sinon.spy()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              fetchDepartments={fetchDepartmentsSpy}
              fetchOfficers={fetchOfficersSpy}
              fetchDocuments={fetchDocumentsSpy}
              fetchNewsArticles={fetchNewsArticlesSpy}
              fetchFrontPageOrders={fetchFrontPageOrdersSpy}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchDepartmentsSpy).toHaveBeenCalled()
    expect(fetchOfficersSpy).toHaveBeenCalled()
    expect(fetchDocumentsSpy).toHaveBeenCalled()
    expect(fetchNewsArticlesSpy).toHaveBeenCalled()
    expect(fetchFrontPageOrdersSpy).toHaveBeenCalled()
    expect(IntroSection).toHaveBeenCalled()
    expect(Findings).toHaveBeenCalled()
  })

  it('clear search query on enter homepage', () => {
    const fetchDepartmentsSpy = sinon.spy()
    const fetchOfficersSpy = sinon.spy()
    const fetchDocumentsSpy = sinon.spy()
    const fetchNewsArticlesSpy = sinon.spy()
    const fetchFrontPageOrdersSpy = sinon.spy()
    const changeSearchQueryStub = sinon.stub()

    render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              fetchDepartments={fetchDepartmentsSpy}
              fetchOfficers={fetchOfficersSpy}
              fetchDocuments={fetchDocumentsSpy}
              fetchNewsArticles={fetchNewsArticlesSpy}
              fetchFrontPageOrders={fetchFrontPageOrdersSpy}
              changeSearchQuery={changeSearchQueryStub}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )

    expect(fetchDepartmentsSpy).toHaveBeenCalled()
    expect(fetchOfficersSpy).toHaveBeenCalled()
    expect(fetchDocumentsSpy).toHaveBeenCalled()
    expect(fetchNewsArticlesSpy).toHaveBeenCalled()
    expect(fetchFrontPageOrdersSpy).toHaveBeenCalled()
    expect(changeSearchQueryStub).toHaveBeenCalledWith('')
  })

  it('should render correctly', () => {
    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { getByPlaceholderText } = container

    expect(
      getByPlaceholderText('Search by name, agency, or keyword').className
    ).toEqual('input-field')
  })

  it('should render multi data correctly', () => {
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
        departments: [
          {
            id: 'north-paulaberg-department',
            name: 'North Paulaberg Department',
          },
        ],
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
    const ordersData = {
      DEPARTMENT: 3,
      OFFICER: 2,
      NEWS_ARTICLE: 1,
      DOCUMENT: 4,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              departments={departmentsData}
              officers={officersData}
              newsArticles={newsArticlesData}
              documents={documentsData}
              recentItems={recentItemsData}
              frontPageOrders={ordersData}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

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

    const firstSection = baseElement.getElementsByClassName(
      'front-order-101'
    )[0]
    const secondSection = baseElement.getElementsByClassName(
      'front-order-102'
    )[0]
    const thirdSection = baseElement.getElementsByClassName(
      'front-order-103'
    )[0]
    const fourthSection = baseElement.getElementsByClassName(
      'front-order-104'
    )[0]

    expect(recentItemSection.textContent).toContain('Recent activity')
    expect(departmentSection.textContent).toContain('Agencies')
    expect(newsActicleSection.textContent).toContain('News')
    expect(documentSection.textContent).toContain('Documents')
    expect(officerSection.textContent).toContain('Officers')
    expect(firstSection.children[1].classList.value).toContain(
      'news-articles-carousel'
    )
    expect(secondSection.children[1].classList.value).toContain(
      'officers-carousel'
    )
    expect(thirdSection.children[1].classList.value).toContain(
      'departments-carousel'
    )
    expect(fourthSection.children[1].classList.value).toContain(
      'documents-carousel'
    )
  })

  it('render close recent items correctly', () => {
    const removeRecentItemStub = sinon.stub()
    sinon.stub(window, 'open')
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
        departments: [
          {
            id: 'north-paulaberg-department',
            name: 'North Paulaberg Department',
          },
        ],
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
    const ordersData = {
      DEPARTMENT: 3,
      OFFICER: 2,
      NEWS_ARTICLE: 1,
      DOCUMENT: 4,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              isLoggedIn={true}
              departments={departmentsData}
              officers={officersData}
              newsArticles={newsArticlesData}
              documents={documentsData}
              recentItems={recentItemsData}
              frontPageOrders={ordersData}
              removeRecentItem={removeRecentItemStub}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

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

    const firstSection = baseElement.getElementsByClassName(
      'front-order-101'
    )[0]
    const secondSection = baseElement.getElementsByClassName(
      'front-order-102'
    )[0]
    const thirdSection = baseElement.getElementsByClassName(
      'front-order-103'
    )[0]
    const fourthSection = baseElement.getElementsByClassName(
      'front-order-104'
    )[0]

    expect(recentItemSection.textContent).toContain('Recent activity')
    expect(departmentSection.textContent).toContain('Agencies')
    expect(newsActicleSection.textContent).toContain('News')
    expect(documentSection.textContent).toContain('Documents')
    expect(officerSection.textContent).toContain('Officers')
    expect(firstSection.children[1].classList.value).toContain(
      'news-articles-carousel'
    )
    expect(secondSection.children[1].classList.value).toContain(
      'officers-carousel'
    )
    expect(thirdSection.children[1].classList.value).toContain(
      'departments-carousel'
    )
    expect(fourthSection.children[1].classList.value).toContain(
      'documents-carousel'
    )

    const removeBtn = baseElement.getElementsByClassName('remove-btn')[0]
    fireEvent.click(removeBtn)

    expect(removeRecentItemStub).toHaveBeenCalled()
  })

  it('does not show close button of recent items if anonymous user', () => {
    const removeRecentItemStub = sinon.stub()
    sinon.stub(window, 'open')
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
        departments: [
          {
            id: 'north-paulaberg-department',
            name: 'North Paulaberg Department',
          },
        ],
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
    const ordersData = {
      DEPARTMENT: 3,
      OFFICER: 2,
      NEWS_ARTICLE: 1,
      DOCUMENT: 4,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              isLoggedIn={false}
              departments={departmentsData}
              officers={officersData}
              newsArticles={newsArticlesData}
              documents={documentsData}
              recentItems={recentItemsData}
              frontPageOrders={ordersData}
              removeRecentItem={removeRecentItemStub}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('remove-btn').length).toEqual(0)
  })

  it('hides news article when confirming deletion ', async () => {
    const hideNewsArticleStub = sinon.stub()

    const newsArticlesData = [
      {
        id: 1,
        sourceName: 'The lens',
        url: 'https://i.imgur.com/news-article1.pdf',
        title: 'news-article-1',
        publishedDate: 'Nov 9, 2020',
      },
    ]

    const ordersData = {
      DEPARTMENT: 3,
      OFFICER: 2,
      NEWS_ARTICLE: 1,
      DOCUMENT: 4,
    }

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage
              newsArticles={newsArticlesData}
              frontPageOrders={ordersData}
              hideNewsArticle={hideNewsArticleStub}
              isAdmin={true}
            />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    const hideBtn = baseElement.getElementsByClassName('hide-btn')[0]
    fireEvent.click(hideBtn)

    const deleteBtn = baseElement.getElementsByClassName('delete-btn')[0]

    await act(async () => {
      fireEvent.click(deleteBtn)
    })

    expect(hideNewsArticleStub).toHaveBeenCalledWith(1)
  })

  it('toggles search modal', async () => {
    const toggleSearchModalstub = sinon.stub()

    const container = render(
      <Provider store={MockStore()()}>
        <MemoryRouter initialEntries={['/']}>
          <Route path='/'>
            <FrontPage toggleSearchModal={toggleSearchModalstub} />
          </Route>
        </MemoryRouter>
      </Provider>
    )
    const { baseElement } = container

    const searchInput = baseElement.getElementsByClassName('input-field')[0]

    await act(async () => {
      fireEvent.click(searchInput)
    })

    expect(toggleSearchModalstub).toHaveBeenCalledWith(true)
  })

  describe('Placeholder search input test suites on frontpage', () => {
    it('shows short placeholder on mobile', async () => {
      sinon.stub(rdd, 'isMobile').get(() => true)

      const toggleSearchModalstub = sinon.stub()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['/']}>
            <Route path='/'>
              <FrontPage toggleSearchModal={toggleSearchModalstub} />
            </Route>
          </MemoryRouter>
        </Provider>
      )
      const { queryByPlaceholderText } = container

      const mobilePlaceHolderText = 'Search LLEAD'
      const desktopPlaceHolderText = 'Search by name, department, or keyword'
      expect(queryByPlaceholderText(mobilePlaceHolderText)).toBeTruthy()
      expect(queryByPlaceholderText(desktopPlaceHolderText)).toBeFalsy()
    })

    it('shows long placeholder on desktop', async () => {
      sinon.stub(rdd, 'isMobile').get(() => false)

      const toggleSearchModalstub = sinon.stub()

      const container = render(
        <Provider store={MockStore()()}>
          <MemoryRouter initialEntries={['/']}>
            <Route path='/'>
              <FrontPage toggleSearchModal={toggleSearchModalstub} />
            </Route>
          </MemoryRouter>
        </Provider>
      )
      const { queryByPlaceholderText } = container

      const mobilePlaceHolderText = 'Search LLEAD'
      const desktopPlaceHolderText = 'Search by name, agency, or keyword'
      expect(queryByPlaceholderText(mobilePlaceHolderText)).toBeFalsy()
      expect(queryByPlaceholderText(desktopPlaceHolderText)).toBeTruthy()
    })
  })
})
