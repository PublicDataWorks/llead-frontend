import { appConfigData } from '../data/common-data'
import { analyticSummaryData, departmentsData } from '../data/front-page-data'

describe('FrontPage', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/')

    cy.location('pathname').should('eq', '/login/')
  })

  it('render successfully', () => {
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

    cy.viewport(1000, 1200)
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

    cy.get('.departments-carousel')
      .get('.carousel-title')
      .should('text', 'Departments')
    cy.get('.departments-carousel').get('.sorted-by').should('text', 'size')
    cy.get('.departments-carousel').find('.swiper-slide').should('length', 5)
    cy.get('.departments-carousel')
      .find('.swiper-slide:visible')
      .as('visibleSlides')
      .should('length', 3)
    cy.get('@visibleSlides').eq(0).contains('Baton Rouge Department 1')
    cy.get('@visibleSlides').eq(1).contains('New Orleans Department 1')
    cy.get('@visibleSlides').eq(2).contains('Baton Rouge Department 2')

    cy.get('.departments-carousel').get('.carousel-next').click()
    cy.get('.departments-carousel').get('.carousel-next').click()

    cy.get('.departments-carousel .carousel-next.swiper-button-disabled', {
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

  it('redirect to login when not logged in - test if local storage is cleared', () => {
    cy.visit('/')

    cy.location('pathname').should('eq', '/login/')
  })
})
