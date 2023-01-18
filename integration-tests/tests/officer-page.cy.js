const { _ } = Cypress

import { snakeToCamel } from 'utils/tools'

import { timelineSelector } from 'selectors/officer-page/timeline'
import { TIMELINE_KINDS } from 'constants/common'

const assertItem = function (item, $element, elementIndex) {
  switch (item.kind) {
    case TIMELINE_KINDS.JOINED:
      cy.wrap($element)
        .find('.timeline-joined-item')
        .should('text', `Joined ${item.department}`)
      break
    case TIMELINE_KINDS.LEFT:
      cy.wrap($element)
        .find('.timeline-left-item')
        .should('text', `Left ${item.department}`)
      break
    case TIMELINE_KINDS.COMPLAINT: {
      const complaintData = _.filter(
        [
          {
            title: 'Allegation',
            content: item.allegation,
          },
          {
            title: 'Allegation Description',
            content: item.allegationDesc,
          },
          {
            title: 'Disposition',
            content: item.disposition,
          },
          {
            title: 'Action',
            content: item.action,
          },
          {
            title: 'Tracking ID',
            content: item.trackingId,
          },
        ],
        'content'
      )

      cy.wrap($element)
        .find('.complaint-item-title')
        .should('text', 'Accused of misconduct')

      cy.wrap($element)
        .find('.complaint-item-subtitle')
        .should('text', item.disposition)

      _.map(complaintData, (item) => {
        cy.wrap($element)
          .contains(item.title)
          .parent()
          .find('.complaint-item-info-row-value')
          .should('text', _.upperFirst(_.trim(item.content, '.')))
      })
      break
    }

    case TIMELINE_KINDS.UOF: {
      const uofData = _.filter(
        [
          {
            title: 'Force Reason',
            content: item.useOfForceReason,
          },
          {
            title: 'Disposition',
            content: item.disposition,
          },
          {
            title: 'Service Type',
            content: item.serviceType,
          },
          {
            title: 'Citizen Information',
            content: item.citizenInformation,
          },
          {
            title: 'Tracking ID',
            content: item.trackingId,
          },
        ],
        'content'
      )

      cy.wrap($element).find('.uof-item-title').should('text', 'Used force')

      cy.wrap($element)
        .find('.uof-item-subtitle')
        .should('text', item.useOfForceDescription)

      _.map(uofData, (item) => {
        if (item.title !== 'Citizen Information') {
          cy.wrap($element)
            .contains(item.title)
            .parent()
            .find('.uof-item-info-row-value')
            .should('text', item.content)
        } else {
          cy.wrap($element)
            .contains(item.title)
            .parent()
            .find('.uof-item-info-row-value')
            .each(($el, index) => {
              cy.wrap($el).should('text', item.content[index])
            })
        }
      })
      break
    }

    case TIMELINE_KINDS.SALARY_CHANGE:
      cy.get('.timeline-item')
        .find('.salary-change-item')
        .each(($el, index) => {
          if (index === elementIndex) {
            cy.wrap($el).should('text', `Salary changed to ${item.salary}`)
          }
        })
      break

    case TIMELINE_KINDS.DOCUMENT:
      cy.wrap($element).find('.document-title').should('text', item.title)
      cy.wrap($element)
        .find('.document-subtitle')
        .should('text', `${item.pagesCount} page`)
      break

    case TIMELINE_KINDS.RANK_CHANGE:
      cy.get('.rank-change-item').should('text', `Changed rank to ${item.rank}`)
      break

    case TIMELINE_KINDS.NEWS_ARTICLE:
      cy.get('.timeline-news-article-card')
        .find('.news-article-title')
        .should('text', item.title)
      cy.get('.timeline-news-article-card')
        .find('.news-article-subtitle')
        .should('text', item.sourceName)
      break

    case TIMELINE_KINDS.APPEAL: {
      const appealData = _.filter(
        [
          {
            title: 'Action Appealed',
            content: item.actionAppealed,
          },
          {
            title: 'Appeal Disposition',
            content: item.appealDisposition,
          },
          {
            title: 'Motion',
            content: item.motions,
          },
          {
            title: 'Counsel',
            content: item.counsel,
          },
          {
            title: 'Charging Supervisor',
            content: item.chargingSupervisor,
          },
          {
            title: 'Department',
            content: item.department,
          },
          {
            title: 'Appeal Disposition Date',
            content: item.date,
          },
          {
            title: 'Docket Number',
            content: item.docketNo,
          },
        ],
        'content'
      )

      cy.get('.timeline-appeal-item')
        .find('.appeal-item-title')
        .should('text', `Appealed ${item.actionAppealed}`)
      cy.get('.timeline-appeal-item')
        .find('.appeal-item-subtitle')
        .should('text', item.appealDisposition)
      _.map(appealData, (item) => {
        cy.wrap($element)
          .contains(item.title)
          .parent()
          .find('.appeal-item-info-row-value')
          .should('text', item.content)
      })
      break
    }

    case TIMELINE_KINDS.UNIT_CHANGE:
      cy.get('.timeline-unit-change-item').each(($el, index) => {
        if (index === elementIndex) {
          cy.wrap($el)
            .find('.timeline-unit-change-row')
            .eq(0)
            .should(
              'text',
              `Joined\u00A0Unit ${item.departmentCode} - ${item.departmentDesc}`
            )
          if (item.prevDepartmentCode) {
            cy.wrap($el)
              .find('.timeline-unit-change-row')
              .eq(1)
              .should(
                'text',
                `Leave Unit\u00A0${item.prevDepartmentCode} - ${item.prevDepartmentDesc}`
              )
          }
        }
      })
      break
  }
}

describe('Officer Page', () => {
  beforeEach(() => {
    cy.request('http://localhost:9000/api/officers/').its('body').as('officers')
  })

  describe('officer basics', () => {
    it('renders successfully', function () {
      const id = this.officers[1].id
      const name = this.officers[1].name
      cy.visit(`/officers/${id}/`)

      cy.wrap(import('utils/paths'))
        .invoke('officerPath', id, name)
        .then((value) => cy.location('pathname').should('eq', value))

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const timeline = response.body

          cy.get('.officer-period').should(
            'text',
            `Incident data for this officer is limited to the\u00A0years\u00A0${timeline.timeline_period[0]}`
          )
        }
      )

      cy.request(`http://localhost:9000/api/officers/${id}/`).then(
        (response) => {
          const officer = response.body

          cy.get('.officer-basic-info')
            .find('.officer-rank')
            .should('text', `${_.startCase(officer.latest_rank)}`)
          cy.get('.officer-basic-info')
            .find('.officer-name')
            .should('text', `${officer.name}`)
          if (officer.badges) {
            cy.get('.officer-basic-info')
              .find('.officer-badges')
              .should('include.text', `${officer.badges[0]}`)
          }
          cy.get('.officer-basic-info')
            .find('.officer-basic-info-row')
            .eq(1)
            .should('text', `${officer.race}`)
          cy.get('.officer-basic-info')
            .find('.officer-basic-info-row')
            .eq(2)
            .should(
              'text',
              `$${parseFloat(officer.salary).toLocaleString()}/year`
            )
          cy.get('.officer-basic-info')
            .find('.officer-departments')
            .should('text', `${officer.departments[0].name}`)
          if (officer.complaints_count > 0) {
            cy.get('.officer-basic-info')
              .find('.officer-summary-info')
              .should(
                'include.text',
                `${officer.complaints_count} misconduct allegations.`
              )
          }
          if (officer.documents_count > 0) {
            cy.get('.officer-basic-info')
              .find('.officer-summary-info')
              .should('include.text', `${officer.documents_count} documents.`)
          }
        }
      )
    })

    it('redirects to department page on click officer department', function () {
      const id = this.officers[1].id
      const agencySlug = this.officers[1].departments[0].id

      cy.visit(`/officers/${id}/`)

      cy.wrap(import('utils/paths'))
        .invoke('officerPath', id, name)
        .then((value) => cy.location('pathname').should('eq', value))

      cy.get('.officer-basic-info').find('.officer-department').eq(0).click()

      cy.location('pathname').should('eq', `/agency/${agencySlug}/`)
    })

    it('changes title on officer clicked', function () {
      const id = this.officers[1].id
      const name = this.officers[1].name

      cy.visit('/')
      cy.title().should('eq', 'LLEAD')

      cy.visit(`/officers/${id}`)
      cy.title().should('eq', `${name}`)

      cy.visit('/')

      cy.title().should('eq', 'LLEAD')
    })
  })

  describe('officer timeline', () => {
    beforeEach(() => {
      cy.request(
        'http://localhost:9000/api/officers/testing-officer-timelines/'
      )
        .its('body')
        .as('officerIds')
    })

    it('renders groups successfully', function () {
      const id = this.officerIds.complaint_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-header-text')
            .should('text', 'Timeline')
          cy.get('.officer-timeline')
            .find('.timeline-group')
            .as('timelineGroup')
            .should('have.length', sortedTimeline.length)

          cy.get('@timelineGroup').each(($el, index) => {
            const { groupName, leftGroup } = sortedTimeline[index]

            expect($el.find('.timeline-group-title')).to.contain(groupName)

            if (leftGroup) {
              expect($el).to.have.class('left-group')
            } else {
              expect($el).not.to.have.class('left-group')
            }
          })
        }
      )
    })

    it('renders complaint successfully', function () {
      const id = this.officerIds.complaint_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]
                  if (item.kind === TIMELINE_KINDS.COMPLAINT) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders use of force successfully', function () {
      const id = this.officerIds.uof_officer_id
      cy.visit(`/officers/${id}/`)

      cy.get('.timeline-header-actions-btn').click()
      cy.get('.show-event-details').click()

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]
                  if (item.kind === TIMELINE_KINDS.UOF) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders joined and left successfully', function () {
      const id = this.officerIds.hire_and_left_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]

                  if (
                    [TIMELINE_KINDS.LEFT, TIMELINE_KINDS.JOINED].includes(
                      item.kind
                    )
                  ) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders appeal successfully', function () {
      const id = this.officerIds.appeal_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]
                  if (item.kind === TIMELINE_KINDS.APPEAL) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders documents successfully', function () {
      const id = this.officerIds.document_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]
                  if (item.kind === TIMELINE_KINDS.DOCUMENT) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders news artticles successfully', function () {
      const id = this.officerIds.news_article_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]
                  if (item.kind === TIMELINE_KINDS.NEWS_ARTICLE) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders rank changes successfully', function () {
      const id = this.officerIds.rank_change_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]
                  if (item.kind === TIMELINE_KINDS.RANK_CHANGE) {
                    assertItem(item, $item_el)
                  }
                })
            })
        }
      )
    })

    it('renders salary changes successfully', function () {
      const id = this.officerIds.rank_change_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          let salaryIndex = 0
          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]

                  if (item.kind === TIMELINE_KINDS.SALARY_CHANGE) {
                    assertItem(item, $item_el, salaryIndex)
                    salaryIndex = salaryIndex + 1
                  }
                })
            })
        }
      )
    })

    it('renders unit changes successfully', function () {
      const id = this.officerIds.unit_change_officer_id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const sortedTimeline = timelineSelector({
            officerPage: {
              timeline: {
                timeline: snakeToCamel(response.body.timeline),
              },
            },
          })

          let unitChangeIndex = 0
          cy.get('.officer-timeline')
            .find('.timeline-group')
            .each(($el, index) => {
              const { items } = sortedTimeline[index]

              cy.wrap($el)
                .find('.timeline-item')
                .each(($item_el, item_index) => {
                  const item = items[item_index]

                  if (item.kind === TIMELINE_KINDS.UNIT_CHANGE) {
                    assertItem(item, $item_el, unitChangeIndex)
                    unitChangeIndex = unitChangeIndex + 1
                  }
                })
            })
        }
      )
    })

    it('expands complaint on click', function () {
      const id = this.officers[1].id
      cy.visit(`/officers/${id}/`)

      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const complaintTimeline = _.filter(
            response.body.timeline,
            (timelineItem) => 'COMPLAINT' === timelineItem['kind']
          )
          const sortedComplaintTimeline = _.orderBy(
            complaintTimeline,
            [
              (o) => {
                return o.date || ''
              },
            ],
            ['desc']
          )
          const complaint = sortedComplaintTimeline[0]

          cy.get('.officer-timeline')
            .find('.timeline-group')
            .eq(2)
            .find('.timeline-item')
            .eq(0)
            .as('complaintItem')
            .find('.complaint-item-title')
            .should('text', 'Accused of misconduct')
          cy.get('@complaintItem')
            .find('.complaint-item-info-row')
            .should('have.length', 3)
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
            .contains(_.capitalize(complaint.allegation))
          cy.get('@complaintItem')
            .find('.complaint-item-info-row')
            .eq(1)
            .contains(_.capitalize(complaint.disposition))

          cy.window().then((win) => {
            cy.stub(win, 'prompt')
              .returns(win.prompt)
              .as('copyToClipboardPrompt')
          })
          cy.get('@complaintItem').contains('Copy link').click()
          cy.get('@copyToClipboardPrompt').should('be.called')
          cy.get('@copyToClipboardPrompt').should((prompt) => {
            expect(prompt.args[0][1]).to.equal(
              `http://localhost:9090/officers/${id}/?complaint_id=${complaint.id}`
            )
          })
        }
      )
    })

    it('expands use of force on click', function () {
      const id = this.officers[0].id
      cy.visit(`/officers/${id}/`)
      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const uofTimeline = _.filter(
            response.body.timeline,
            (timelineItem) => 'UOF' === timelineItem['kind']
          )
          const sortedUofTimeline = _.orderBy(uofTimeline, ['date'], ['desc'])
          const useOfForce = sortedUofTimeline[0]

          cy.get('.timeline-filters').find('.filter-item').eq(2).click()
          cy.get('.officer-timeline')
            .find('.timeline-group')
            .eq(0)
            .find('.timeline-item')
            .eq(0)
            .as('useOfForceItem')
            .find('.uof-item-title')
            .should('have.text', 'Used force')
          cy.get('@useOfForceItem')
            .find('.uof-item-content')
            .should('not.visible')
          cy.get('@useOfForceItem').find('.uof-item-expand-icon').click()
          cy.get('@useOfForceItem')
            .find('.uof-item-content')
            .should('be.visible')
          cy.get('@useOfForceItem')
            .find('.uof-item-info-row')
            .eq(0)
            .contains(_.capitalize(useOfForce.use_of_force_reason))
          cy.get('@useOfForceItem')
            .find('.uof-item-info-row')
            .eq(1)
            .contains(_.capitalize(useOfForce.disposition))
          cy.get('@useOfForceItem')
            .find('.uof-item-info-row')
            .eq(2)
            .contains(_.capitalize(useOfForce.service_type))
          cy.get('@useOfForceItem')
            .find('.uof-item-info-row')
            .eq(3)
            .contains(_.capitalize(useOfForce.citizen_information[0]))

          cy.window().then((win) => {
            cy.stub(win, 'prompt')
              .returns(win.prompt)
              .as('copyToClipboardPrompt')
          })
          cy.get('@useOfForceItem').contains('Copy link').click()
          cy.get('@copyToClipboardPrompt').should('be.called')
          cy.get('@copyToClipboardPrompt').should((prompt) => {
            expect(prompt.args[0][1]).to.equal(
              `http://localhost:9090/officers/${id}/?uof_id=${useOfForce.id}`
            )
          })
        }
      )
    })

    it('hightlights and scrolls to the complaint belong to the url', function () {
      const id = this.officers[0].id
      const complaintId = 267942
      cy.visit(`/officers/${id}/?complaint_id=${complaintId}`)
      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const timeline = _.find(
            response.body.timeline,
            (timelineItem) => complaintId === timelineItem.id
          )

          cy.get('.timeline-complaint-highlight')
            .find('.complaint-item-content')
            .should('be.visible')
          cy.get('.timeline-complaint-highlight')
            .find('.complaint-item-info-row-value')
            .eq(0)
            .should('have.text', _.capitalize(timeline.allegation))
          cy.get('.timeline-complaint-highlight')
            .find('.complaint-item-info-row-value')
            .eq(1)
            .should('have.text', _.capitalize(timeline.disposition))
          cy.get('.timeline-complaint-highlight')
            .find('.complaint-item-info-row-value')
            .eq(2)
            .should('have.text', _.capitalize(timeline.tracking_id))
        }
      )
    })

    it('renders filter groups', function () {
      const id = this.officers[0].id
      cy.visit(`/officers/${id}`)
      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        (response) => {
          const nAllegationTimeline = _.filter(
            response.body.timeline,
            (timeline) => timeline.kind === 'COMPLAINT'
          ).length
          const nUOFTimeline = _.filter(
            response.body.timeline,
            (timeline) => timeline.kind === 'UOF'
          ).length
          cy.get('.timeline-filters')
            .find('.filter-item')
            .should('have.length', 3)

          cy.get('.timeline-filters')
            .find('.filter-item')
            .eq(0)
            .should('have.text', 'All')

          cy.get('.timeline-filters')
            .find('.filter-item')
            .eq(1)
            .should('have.text', `Allegations (${nAllegationTimeline})`)

          cy.get('.timeline-filters')
            .find('.filter-item')
            .eq(2)
            .should('have.text', `Use of Force (${nUOFTimeline})`)
        }
      )
    })

    it('shows event details', function () {
      const id = this.officers[0].id
      cy.visit(`/officers/${id}`)
      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        () => {
          cy.get('.officer-timeline')
            .find('.timeline-group')
            .eq(0)
            .find('.timeline-item')
            .eq(0)
            .as('firstComplaintItem')
          cy.get('@firstComplaintItem')
            .find('.complaint-item-content')
            .should('not.visible')
          cy.get('.officer-timeline')
            .find('.timeline-group')
            .eq(0)
            .find('.timeline-item')
            .eq(1)
            .as('secondComplaintItem')
          cy.get('@secondComplaintItem')
            .find('.complaint-item-content')
            .should('not.visible')

          cy.get('.officer-timeline')
            .find('.timeline-header-actions-btn')
            .click()
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

          cy.get('@firstComplaintItem')
            .find('.complaint-item-content')
            .should('be.visible')
          cy.get('@secondComplaintItem')
            .find('.complaint-item-content')
            .should('be.visible')

          cy.get('.officer-timeline')
            .find('.timeline-header-actions-btn')
            .click()
          cy.get('.officer-timeline')
            .find('.show-event-details')
            .should('have.text', 'Hide event details')
            .click()

          cy.get('@firstComplaintItem')
            .find('.complaint-item-content')
            .should('not.visible')
          cy.get('@secondComplaintItem')
            .find('.complaint-item-content')
            .should('not.visible')
        }
      )
    })

    it('download officer detail', function () {
      const id = this.officers[0].id
      cy.visit(`/officers/${id}`)
      cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
        () => {
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
        }
      )
    })
  })
})
