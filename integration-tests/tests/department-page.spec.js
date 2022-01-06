import { appConfigData } from '../data/common-data'
import {
  departmentDetailsData,
  featuredOfficersData,
  featuredDocumentsData,
  featuredNewsArticlesData,
} from '../data/department-page-data'

const CAROUSEL_LEFT_MARGIN = 16
const CAROUSEL_CARD_MARGIN = 8
const OFFICER_CARD_WIDTH = 248
const DOCUMENT_CARD_WIDTH = 248
const NEWS_ARTICLE_CARD_WIDTH = 248

const calculateScreenWidth = (itemSize, number) => {
  return (
    itemSize * number +
    CAROUSEL_CARD_MARGIN * (number - 1) +
    CAROUSEL_LEFT_MARGIN +
    4
  )
}

describe('Department Page', () => {
  it('redirect to login when not logged in', () => {
    cy.clearLocalStorage()
    cy.visit('/dept/harmonbury-department')

    cy.waitUntil(() => cy.location('pathname').should('eq', '/login/'))
  })

  describe('render successfully', () => {
    beforeEach(() => {
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
          url: 'http://localhost:8000/api/departments/harmonbury-department/',
          noQuery: true,
        },
        departmentDetailsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/officers/',
          noQuery: true,
        },
        featuredOfficersData
      )

      cy.login()
    })

    it('render department basics', () => {
      cy.visit('/dept/harmonbury-department')

      cy.location('pathname').should('eq', '/dept/harmonbury-department')
      cy.contains('Police Department')
      cy.get('.department-period').should(
        'text',
        'Data for this department is limited to the years\u00A02013, 2015, 2017 and 2020'
      )
      cy.get('.department-content')
        .find('.department-name')
        .should('text', 'Harmonbury Department')
      cy.get('.department-content')
        .find('.department-city')
        .should('text', 'Baton Rouge')
      cy.get('.department-content')
        .find('.department-parish')
        .should('text', 'East Baton Rouge')
      cy.get('.department-content')
        .find('.phone')
        .should('text', '(504) 891-7585')
      cy.get('.department-content')
        .find('.address')
        .should('text', '1 Third St #1, New Orleans, LA 70130')

      cy.get('.summary-officers').find('div').eq(0).should('text', '1,000')
      cy.get('.summary-officers').find('div').eq(1).should('text', 'officers')

      cy.get('.summary-datasets').find('div').eq(0).should('text', '5')
      cy.get('.summary-datasets').find('div').eq(1).should('text', 'datasets')
      cy.get('.summary-datasets')
        .find('div')
        .eq(2)
        .should('text', '+1 in the past 30 days')

      cy.get('.summary-news-articles').find('div').eq(0).should('text', '123')
      cy.get('.summary-news-articles')
        .find('div')
        .eq(1)
        .should('text', 'news articles')
      cy.get('.summary-news-articles')
        .find('div')
        .eq(2)
        .should('text', '+12 in the past 30 days')

      cy.get('.summary-allegations').find('div').eq(0).should('text', '40')
      cy.get('.summary-allegations')
        .find('div')
        .eq(1)
        .should('text', 'allegations')
      cy.get('.summary-allegations')
        .find('div')
        .eq(2)
        .should('text', '25% sustained allegations')

      cy.get('.summary-documents').find('div').eq(0).should('text', '3')
      cy.get('.summary-documents').find('div').eq(1).should('text', 'documents')
      cy.get('.summary-documents')
        .find('div')
        .eq(2)
        .should('text', '+2 in the past 30 days')

      cy.get('.summary-incidents').find('div').eq(0).should('text', '1')
      cy.get('.summary-incidents')
        .find('div')
        .eq(1)
        .should('text', 'force incident')
    })

    it('render department search tag and redirect on search', () => {
      cy.visit('/dept/harmonbury-department')

      cy.location('pathname').should('eq', '/dept/harmonbury-department')
      cy.contains('Police Department')
      cy.get('.department-period').should(
        'text',
        'Data for this department is limited to the years\u00A02013, 2015, 2017 and 2020'
      )
      cy.get('.search-input-container')
        .find('.search-tag')
        .should('text', 'Harmonbury Department')
      cy.get('.search-input-container').find('.transparent-input').type('Hunt')

      cy.url().should(
        'eq',
        Cypress.config().baseUrl +
          `/search/?q=Hunt&department=harmonbury-department`
      )
    })

    it('render department wrgl files', () => {
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-wrgl-files')
        .find('.wrgl-name')
        .eq(0)
        .should('text', 'match cprr madisonville pd 2010 2020')

      cy.get('.department-wrgl-files')
        .find('.wrgl-name')
        .eq(1)
        .should('text', 'test 2')

      cy.get('.department-wrgl-files')
        .find('.wrgl-description')
        .eq(0)
        .should('be.visible')

      cy.get('.department-wrgl-files')
        .find('.wrgl-description')
        .eq(1)
        .should('not.be.visible')

      cy.get('.department-wrgl-files').find('.wrgl-arrow').eq(1).click()

      cy.get('.department-wrgl-files')
        .find('.wrgl-description')
        .eq(1)
        .should('be.visible')

      cy.get('.wrgl-description')
        .eq(0)
        .find('.wrgl-description-more-btn')
        .should('not.be.visible')

      cy.get('.wrgl-description')
        .eq(1)
        .find('.wrgl-description-more-btn')
        .should('be.visible')
    })
  })

  describe('render data period info', () => {
    beforeEach(() => {
      cy.login()
      cy.interceptExact(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/app-config/',
        },
        appConfigData
      )
    })

    it('should render with data period', () => {
      cy.interceptExact(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/harmonbury-department/',
        },
        departmentDetailsData
      )
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-period').should(
        'text',
        'Data for this department is limited to the years\u00A02013, 2015, 2017 and 2020'
      )
    })
    it('should render with no data period', () => {
      cy.interceptExact(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/harmonbury-department',
        },
        { ...departmentDetailsData, data_period: [] }
      )
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-period').should('not.exist')
    })
  })

  describe('featured officers carousel', () => {
    beforeEach(() => {
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
          url: 'http://localhost:8000/api/departments/harmonbury-department/',
          noQuery: true,
        },
        departmentDetailsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/officers/',
          noQuery: true,
        },
        featuredOfficersData
      )

      cy.login()
    })

    it('render correctly', () => {
      const OFFICER_VISIBLE_COUNTS = 4
      const screenWidth = calculateScreenWidth(
        OFFICER_CARD_WIDTH,
        OFFICER_VISIBLE_COUNTS
      )
      cy.viewport(screenWidth, 1200)
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container')
        .find('.carousel-title')
        .should('text', 'Featured officers')
      cy.get('.department-section-container')
        .find('.swiper-slide')
        .should('length', 5)
      cy.get('.department-section-container')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', OFFICER_VISIBLE_COUNTS)

      cy.get('@visibleSlides').eq(0).contains('Mark Carlson')
      cy.get('@visibleSlides').eq(1).contains('Eric Patel')
      cy.get('@visibleSlides').eq(2).contains('Lee Allen')
      cy.get('@visibleSlides').eq(3).contains('Tina Holder')

      cy.get('@visibleSlides')
        .eq(0)
        .find('.officer-name')
        .contains('Mark Carlson')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.featured-officer-badges')
        .contains('12435, 612')
      cy.get('@visibleSlides').eq(0).find('.star-corner').should('exist')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.allegation-count')
        .should('not.exist')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.use-of-force-count')
        .should('not.exist')

      cy.get('@visibleSlides')
        .eq(1)
        .contains('Eric Patel')
        .find('.star-corner')
        .should('not.exist')
      cy.get('@visibleSlides')
        .eq(1)
        .find('.featured-officer-badges')
        .should('have.value', '')
      cy.get('@visibleSlides').eq(1).find('.allegation-count').contains('80')
      cy.get('@visibleSlides').eq(1).find('.use-of-force-count').contains('15')

      cy.get('@visibleSlides')
        .eq(2)
        .find('.featured-officer-badges')
        .contains('1056, 111, 222 ...')

      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()

      cy.get('.department-section-container').find(
        '.carousel-next.swiper-button-disabled'
      )

      cy.get('.department-section-container')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', OFFICER_VISIBLE_COUNTS)

      cy.get('@visibleSlides').eq(0).contains('Eric Patel')
      cy.get('@visibleSlides').eq(1).contains('Lee Allen')
      cy.get('@visibleSlides').eq(2).contains('Tina Holder')
      cy.get('@visibleSlides').eq(3).contains('Kelly Hunt')
    })

    it('redirects to officer page when clicks on officer card', () => {
      cy.visit('/dept/harmonbury-department')
      cy.waitUntil(() =>
        cy.get('.department-section-container').should('exist')
      )
      cy.get('.department-section-container')
        .find('.swiper-slide')
        .eq(0)
        .click()

      cy.location('pathname').should(
        'eq',
        `/officers/${featuredOfficersData[0].id}/mark-carlson`
      )
    })
  })

  describe('featured documents carousel', () => {
    beforeEach(() => {
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
          url: 'http://localhost:8000/api/departments/harmonbury-department/',
          noQuery: true,
        },
        departmentDetailsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
          noQuery: true,
        },
        featuredDocumentsData
      )

      cy.login()
    })

    it('render correctly', () => {
      const DOCUMENT_VISIBLE_COUNTS = 3
      const screenWidth = calculateScreenWidth(
        DOCUMENT_CARD_WIDTH,
        DOCUMENT_VISIBLE_COUNTS
      )
      cy.viewport(screenWidth, 1200)
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container')
        .find('.carousel-title')
        .should('text', 'Featured documents')
      cy.get('.department-section-container')
        .find('.swiper-slide')
        .should('length', 6)
      cy.get('.department-section-container')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', DOCUMENT_VISIBLE_COUNTS)

      cy.get('@visibleSlides').eq(0).contains('Her hard step sea.')
      cy.get('@visibleSlides')
        .eq(1)
        .contains('Yourself say language meeting ok.')
      cy.get('@visibleSlides')
        .eq(2)
        .contains('Be decade those someone tough year sing.')

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
        .find('.document-preview')
        .should(
          'have.css',
          'background-image',
          'url("http://image.com/century/five-preview.pdf")'
        )

      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()

      cy.get('.department-section-container').find(
        '.carousel-next.swiper-button-disabled',
        {
          timeout: 1000,
        }
      )

      cy.get('.department-section-container')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', DOCUMENT_VISIBLE_COUNTS)

      cy.get('@visibleSlides')
        .eq(0)
        .contains('Face growth poor wait follow option better.')
      cy.get('@visibleSlides').eq(1).contains('Performance past from.')
      cy.get('@visibleSlides')
        .eq(2)
        .contains('Mouth trip too finally society smile man.')
    })

    it('opens document url in new tab when click on featured document card', () => {
      cy.visit('/dept/harmonbury-department')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.get('.department-section-container')
        .find('.swiper-slide')
        .eq(0)
        .click()

      cy.get('@open').should(
        'to.be.calledWith',
        featuredDocumentsData[0].url,
        '_blank',
        'noopener noreferrer'
      )
    })
  })

  describe('featured news articles carousel', () => {
    beforeEach(() => {
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
          url: 'http://localhost:8000/api/departments/harmonbury-department/',
          noQuery: true,
        },
        departmentDetailsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/news_articles/',
          noQuery: true,
        },
        featuredNewsArticlesData
      )

      cy.login()
    })

    it('renders correctly', () => {
      const NEWS_ARTICLE_VISIBLE_COUNTS = 3
      const screenWidth = calculateScreenWidth(
        NEWS_ARTICLE_CARD_WIDTH,
        NEWS_ARTICLE_VISIBLE_COUNTS
      )
      cy.viewport(screenWidth, 1200)
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container')
        .find('.carousel-title')
        .should('text', 'Featured news')

      cy.get('.department-section-container')
        .find('.swiper-slide')
        .should('length', 6)
      cy.get('.department-section-container')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', NEWS_ARTICLE_VISIBLE_COUNTS)

      cy.get('@visibleSlides').eq(0).contains('Her hard step sea.')
      cy.get('@visibleSlides')
        .eq(1)
        .contains('Yourself say language meeting ok.')
      cy.get('@visibleSlides')
        .eq(2)
        .contains('Be decade those someone tough year sing.')

      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-type')
        .contains('news article')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-title')
        .contains('Her hard step sea.')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-subtitle')
        .first()
        .contains('Jan 6, 2020')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-subtitle')
        .last()
        .contains('The lens')

      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()
      cy.get('.department-section-container').find('.carousel-next').click()

      cy.get('.department-section-container').find(
        '.carousel-next.swiper-button-disabled',
        {
          timeout: 1000,
        }
      )

      cy.get('.department-section-container')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', NEWS_ARTICLE_VISIBLE_COUNTS)

      cy.get('@visibleSlides')
        .eq(0)
        .contains('Face growth poor wait follow option better.')
      cy.get('@visibleSlides').eq(1).contains('Performance past from.')
      cy.get('@visibleSlides')
        .eq(2)
        .contains('Mouth trip too finally society smile man.')
    })

    it('opens news articles url in new tab when click on featured news article card', () => {
      cy.visit('/dept/harmonbury-department')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.get('.department-section-container')
        .find('.swiper-slide')
        .eq(0)
        .click()

      cy.get('@open').should(
        'to.be.calledWith',
        featuredNewsArticlesData[0].url,
        '_blank',
        'noopener noreferrer'
      )
    })
  })
})
