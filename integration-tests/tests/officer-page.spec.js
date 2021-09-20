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
      cy.interceptExact(
        {
          method: 'GET',
          url: 'http://localhost:8000/api/officers/1/download-xlsx/',
        },
        {
          body: new Blob([]),
          headers: {
            contentType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        }
      )
      cy.login()
    })

    it('renders officer basics info', () => {
      cy.visit('/officers/1')

      cy.location('pathname').should('eq', '/officers/1')
      cy.contains('Police Officer')
      cy.get('.officer-basic-info')
        .find('.officer-name')
        .should('text', 'Corliss Conway')
      cy.get('.officer-basic-info')
        .find('.officer-basic-info-row')
        .eq(0)
        .should('text', '911, 192')
      cy.get('.officer-basic-info')
        .find('.officer-basic-info-row')
        .eq(1)
        .should('text', '59-year-old white male')
      cy.get('.officer-basic-info')
        .find('.officer-basic-info-row')
        .eq(2)
        .should('text', '$54,123.12/year')
      cy.get('.officer-basic-info')
        .find('.officer-department')
        .should('text', 'New Orleans PD')
      cy.get('.officer-basic-info')
        .find('.officer-summary-info')
        .should('text', 'Corliss Conway is named in\u00A03 documents.')
    })

    it('changes title on officer clicked', () => {
      cy.visit('/')
      cy.title().should('eq', 'LLEAD')

      cy.visit('/officers/1')

      cy.title().should('eq', 'Corliss Conway')

      cy.visit('/')

      cy.title().should('eq', 'LLEAD')
    })

    describe('officer timeline', () => {
      it('renders officer timeline', () => {
        cy.visit('/officers/1')

        cy.get('.officer-period').should(
          'text',
          'Data for this officer is limited to the years\u00A02012, 2013, 2014 and 2017-2019'
        )
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
          .should(
            'have.text',
            'Joined\u00A0Unit 193 - Gang investigation division'
          )
        cy.get('@firstTimelineGroup')
          .find('.timeline-item')
          .eq(1)
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@firstTimelineGroup')
          .find('.timeline-item')
          .eq(1)
          .find('.complaint-item-subtitle')
          .should('text', 'Other disposition')

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
          .should('text', 'Left department')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(2)
          .as('thirdTimelineGroup')
          .find('.timeline-group-title')
          .should('text', 'Mar 10, 2019')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .should('have.length', 9)
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(0)
          .should('text', 'Joined department')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(1)
          .should('text', 'Left department')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(2)
          .should('text', 'Changed rank to Senior police officer')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(3)
          .find('.timeline-unit-change-row')
          .eq(0)
          .should(
            'have.text',
            'Joined\u00A0Unit 610 - Detective area - central'
          )
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(3)
          .find('.timeline-unit-change-row')
          .eq(1)
          .should('have.text', 'Leave Unit 177 - Superior area')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(4)
          .should('text', 'Salary changed to $65,124.57/year')
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
          .eq(5)
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(6)
          .find('.complaint-item-subtitle')
          .should('text', 'Exonerated')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(7)
          .find('.uof-item-subtitle')
          .should('text', 'Takedown (w/injury)')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(8)
          .find('.document-title')
          .should('text', 'Document 2019-03-10')
        cy.get('@thirdTimelineGroup')
          .find('.timeline-item')
          .eq(8)
          .find('.document-subtitle')
          .should('text', '24 pages')

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
          .eq(1)
          .as('complaintItem')
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@complaintItem')
          .find('.complaint-item-subtitle')
          .should('text', 'Other disposition')
        cy.get('@complaintItem')
          .find('.complaint-item-content')
          .should('not.visible')
        cy.get('@complaintItem').find('.complaint-item-expand-icon').click()
        cy.get('@complaintItem')
          .find('.complaint-item-content')
          .should('be.visible')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(0)
          .contains('Rule Violation')
        cy.get('@complaintItem')
          .find('.complaint-item-info-row')
          .eq(0)
          .contains('Other')
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
          .contains('Other disposition')
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

        cy.window().then((win) => {
          cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt')
        })
        cy.get('@complaintItem').contains('Copy link').click()
        cy.get('@copyToClipboardPrompt').should('be.called')
        cy.get('@copyToClipboardPrompt').should((prompt) => {
          expect(prompt.args[0][1]).to.equal(
            'http://localhost:8080/officers/1/?complaint_id=103'
          )
        })
      })

      it('expands use of force on click', () => {
        cy.visit('/officers/1')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(2)
          .find('.timeline-item')
          .eq(7)
          .as('useOfForceItem')
          .find('.uof-item-title')
          .should('have.text', 'Used force')
        cy.get('@useOfForceItem')
          .find('.uof-item-subtitle')
          .should('text', 'Takedown (w/injury)')
        cy.get('@useOfForceItem')
          .find('.uof-item-content')
          .should('not.visible')
        cy.get('@useOfForceItem').find('.uof-item-expand-icon').click()
        cy.get('@useOfForceItem').find('.uof-item-content').should('be.visible')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(0)
          .contains('L2-Takedown (w/injury)')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(1)
          .contains('Resisting lawful arrest')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(2)
          .contains('UOF Justified')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(3)
          .contains('Call for service')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(4)
          .contains('Complainant')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(5)
          .contains('26-year-old white female')
        cy.get('@useOfForceItem')
          .find('.uof-item-info-row')
          .eq(6)
          .contains('Complainant')

        cy.window().then((win) => {
          cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt')
        })
        cy.get('@useOfForceItem').contains('Copy link').click()
        cy.get('@copyToClipboardPrompt').should('be.called')
        cy.get('@copyToClipboardPrompt').should((prompt) => {
          expect(prompt.args[0][1]).to.equal(
            'http://localhost:8080/officers/1/?uof_id=1'
          )
        })
      })

      it('hightlights and scrolls to the complaint belong to the url', () => {
        cy.visit('/officers/1/?complaint_id=101')

        cy.get('.timeline-complaint-highlight')
          .find('.complaint-item-content')
          .should('be.visible')

        cy.get('.timeline-complaint-highlight')
          .find('.complaint-item-info-row-value')
          .eq(0)
          .should('have.text', 'Misconduct')
        cy.get('.timeline-complaint-highlight')
          .find('.complaint-item-info-row-value')
          .eq(1)
          .should('have.text', 'Officer paragraph violation 2019-03-10')
        cy.get('.timeline-complaint-highlight')
          .find('.complaint-item-info-row-value')
          .eq(2)
          .should('have.text', 'Exonerated')
        cy.get('.timeline-complaint-highlight')
          .find('.complaint-item-info-row-value')
          .eq(3)
          .should('have.text', 'Officer action 2019-03-10')
        cy.get('.timeline-complaint-highlight')
          .find('.complaint-item-info-row-value')
          .eq(4)
          .should('have.text', '10-03')
      })

      it('renders filter groups', () => {
        cy.visit('/officers/1')

        cy.get('.timeline-filters')
          .find('.filter-item')
          .should('have.length', 5)

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .should('have.length', 4)

        cy.get('.timeline-filters')
          .find('.filter-item')
          .eq(0)
          .should('have.text', 'All')

        cy.get('.timeline-filters')
          .find('.filter-item')
          .eq(1)
          .should('have.text', 'Complaints (4)')

        cy.get('.timeline-filters')
          .find('.filter-item')
          .eq(2)
          .should('have.text', 'Documents (1)')

        cy.get('.timeline-filters')
          .find('.filter-item')
          .eq(3)
          .should('have.text', 'Rank/unit (3)')

        cy.get('.timeline-filters')
          .find('.filter-item')
          .eq(4)
          .should('have.text', 'Use of force (1)')

        cy.get('.officer-timeline')
          .find('.timeline-header-actions')
          .should('not.exist')

        cy.get('.officer-timeline').find('.timeline-header-actions-btn').click()

        cy.get('.officer-timeline')
          .find('.timeline-header-actions')
          .should('exist')

        cy.get('.officer-timeline').find('.timeline-header-actions-btn').click()

        cy.get('.timeline-filters').find('.filter-item').eq(1).click()

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .should('have.length', 3)

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(0)
          .find('.complaint-item-title')
          .should('have.text', 'Accused of misconduct')
      })

      it('shows event details', () => {
        cy.visit('/officers/1')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(0)
          .find('.timeline-item')
          .eq(1)
          .as('complaintItem')
          .find('.complaint-item-title')
          .should('text', 'Accused of misconduct')
        cy.get('@complaintItem')
          .find('.complaint-item-content')
          .should('not.visible')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(2)
          .find('.timeline-item')
          .eq(5)
          .as('secondComplaintItem')
        cy.get('@secondComplaintItem')
          .find('.complaint-item-content')
          .should('not.visible')

        cy.get('.officer-timeline')
          .find('.timeline-group')
          .eq(2)
          .find('.timeline-item')
          .eq(7)
          .as('useOfForceItem')
          .find('.uof-item-content')
          .should('not.visible')

        cy.get('.officer-timeline')
          .find('.timeline-header-actions')
          .should('not.exist')
        cy.get('.officer-timeline').find('.timeline-header-actions-btn').click()
        cy.get('.officer-timeline')
          .find('.timeline-header-actions')
          .should('be.visible')
        cy.get('.officer-timeline')
          .find('.show-event-details')
          .should('have.text', 'Show event details')
          .click()
        cy.get('.officer-timeline')
          .find('.timeline-header-actions')
          .should('not.exist')

        cy.get('@complaintItem').find('.complaint-item-content').should('exist')
        cy.get('@secondComplaintItem')
          .find('.complaint-item-content')
          .should('be.visible')
        cy.get('@useOfForceItem').find('.uof-item-content').should('be.visible')

        cy.get('.officer-timeline').find('.timeline-header-actions-btn').click()
        cy.get('.officer-timeline')
          .find('.show-event-details')
          .should('have.text', 'Hide event details')
          .click()

        cy.get('@complaintItem')
          .find('.complaint-item-content')
          .should('not.visible')
        cy.get('@secondComplaintItem')
          .find('.complaint-item-content')
          .should('not.visible')
        cy.get('@useOfForceItem')
          .find('.uof-item-content')
          .should('not.visible')
      })

      it('download officer detail', () => {
        cy.visit('/officers/1')

        cy.get('.officer-timeline')
          .find('.timeline-header-download')
          .should('not.exist')
        cy.get('.officer-timeline').find('.timeline-download-btn').click()
        cy.get('.officer-timeline')
          .find('.timeline-header-download')
          .should('be.visible')
        cy.get('.officer-timeline')
          .find('.show-download-file')
          .should('have.text', 'Download officer timeline (.xlsx)')
          .click()
        cy.get('.officer-timeline')
          .find('.timeline-header-download')
          .should('not.exist')
      })
    })
  })
})
