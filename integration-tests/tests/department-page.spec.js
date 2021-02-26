import { appConfigData } from '../data/common-data'
import {
  departmentDetailsData,
  departmentDocumentData,
  departmentNextDocumentsData,
} from '../data/department-page-data'

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
          url: 'http://localhost:8000/api/departments/1/documents/',
          query: { limit: '5', offset: '5' },
        },
        departmentNextDocumentsData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/1/documents/',
        },
        departmentDocumentData
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
      cy.get('.department-period').should(
        'text',
        'Data for this department is limited to the years\u00A02018, 2020'
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

    it('render department wrgl files', () => {
      cy.visit('/departments/1')

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

    it('should render documents', () => {
      cy.visit('/departments/1')

      cy.contains(`Documents (${departmentDocumentData.count})`)

      cy.get('.department-documents-listview')
        .find('.document-card')
        .should('length', 5)

      cy.get('.department-documents-listview')
        .find('.document-card')
        .eq(0)
        .find('.document-title')
        .should('text', departmentDocumentData.results[0].title)

      cy.get('.department-documents-loadmore')
        .should('text', 'Load 5 more')
        .click()

      cy.get('.department-documents-listview')
        .find('.document-card')
        .should('length', 10)

      cy.get('.department-documents-listview')
        .find('.document-card')
        .eq(6)
        .find('.document-title')
        .should('text', departmentNextDocumentsData.results[1].title)

      cy.get('.department-documents-loadmore').should('not.exist')
    })
  })

  describe('render data period info', () => {
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
          url: 'http://localhost:8000/api/departments/1/documents/',
          query: { limit: '5', offset: '5' },
        },
        departmentNextDocumentsData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/1/documents/',
        },
        departmentDocumentData
      )
    })
    it('should render with data period', () => {
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/1',
        },
        departmentDetailsData
      )
      cy.visit('/departments/1')

      cy.get('.department-period').should(
        'text',
        'Data for this department is limited to the years\u00A02018, 2020'
      )
    })
    it('should render with no data period', () => {
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/departments/1',
        },
        { ...departmentDetailsData, data_period: [] }
      )
      cy.visit('/departments/1')

      cy.get('.department-period').should('not.exist')
    })
  })
})
