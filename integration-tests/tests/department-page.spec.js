import { appConfigData } from '../data/common-data'
import {
  departmentDetailsData,
  departmentDocumentData,
  departmentNextDocumentsData,
  departmentDocumentsSearchData,
  departmentDocumentsSearchNextData,
} from '../data/department-page-data'

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
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
          noQuery: true,
        },
        departmentDocumentData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
          query: { limit: '2', offset: '2', q: 'this' },
        },
        departmentDocumentsSearchNextData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
          query: { q: 'this' },
        },
        departmentDocumentsSearchData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
          query: { limit: '5', offset: '5' },
        },
        departmentNextDocumentsData
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
        .should('text', '1 document')
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
        .should('text', 'harmonbury-department')
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

    it('should render documents', () => {
      cy.visit('/dept/harmonbury-department')

      cy.contains(`Documents (${departmentDocumentData.count})`)

      cy.get('.department-documents-listview')
        .find('.document-item')
        .should('length', 5)

      cy.get('.department-documents-listview')
        .find('.document-item')
        .eq(0)
        .find('.document-item-name')
        .should('text', departmentDocumentData.results[0].title)

      cy.get('.department-documents-loadmore')
        .should('text', 'Load 5 more')
        .click()

      cy.get('.department-documents-listview')
        .find('.document-item')
        .should('length', 10)

      cy.get('.department-documents-listview')
        .find('.document-item')
        .eq(6)
        .find('.document-item-name')
        .should('text', departmentNextDocumentsData.results[1].title)

      cy.get('.department-documents-loadmore').should('not.exist')
    })

    it('should render search results', () => {
      cy.visit('/dept/harmonbury-department')
      cy.get('.department-documents').find('.input-field').type('this')

      cy.contains(`Documents (${departmentDocumentsSearchData.count})`)

      cy.get('.department-documents-listview')
        .find('.document-item')
        .should('length', 2)

      cy.get('.department-documents-listview')
        .find('.document-item')
        .eq(0)
        .find('.document-item-name')
        .should('text', departmentDocumentsSearchData.results[0].title)

      cy.get('.department-documents-loadmore')
        .should('text', 'Load 2 more')
        .click()

      cy.get('.department-documents-listview')
        .find('.document-item')
        .should('length', 4)

      cy.get('.department-documents-listview')
        .find('.document-item')
        .eq(2)
        .find('.document-item-name')
        .should('text', departmentDocumentsSearchNextData.results[0].title)

      cy.get('.department-documents-loadmore').should('not.exist')
    })

    it('changes title on department clicked', () => {
      cy.visit('/')
      cy.title().should('eq', 'LLEAD')

      cy.visit('/dept/harmonbury-department')

      cy.title().should('eq', 'Harmonbury Department')

      cy.visit('/')

      cy.title().should('eq', 'LLEAD')
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
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
          query: { limit: '5', offset: '5' },
        },
        departmentNextDocumentsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url:
            'http://localhost:8000/api/departments/harmonbury-department/documents/',
        },
        departmentDocumentData
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
})
