import { appConfigData } from '../data/common-data'
import {
  analyticSummaryData,
  departmentsData,
  officersData,
  documentsData,
  newsArticleData
} from '../data/front-page-data'
import {
  departmentBatonRougePdDetailsData,
  department9DocumentsData,
  officer1DetailsData,
  officer1DocumentsData,
  recentItemsData,
  officerTimelineData,
  userInfoData,
} from '../data/recent-items-data'

describe('FrontPage recent items', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.login()

    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/app-config/',
      },
      appConfigData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/user/',
      },
      userInfoData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/analytics/summary/',
      },
      analyticSummaryData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/departments/',
      },
      departmentsData
    )
    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/officers/',
      },
      officersData
    )
    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/documents/',
      },
      documentsData
    )
    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/news-articles/',
      },
      newsArticleData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: `http://localhost:8000/api/departments/baton-rouge-pd/`,
      },
      departmentBatonRougePdDetailsData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: `http://localhost:8000/api/departments/baton-rouge-pd/documents/`,
      },
      department9DocumentsData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: `http://localhost:8000/api/officers/1/`,
      },
      officer1DetailsData
    )
    cy.interceptExact(
      {
        method: 'GET',
        url: `http://localhost:8000/api/officers/1/documents/`,
      },
      officer1DocumentsData
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/officers/1/timeline/',
      },
      officerTimelineData
    )
  })

  it('adds department to recent items when click department card', () => {
    cy.visit('/')

    cy.get('.recent-items-carousel').should('not.exist')
    cy.get('.departments-carousel').find('.swiper-slide').eq(0).click()
    cy.location('pathname').should('eq', '/dept/baton-rouge-pd/')
    cy.get('.department-content')
      .find('.department-name')
      .should('text', 'Baton Rouge PD')

    cy.get('.logo').click()

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 1)

    cy.get('@visibleSlides')
      .eq(0)
      .find('.department-name')
      .contains('Baton Rouge PD')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.department-city')
      .contains('Baton Rouge')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.department-parish')
      .contains('East Baton Rouge')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.department-map')
      .should(
        'have.css',
        'background-image',
        'url("https://i.imgur.com/nHTFohI.png")'
      )
  })

  it('adds officer to recent items when click officer card', () => {
    cy.visit('/')

    cy.get('.recent-items-carousel').should('not.exist')
    const officerId = officersData[0].id

    cy.get('.officers-carousel').find('.swiper-slide').eq(0).click()
    cy.location('pathname').should('eq', `/officers/${officerId}/mark-carlson`)
    cy.get('.officer-basic-info')
      .find('.officer-name')
      .should('text', 'Mark Carlson')

    cy.get('.logo').click()

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 1)

    cy.get('@visibleSlides')
      .eq(0)
      .find('.officer-name')
      .contains('Mark Carlson')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.officer-badges')
      .contains('12435, 612')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.officer-department-name')
      .contains('Baton Rouge PD')
  })

  it('adds document to recent items when click document card', () => {
    cy.visit('/')
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open')
    })

    cy.get('.recent-items-carousel').should('not.exist')
    cy.get('.documents-carousel').find('.swiper-slide').eq(0).click()

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 1)

    cy.get('@visibleSlides').eq(0).find('.document-type').contains('document')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-title')
      .contains('Her hard step sea.')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-subtitle')
      .contains('Jan 6, 2020')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-department-name')
      .contains('Petersonmouth Department')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-preview')
      .should(
        'have.css',
        'background-image',
        'url("http://image.com/century/five-preview.pdf")'
      )
  })

  it('adds document to recent items when click document row in department page', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open')
    })
    cy.visit('/dept/baton-rouge-pd/')
    cy.get('.document-item').click()
    cy.get('.logo').click()

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 2)

    cy.get('@visibleSlides').eq(0).find('.document-type').contains('document')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-title')
      .contains('Pattern risk team election myself suffer wind.')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-subtitle')
      .contains('May 4, 2020')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-department-name')
      .contains('Baton Rouge PD')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-preview')
      .should(
        'have.css',
        'background-image',
        'url("http://image.com/glass/shoulder-preview.pdf")'
      )
  })

  it('adds document to recent items when click document card in officer timeline', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open')
    })
    cy.visit('/officers/1/')
    cy.get('.officer-timeline').find('.timeline-document-card').eq(0).click()
    cy.get('.logo').click()

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 2)

    cy.get('@visibleSlides').eq(0).find('.document-type').contains('document')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-title')
      .contains('Document 2019-03-10')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-subtitle')
      .contains('Mar 10, 2019')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-department-name')
      .contains('Department')
    cy.get('@visibleSlides')
      .eq(0)
      .find('.document-preview')
      .should(
        'have.css',
        'background-image',
        'url("http://image.com/image/our-preview.jpg")'
      )
  })

  it('adds multiple recent items', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open')
    })
    cy.visit('/')

    cy.get('.recent-items-carousel').should('not.exist')
    cy.get('.documents-carousel').find('.swiper-slide').eq(0).click()

    cy.get('.officers-carousel').find('.swiper-slide').eq(0).click()
    cy.location('pathname').should('eq', `/officers/1/mark-carlson`)
    cy.contains('Mark Carlson')
    cy.get('.logo').click()

    cy.get('.departments-carousel').find('.swiper-slide').eq(0).click()
    cy.location('pathname').should('eq', '/dept/baton-rouge-pd/')
    cy.contains('Baton Rouge PD')
    cy.get('.logo').click()

    cy.get('.recent-items-carousel')
      .find('.carousel-title')
      .should('text', 'Recent activity')

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 3)

    cy.get('@visibleSlides').eq(0).contains('Baton Rouge PD')
    cy.get('@visibleSlides').eq(1).contains('Mark Carlson')
    cy.get('@visibleSlides').eq(2).contains('Her hard step sea.')

    cy.get('.documents-carousel').find('.swiper-slide').eq(0).click()
    cy.get('.documents-carousel').find('.swiper-slide').eq(2).click()

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 4)

    cy.get('@visibleSlides')
      .eq(0)
      .contains('Be decade those someone tough year sing.')
    cy.get('@visibleSlides').eq(1).contains('Her hard step sea.')
    cy.get('@visibleSlides').eq(2).contains('Baton Rouge PD')
    cy.get('@visibleSlides').eq(3).contains('Mark Carlson')
  })

  it('fetches recent items data from api', () => {
    cy.interceptExact(
      {
        method: 'GET',
        url: `http://localhost:8000/api/historical-data/recent-items/`,
      },
      recentItemsData
    )

    cy.visit('/')

    cy.get('.recent-items-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 3)

    cy.get('@visibleSlides').eq(0).contains('Mark Carlson')
    cy.get('@visibleSlides').eq(1).contains('Baton Rouge PD')
    cy.get('@visibleSlides')
      .eq(2)
      .contains('Face growth poor wait follow option better.')
  })
})
