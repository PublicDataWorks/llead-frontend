import { appConfigData } from '../data/common-data'
import {
  officerDetailsData,
  officerDocumentsData,
} from '../data/officer-page-data'

describe('Officer Page', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/officers/1')

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
          url: 'http://localhost:8000/api/officers/1/documents/',
        },
        officerDocumentsData
      )
      cy.intercept(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/officers/1/',
        },
        officerDetailsData
      )
    })

    it('render officer basics info', () => {
      cy.visit('/officers/1')

      cy.location('pathname').should('eq', '/officers/1')
      cy.contains('Police Officer')
      cy.get('.officer-period').should(
        'text',
        'Data for this officer is limited to the years\u00A02012, 2013, 2014 and 2017-2019'
      )
      cy.get('.officer-content')
        .find('.officer-name')
        .should('text', 'Corliss Conway')
      cy.get('.officer-content')
        .find('.officer-basic-info-row')
        .eq(0)
        .should('text', '911,192')
      cy.get('.officer-content')
        .find('.officer-basic-info-row')
        .eq(1)
        .should('text', '59-year-old male white')
      cy.get('.officer-content')
        .find('.officer-basic-info-row')
        .eq(2)
        .should('text', '$57k/year')
      cy.get('.officer-content')
        .find('.officer-department')
        .should('text', 'New Orleans PD')
      cy.get('.officer-content')
        .find('.officer-summary-info')
        .should(
          'text',
          'Corliss Conway was named in\u00A03 documents in 2012 and 2017'
        )
    })

    describe('render officer documents', () => {
      it('renders officer documents items on desktop browser', () => {
        cy.viewport('macbook-13')

        cy.visit('/officers/1', {
          headers: {
            'user-agent':
              'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          },
        })

        cy.contains(`Documents (${officerDocumentsData.length})`)

        cy.get('.officer-documents-listview')
          .find('.document-item')
          .should('length', officerDocumentsData.length)

        cy.get('.officer-documents-listview')
          .find('.document-item')
          .eq(0)
          .find('.document-item-name')
          .should('text', officerDocumentsData[0].title)
        cy.get('.officer-documents-listview')
          .find('.document-item')
          .eq(0)
          .find('.document-item-department-name')
          .should('text', 'Port Allen PD')

        cy.get('.officer-documents-listview')
          .find('.document-item')
          .eq(1)
          .find('.document-item-name')
          .should('text', officerDocumentsData[1].title)
        cy.get('.officer-documents-listview')
          .find('.document-item')
          .eq(1)
          .find('.document-item-department-name')
          .should('text', 'ABC PD')

        cy.get('.officer-documents-listview')
          .find('.document-item')
          .eq(2)
          .find('.document-item-name')
          .should('text', officerDocumentsData[2].title)
        cy.get('.officer-documents-listview')
          .find('.document-item')
          .eq(2)
          .find('.document-item-department-name')
          .should('text', 'Any PD')
      })
    })
  })
})
