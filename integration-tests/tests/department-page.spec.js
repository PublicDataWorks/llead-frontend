import { appConfigData } from '../data/common-data'
import {
  departmentDetailsData,
  featuredOfficersData,
  featuredDocumentsData,
  featuredNewsArticlesData,
  datasetsData,
  searchEmptyData,
  searchOfficersData,
  nextSearchOfficersData,
  nextSearchNewsArticlesData,
  searchNewsArticlesData,
  officer1DetailsData,
  nextSearchDocumentsData,
  searchDocumentsData,
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
      cy.interceptExact(
        {
          method: 'GET',
          url: `http://localhost:8000/api/officers/1/`,
        },
        officer1DetailsData
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

      cy.get('.logo').click()

      cy.get('.recent-items-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 2)

      cy.get('@visibleSlides')
        .eq(0)
        .find('.officer-name')
        .contains('Mark Carlson')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.officer-badges')
        .contains('12435, 612')
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

    it('opens document url in new tab and save it to recent items when click on featured document card', () => {
      cy.visit('/dept/harmonbury-department')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.get('.department-section-container')
        .find('.swiper-slide')
        .eq(0)
        .click()

      cy.visit('/')
      cy.get('.recent-items-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 2)

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
        .find('.document-preview')
        .should(
          'have.css',
          'background-image',
          'url("http://image.com/century/five-preview.pdf")'
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

    it('opens news articles url in new tab and save it to recent item when click on featured news article card', () => {
      cy.visit('/dept/harmonbury-department')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.get('.department-section-container')
        .find('.swiper-slide')
        .eq(0)
        .click()

      cy.visit('/')

      cy.get('.recent-items-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 2)

      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-type')
        .contains('news article')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-title')
        .contains('Her hard step sea.')
    })
  })

  describe('datasets', () => {
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
            'http://localhost:8000/api/departments/harmonbury-department/datasets/',
          noQuery: true,
        },
        datasetsData
      )

      cy.login()
    })

    it('renders correctly', () => {
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

  describe('search officers', () => {
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
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          noQuery: true,
        },
        searchEmptyData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          query: { q: 'this', kind: 'officers', limit: '5', offset: '5' },
        },
        nextSearchOfficersData
      ).as('nextSearchOfficersData')
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          query: { q: 'this', kind: 'officers' },
        },
        searchOfficersData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url: `http://localhost:8000/api/officers/1/`,
        },
        officer1DetailsData
      )

      cy.login()
    })

    it('renders search officers', () => {
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container').find('.search-icon').click()
      cy.get('input[name="searchInput"]').type('this')

      cy.get('.featured-search-modal')
        .find('.search-result-count')
        .should('text', '10 Search results for "this" ')

      cy.get('.featured-search-modal')
        .find('.search-result-department')
        .should('text', ' | Harmonbury Department')

      cy.get('.card-collection')
        .find('.featured-officer-card')
        .should('length', 5)

      cy.get('.card-collection')
        .find('.officer-name')
        .eq(0)
        .contains('Mark Carlson')

      cy.get('.card-collection')
        .find('.officer-name')
        .eq(1)
        .contains('Debra Adams')

      cy.get('.card-collection')
        .find('.officer-name')
        .eq(2)
        .contains('Ira Austin Jr')

      cy.get('.card-collection')
        .find('.officer-name')
        .eq(3)
        .contains('Barbara Anderson')

      cy.get('.card-collection')
        .find('.officer-name')
        .eq(4)
        .contains('Quasaundra Anderson')

      cy.get('.card-collection').scrollTo('bottom')
      cy.wait(['@nextSearchOfficersData'])

      cy.get('.card-collection')
        .find('.officer-name')
        .eq(9)
        .contains('Erin Gray')

      cy.get('.featured-search-modal').find('.close-icon').click()

      cy.get('.featured-search-modal').should('not.exist')
    })

    it('redirects to officer page and save it to recent item when click on officer card', () => {
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container').find('.search-icon').click()
      cy.get('input[name="searchInput"]').type('this')

      cy.get('.featured-search-modal')
        .find('.featured-officer-card')
        .eq(0)
        .click()

      cy.location('pathname').should(
        'eq',
        `/officers/${searchOfficersData.results[0].id}/mark-carlson`
      )

      cy.get('.logo').click()

      cy.get('.recent-items-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 2)

      cy.get('@visibleSlides')
        .eq(0)
        .find('.officer-name')
        .contains('Mark Carlson')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.officer-badges')
        .contains('12435, 612')
    })
  })

  describe('search news articles', () => {
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
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          noQuery: true,
        },
        searchEmptyData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          query: { q: 'this', kind: 'news_articles', limit: '8', offset: '8' },
        },
        nextSearchNewsArticlesData
      ).as('nextSearchNewsAticlesData')
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          query: { q: 'this', kind: 'news_articles' },
        },
        searchNewsArticlesData
      )

      cy.login()
    })

    it('renders search news articles', () => {
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container').find('.search-icon').click()
      cy.get('input[name="searchInput"]').type('this')

      cy.get('.featured-search-modal')
        .find('.search-result-count')
        .should('text', '11 Search results for "this" ')

      cy.get('.featured-search-modal')
        .find('.search-result-department')
        .should('text', ' | Harmonbury Department')

      cy.get('.card-collection')
        .find('.search-news-article-item')
        .should('length', 11)

      cy.get('.card-collection')
        .find('.news-article-item-title')
        .eq(0)
        .contains('Her hard step sea.')

      cy.get('.card-collection')
        .find('.news-article-item-title')
        .eq(1)
        .contains('Yourself say language meeting ok.')

      cy.get('.card-collection')
        .find('.news-article-item-title')
        .eq(2)
        .contains('Be decade those someone tough year sing.')

      cy.get('.card-collection').scrollTo('bottom')
      cy.wait(['@nextSearchNewsAticlesData'])

      cy.get('.card-collection')
        .find('.news-article-item-title')
        .eq(10)
        .contains('Mouth trip too finally society smile man.')

      cy.get('.featured-search-modal').find('.close-icon').click()

      cy.get('.featured-search-modal').should('not.exist')
    })


    it('redirects to news article page and save it to recent item when click on news article card', () => {
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container').find('.search-icon').click()
      cy.get('input[name="searchInput"]').type('this')

      cy.get('.featured-search-modal')
        .find('.search-news-article-item')
        .eq(0)
        .click()

      cy.visit('/')

      cy.get('.recent-items-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 2)

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
        .contains('The lens')
      cy.get('@visibleSlides')
        .eq(0)
        .find('.news-article-subtitle')
        .last()
        .contains('Jan 6, 2020')
    })
  })

  describe('search documents', () => {
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
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          noQuery: true,
        },
        searchEmptyData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          query: { q: 'this', kind: 'documents', limit: '8', offset: '8' },
        },
        nextSearchDocumentsData
      ).as('nextSearchDocumentsData')
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/search/',
          query: { q: 'this', kind: 'documents' },
        },
        searchDocumentsData
      )

      cy.login()
    })

    it('renders documents', () => {
      cy.visit('/dept/harmonbury-department')

      cy.get('.department-section-container').find('.search-icon').click()
      cy.get('input[name="searchInput"]').type('this')

      cy.get('.featured-search-modal')
        .find('.search-result-count')
        .should('text', '11 Search results for "this" ')

      cy.get('.featured-search-modal')
        .find('.search-result-department')
        .should('text', ' | Harmonbury Department')

      cy.get('.card-collection')
        .find('.search-document-item')
        .should('length', 11)

      cy.get('.card-collection')
        .find('.document-item-name')
        .eq(0)
        .contains('Her hard step sea.')

      cy.get('.card-collection')
        .find('.document-item-name')
        .eq(1)
        .contains('Yourself say language meeting ok.')

      cy.get('.card-collection')
        .find('.document-item-name')
        .eq(2)
        .contains('Be decade those someone tough year sing.')

      cy.get('.card-collection').scrollTo('bottom')
      cy.wait(['@nextSearchDocumentsData'])

      cy.get('.card-collection')
        .find('.document-item-name')
        .eq(10)
        .contains(
          'Appeal hearing: William R. Woodward, Ill, Docket No. 16-229; Notice of Possible Defect in Appeal on 2017-1-12'
        )

      cy.get('.featured-search-modal').find('.close-icon').click()

      cy.get('.featured-search-modal').should('not.exist')
    })
  })
})
