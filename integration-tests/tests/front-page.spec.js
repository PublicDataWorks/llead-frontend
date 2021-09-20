import { appConfigData } from '../data/common-data'
import {
  analyticSummaryData,
  departmentsData,
  officersData,
  documentsData,
} from '../data/front-page-data'

const CAROUSEL_LEFT_MARGIN = 16
const CAROUSEL_CARD_MARGIN = 8
const DERPARTMENT_CARD_WIDTH = 312
const OFFICER_CARD_WIDTH = 248
const DOCUMENT_CARD_WIDTH = 248

const calculateScreenWidth = (itemSize, number) => {
  return (
    itemSize * number +
    CAROUSEL_CARD_MARGIN * (number - 1) +
    CAROUSEL_LEFT_MARGIN +
    4
  )
}

describe('FrontPage', () => {
  it('redirect to login when not logged in', () => {
    cy.clearLocalStorage()
    cy.visit('/')

    cy.waitUntil(() => cy.location('pathname').should('eq', '/login/'))
  })

  describe('render successfully', () => {
    beforeEach(() => {
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
    })

    it('render summary', () => {
      cy.visit('/')

      cy.location('pathname').should('eq', '/')
      cy.contains(
        'We are building a database of Louisiana police officers, departments, and documents.'
      )
      cy.contains('6 documents')
      cy.contains('+3 in the past 30 days')
      cy.contains('5 officers')
      cy.contains('+2 in the past 30 days')
      cy.contains('4 departments')
      cy.contains('+1 in the past 30 days')
    })

    describe('departments carousel', () => {
      it('render correctly', () => {
        const DEPARTMENT_VISIBLE_COUNTS = 3
        const screenWidth = calculateScreenWidth(
          DERPARTMENT_CARD_WIDTH,
          DEPARTMENT_VISIBLE_COUNTS
        )
        cy.viewport(screenWidth, 1200)
        cy.visit('/')

        cy.get('.departments-carousel')
          .find('.carousel-title')
          .should('text', 'Departments')

        cy.get('.departments-carousel')
          .find('.sorted-by')
          .should('text', 'size')
        cy.get('.departments-carousel')
          .find('.swiper-slide')
          .should('length', 5)

        cy.get('.departments-carousel')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', DEPARTMENT_VISIBLE_COUNTS)

        cy.get('@visibleSlides').eq(0).contains('Baton Rouge PD')
        cy.get('@visibleSlides').eq(1).contains('New Orleans PD')
        cy.get('@visibleSlides').eq(2).contains('Baton Rouge Sheriff')

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

        cy.get('.departments-carousel').find('.carousel-next').click()
        cy.get('.departments-carousel').find('.carousel-next').click()
        cy.get('.departments-carousel').find('.carousel-next').click()

        cy.get('.departments-carousel').find('.swiper-button-disabled', {
          timeout: 1000,
        })

        cy.get('.departments-carousel')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', DEPARTMENT_VISIBLE_COUNTS)

        cy.get('@visibleSlides').eq(0).contains('Baton Rouge Sheriff')
        cy.get('@visibleSlides').eq(1).contains('New Orleans Harbor PD')
        cy.get('@visibleSlides').eq(2).contains('Orleans Levee PD')
      })

      it('redirects to department page when clicks on department card', () => {
        cy.visit('/')

        cy.get('.departments-carousel').find('.swiper-slide').eq(0).click()

        cy.location('pathname').should('eq', `/dept/${departmentsData[0].id}/`)
      })
    })

    describe('officers carousel', () => {
      it('render correctly', () => {
        const OFFICER_VISIBLE_COUNTS = 4
        const screenWidth = calculateScreenWidth(
          OFFICER_CARD_WIDTH,
          OFFICER_VISIBLE_COUNTS
        )
        cy.viewport(screenWidth, 1200)
        cy.visit('/')

        cy.get('.officers-carousel')
          .find('.carousel-title')
          .should('text', 'Officers')
        cy.get('.officers-carousel')
          .find('.sorted-by')
          .should('text', 'complaints')
        cy.get('.officers-carousel').find('.swiper-slide').should('length', 5)
        cy.get('.officers-carousel')
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
          .find('.officer-badges')
          .contains('12435, 612')
        cy.get('@visibleSlides')
          .eq(0)
          .find('.officer-department-name')
          .contains('Baton Rouge PD')

        cy.get('@visibleSlides')
          .eq(0)
          .find('.officer-department-name')
          .should('exist')
        cy.get('@visibleSlides')
          .eq(1)
          .contains('Eric Patel')
          .find('.officer-department-name')
          .should('not.exist')
        cy.get('@visibleSlides')
          .eq(2)
          .find('.officer-department-name')
          .should('exist')

        cy.get('.officers-carousel').find('.carousel-next').click()
        cy.get('.officers-carousel').find('.carousel-next').click()
        cy.get('.officers-carousel').find('.carousel-next').click()

        cy.get('.officers-carousel').find(
          '.carousel-next.swiper-button-disabled',
          {
            timeout: 1000,
          }
        )

        cy.get('.officers-carousel')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', OFFICER_VISIBLE_COUNTS)

        cy.get('@visibleSlides').eq(0).contains('Eric Patel')
        cy.get('@visibleSlides').eq(1).contains('Lee Allen')
        cy.get('@visibleSlides').eq(2).contains('Tina Holder')
        cy.get('@visibleSlides').eq(3).contains('Kelly Hunt')
      })

      it('redirects to department page when click on departments section', () => {
        cy.visit('/')

        cy.get('.officers-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.officer-department-name')
          .click()

        cy.location('pathname').should(
          'eq',
          `/dept/${officersData[0].department.id}/`
        )
      })

      it('redirects to officer page when clicks on officer card', () => {
        cy.visit('/')
        cy.waitUntil(() => cy.get('.officers-carousel').should('exist'))
        cy.get('.officers-carousel').find('.swiper-slide').eq(0).click()

        cy.location('pathname').should(
          'eq',
          `/officers/${officersData[0].id}/mark-carlson`
        )
      })
    })

    describe('documents carousel', () => {
      it('render correctly', () => {
        const DOCUMENT_VISIBLE_COUNTS = 3
        const screenWidth = calculateScreenWidth(
          DOCUMENT_CARD_WIDTH,
          DOCUMENT_VISIBLE_COUNTS
        )
        cy.viewport(screenWidth, 1200)
        cy.visit('/')

        cy.get('.documents-carousel')
          .find('.carousel-title')
          .should('text', 'Documents')
        cy.get('.documents-carousel')
          .find('.sorted-by')
          .should('text', 'most recently added')
        cy.get('.documents-carousel').find('.swiper-slide').should('length', 6)
        cy.get('.documents-carousel')
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
          .find('.document-type')
          .contains('document')
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

        cy.get('.documents-carousel').find('.carousel-next').click()
        cy.get('.documents-carousel').find('.carousel-next').click()
        cy.get('.documents-carousel').find('.carousel-next').click()
        cy.get('.documents-carousel').find('.carousel-next').click()

        cy.get('.documents-carousel').find(
          '.carousel-next.swiper-button-disabled',
          {
            timeout: 1000,
          }
        )

        cy.get('.documents-carousel')
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

      it('opens document url in new tab when click on document card', () => {
        cy.visit('/')
        cy.window().then((win) => {
          cy.stub(win, 'open').as('open')
        })

        cy.get('.documents-carousel').find('.swiper-slide').eq(0).click()

        cy.get('@open').should(
          'to.be.calledWith',
          documentsData[0].url,
          '_blank',
          'noopener noreferrer'
        )
      })

      it('redirects to department page when click on departments section', () => {
        cy.visit('/')

        cy.get('.documents-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.document-department-name')
          .eq(0)
          .click()

        cy.location('pathname').should(
          'eq',
          `/dept/${documentsData[0].departments[0].id}/`
        )
      })
    })
  })
})
