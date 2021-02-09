import { appConfigData } from '../data/common-data'
import { departmentDetailsData } from '../data/department-page-data'

describe('Department Page', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/departments/1')

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
          url: 'http://localhost:8000/api/departments/1',
        },
        departmentDetailsData
      )
    })

    it('render department basics', () => {
      cy.visit('/departments/1')

      cy.location('pathname').should('eq', '/departments/1')
      cy.contains('Police Department')
      cy.get('.department-content')
        .find('.department-name')
        .should('text', 'Harmonbury Department')
      cy.get('.department-content')
        .find('.department-city')
        .should('text', 'Baton Rouge')
      cy.get('.department-content')
        .find('.department-parish')
        .should('text', 'East Baton Rouge')
      cy.get('.department-summary')
        .find('div')
        .eq(0)
        .should('text', '3 officers')
      cy.get('.department-summary')
        .find('div')
        .eq(1)
        .should('text', '2 complaints')
      cy.get('.department-summary')
        .find('div')
        .eq(2)
        .should('text', '1 documents')
    })
  })
})
