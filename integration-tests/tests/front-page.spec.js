import { appConfigData } from '../data/common-data'
import {
  analyticSummaryData,
  departmentsData,
  officersData,
  documentsData,
} from '../data/front-page-data'

describe('FrontPage', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/')

    cy.location('pathname').should('eq', '/login/')
  })

  describe('render successfully', () => {
    beforeEach(() => {
      cy.login()
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/app-config/',
        },
        appConfigData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/analytics/summary/',
        },
        analyticSummaryData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/',
        },
        departmentsData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/officers/',
        },
        officersData
      )
      cy.intercept(
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

    it('render departments carousel', () => {
      cy.viewport(1000, 1200)
      cy.visit('/')

      cy.get('.departments-carousel')
        .find('.carousel-title')
        .should('text', 'Departments')

      cy.get('.departments-carousel').find('.sorted-by').should('text', 'size')
      cy.get('.departments-carousel').find('.swiper-slide').should('length', 5)

      cy.get('.departments-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 3)

      cy.get('@visibleSlides').eq(0).contains('Baton Rouge Department 1')
      cy.get('@visibleSlides').eq(1).contains('New Orleans Department 1')
      cy.get('@visibleSlides').eq(2).contains('Baton Rouge Department 2')

      cy.get('.departments-carousel').find('.carousel-next').click()
      cy.get('.departments-carousel').find('.carousel-next').click()
      cy.get('.departments-carousel').find('.carousel-next').click()

      cy.get('.departments-carousel').find('.swiper-button-disabled', {
        timeout: 1000,
      })

      cy.get('.departments-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 3)

      cy.get('@visibleSlides').eq(0).contains('Baton Rouge Department 2')
      cy.get('@visibleSlides').eq(1).contains('New Orleans Department 2')
      cy.get('@visibleSlides').eq(2).contains('New Orleans Department 3')
    })

    it('render officers carousel', () => {
      cy.viewport(800, 1200)
      cy.visit('/')

      cy.get('.officers-carousel')
        .find('.carousel-title')
        .should('text', 'Officers')
      cy.get('.officers-carousel')
        .find('.sorted-by')
        .should('text', 'most recently added')
      cy.get('.officers-carousel').find('.swiper-slide').should('length', 5)
      cy.get('.officers-carousel')
        .find('.swiper-slide:visible')
        .as('visibleSlides')
        .should('length', 3)

      cy.get('@visibleSlides').eq(0).contains('Mark Carlson')
      cy.get('@visibleSlides').eq(1).contains('Eric Patel')
      cy.get('@visibleSlides').eq(2).contains('Lee Allen')

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
        .should('length', 3)

      cy.get('@visibleSlides').eq(0).contains('Lee Allen')
      cy.get('@visibleSlides').eq(1).contains('Tina Holder')
      cy.get('@visibleSlides').eq(2).contains('Kelly Hunt')
    })

    it('render documents carousel', () => {
      cy.viewport(800, 1200)
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
        .should('length', 3)

      cy.get('@visibleSlides').eq(0).contains('Her hard step sea.')
      cy.get('@visibleSlides')
        .eq(1)
        .contains('Yourself say language meeting ok.')
      cy.get('@visibleSlides')
        .eq(2)
        .contains('Be decade those someone tough year sing.')

      cy.get('@visibleSlides')
        .eq(0)
        .find('.document-department-name')
        .should('exist')
      cy.get('@visibleSlides')
        .eq(1)
        .find('.document-department-name')
        .should('not.exist')
      cy.get('@visibleSlides')
        .eq(2)
        .find('.document-department-name')
        .should('exist')

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
        .should('length', 3)

      cy.get('@visibleSlides')
        .eq(0)
        .contains('Face growth poor wait follow option better.')
      cy.get('@visibleSlides').eq(1).contains('Performance past from.')
      cy.get('@visibleSlides')
        .eq(2)
        .contains('Mouth trip too finally society smile man.')
    })
  })
})
