import { appConfigData } from '../data/common-data'
import {
  officerDetailsData,
  officerDocumentsData,
  officerTimelineData,
} from '../data/officer-page-data'

describe('Officer Page', () => {
  it('redirect to login when not logged in', () => {
    cy.clearLocalStorage()
    cy.visit('/officers/1')

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
          url: 'http://localhost:8000/api/officers/1/',
          noQuery: true,
        },
        officerDetailsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/officers/1/documents/',
        },
        officerDocumentsData
      )
      cy.interceptExact(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/officers/1/timeline/',
        },
        officerTimelineData
      )
      cy.login()
    })

    it('renders officer basics info', () => {
      cy.visit('/officers/1')

      cy.location('pathname').should('eq', '/officers/1')
      cy.contains('Police Officer')
      cy.get('.officer-period').should(
        'text',
        'Data for this officer is limited to the years\u00A02012, 2013, 2014 and 2017-2019'
      )
      cy.get('.officer-basic-info')
        .find('.officer-name')
        .should('text', 'Corliss Conway')
      cy.get('.officer-basic-info')
        .find('.officer-basic-info-row')
        .eq(0)
        .should('text', '911,192')
      cy.get('.officer-basic-info')
        .find('.officer-basic-info-row')
        .eq(1)
        .should('text', '59-year-old male white')
      cy.get('.officer-basic-info')
        .find('.officer-basic-info-row')
        .eq(2)
        .should('text', '$57k/year')
      cy.get('.officer-basic-info')
        .find('.officer-department')
        .should('text', 'New Orleans PD')
      cy.get('.officer-basic-info')
        .find('.officer-summary-info')
        .should(
          'text',
          'Corliss Conway was named in\u00A03 documents in 2012 and 2017'
        )
    })

    describe('officer documents', () => {
      it('renders officer documents items', () => {
        cy.visit('/officers/1')

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

    describe('officer timeline', () => {
      it('renders officer timeline', () => {
        cy.visit('/officers/1')

        cy.get('.officer-timeline')
          .find('.timeline-header-text')
          .should('text', 'Timeline')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .should('have.length', 4)

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(0)
          .as('firstTimelineGroup')
          .find('.timeline-group-title')
          .should('text', '2020')
        cy.get('@firstTimelineGroup')
          .find('.timeline-item')
          .eq(0)
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@firstTimelineGroup')
          .find('.timeline-item')
          .eq(0)
          .find('.complaint-item-subtitle')
          .should('text', 'Exonerated')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(1)
          .as('secondTimelineGroup')
          .find('.timeline-group-title')
          .should('text', 'Mar 10, 2020')
        cy.get('@secondTimelineGroup')
          .find('.timeline-item')
          .should('have.length', 1)
        cy.get('@secondTimelineGroup')
          .find('.timeline-main-item')
          .should('text', 'Left from department')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(2)
          .as('thirdTimelineGroup')
          .find('.timeline-group-title')
          .should('text', 'Mar 10, 2019')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .should('have.length', 7)
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(0)
          .should('text', 'Joined department')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(1)
          .should('text', 'Left from department')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(2)
          .should('text', 'Changed rank to Senior police officer')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(3)
          .should('text', 'Salary changed to $65k/yr')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(4)
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(4)
          .find('.complaint-item-subtitle')
          .should('text', 'Exonerated')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(5)
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(5)
          .find('.complaint-item-subtitle')
          .should('text', 'Exonerated')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(6)
          .find('.document-title')
          .should('text', 'Document 2019-03-10')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(6)
          .find('.document-subtitle')
          .should('text', 'pdf')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(3)
          .as('forthTimelineGroup')
          .find('.timeline-group-title')
          .should('text', 'No Date')
        cy.get('@forthTimelineGroup')
          .find('.timeline-item')
          .eq(0)
          .find('.timeline-main-item')
          .should('text', 'Joined department')
        cy.get('@forthTimelineGroup')
          .find('.timeline-item')
          .eq(1)
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@forthTimelineGroup')
          .find('.timeline-item')
          .eq(1)
          .find('.complaint-item-subtitle')
          .should('text', 'Exonerated')
      })

      it('expands complaint on click', () => {
        cy.visit('/officers/1')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(0)
          .find('.timeline-item')
          .eq(0)
          .as('complaintItem')
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@complaintItem')
          .find('.complaint-item-subtitle')
          .should('text', 'Exonerated')
        cy.get('@complaintItem')
          .find('.complaint-item-content')
          .should('not.exist')
        cy.get('@complaintItem').find('.complaint-item-expand-icon').click()
        cy.get('@complaintItem').find('.complaint-item-content').should('exist')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(0)
          .contains('Rule Violation')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(0)
          .contains('Officer rule violation year 2020')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(1)
          .contains('Paragraph Violation')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(1)
          .contains('Officer paragraph violation year 2020')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(2)
          .contains('Disposition')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(2)
          .contains('Officer dispostion year 2020')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(3)
          .contains('Action')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(3)
          .contains('Officer action year 2020')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(4)
          .contains('Tracking ID')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(4)
          .contains('2020')
      })
    })
  })
})
