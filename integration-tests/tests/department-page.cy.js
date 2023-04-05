const { _ } = Cypress

describe('Department Page', () => {
  beforeEach(() => {
    cy.request('http://localhost:9000/api/departments/')
      .its('body')
      .as('departments')
  })
  describe('render introduction', () => {
    it('render department basics', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.location('pathname').should('eq', `/agency/${slug}/`)

      cy.request(`http://localhost:9000/api/departments/${slug}/`).then(
        (response) => {
          const department = response.body

          cy.get('.department-period').should(
            'text',
            `Incident data for this agency is limited to the years\u00A0${department.data_period}`
          )
          cy.get('.department-content')
            .find('.department-title')
            .contains('Agency')
          cy.get('.department-content')
            .find('.department-name')
            .should('text', department.name)
          cy.get('.department-content')
            .find('.department-city')
            .should('text', department.city)
          cy.get('.department-content')
            .find('.department-parish')
            .should('text', department.parish)

          cy.wrap(import('utils/formatter'))
            .invoke('formatNumber', department.officers_count)
            .then((value) =>
              cy
                .get('.summary-officers')
                .find('.summary-item-count')
                .should('text', value)
            )
          cy.wrap(import('utils/formatter'))
            .invoke('formatNumber', department.complaints_count)
            .then((value) =>
              cy
                .get('.summary-allegations')
                .find('.summary-item-count')
                .should('text', value)
            )
          cy.wrap(import('utils/formatter'))
            .invoke('formatNumber', department.news_articles_count)
            .then((value) =>
              cy
                .get('.summary-news-articles')
                .find('.summary-item-count')
                .should('text', value)
            )
          cy.wrap(import('utils/formatter'))
            .invoke('formatNumber', department.documents_count)
            .then((value) =>
              cy
                .get('.summary-documents')
                .find('.summary-item-count')
                .should('text', value)
            )
        }
      )
    })

    describe('Map Information Box', () => {
      it('renders map information box', function () {
        const slug = this.departments[1].id
        cy.visit(`/agency/${slug}/`)

        cy.request(
          `http://localhost:9000/api/departments/${slug}/migratory-by-department`
        ).then((response) => {
          const graphs = response.body.graphs
          const leftCount = _.filter(graphs, 'is_left').length
          const joinCount = graphs.length - leftCount

          cy.get('.migratory-information-box')
            .find('.migratory-year')
            .should('text', `${_.first(graphs).year} - ${_.last(graphs).year}`)
          cy.get('.migratory-information-box')
            .find('.migratory-join')
            .should('include.text', 'Officers joining from other agencies')
          cy.get('.migratory-information-box')
            .find('.migratory-join-count')
            .should('text', joinCount)
          cy.get('.migratory-information-box')
            .find('.migratory-left')
            .should('include.text', 'Officers leaving to join other agencies')
          cy.get('.migratory-information-box')
            .find('.migratory-left-count')
            .should('text', leftCount)
        })
      })

      it('shows join cards', function () {
        const slug = this.departments[1].id
        cy.visit(`/agency/${slug}/`)

        cy.request(
          `http://localhost:9000/api/departments/${slug}/migratory-by-department`
        ).then((response) => {
          const graphs = response.body.graphs
          const nodes = response.body.nodes
          const leftCount = _.filter(graphs, 'is_left').length
          const joinCount = graphs.length - leftCount

          const filteredGraphs = _.filter(
            graphs,
            (graph) => graph.start_node !== slug
          )
          const groupedGraphs = _.groupBy(filteredGraphs, 'start_node')
          const sortedGraphs = _.orderBy(
            groupedGraphs,
            ['length', 'start_node'],
            ['desc', 'asc']
          )

          cy.get('.migratory-information-box').find('.migratory-join').click()

          cy.get('.migratory-information-table.showing').should('exist')
          cy.get('.migratory-information-table')
            .find('.summary')
            .should('include.text', 'Officers joining from other agencies')
          cy.get('.migratory-information-table')
            .find('.count-sum')
            .should('text', joinCount)

          cy.get('.migratory-department').each(($el, index) => {
            expect($el.find('.name')).to.contain(
              `${nodes[sortedGraphs[index][0].start_node].name}`
            )
            expect($el.find('.count')).to.contain(
              `${sortedGraphs[index].length}`
            )
          })
        })
      })

      it('shows left cards', function () {
        const slug = this.departments[1].id
        cy.visit(`/agency/${slug}/`)

        cy.request(
          `http://localhost:9000/api/departments/${slug}/migratory-by-department`
        ).then((response) => {
          const graphs = response.body.graphs
          const nodes = response.body.nodes
          const leftCount = _.filter(graphs, 'is_left').length

          const filteredGraphs = _.filter(
            graphs,
            (graph) => graph.end_node !== slug
          )
          const groupedGraphs = _.groupBy(filteredGraphs, 'end_node')
          const sortedGraphs = _.orderBy(
            groupedGraphs,
            ['length', 'end_node'],
            ['desc', 'asc']
          )

          cy.get('.migratory-information-box').find('.migratory-left').click()

          cy.get('.migratory-information-table.showing').should('exist')
          cy.get('.migratory-information-table')
            .find('.summary')
            .should('include.text', 'Officers leaving to join other agencies')
          cy.get('.migratory-information-table')
            .find('.count-sum')
            .should('text', leftCount)

          cy.get('.migratory-department').each(($el, index) => {
            expect($el.find('.name')).to.contain(
              `${nodes[sortedGraphs[index][0].end_node].name}`
            )
            expect($el.find('.count')).to.contain(
              `${sortedGraphs[index].length}`
            )
          })
        })
      })
    })
  })

  describe('featured officers carousel', () => {
    it('render correctly', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.request(`http://localhost:9000/api/departments/${slug}/officers`).then(
        (response) => {
          const officers = response.body

          cy.get('[data-testid="Featured officers"]')
            .find('.carousel-title')
            .should('text', 'Featured officers')
          cy.get('[data-testid="Featured officers"]')
            .find('.swiper-slide')
            .should('length', 20)
          cy.get('[data-testid="Featured officers"]')
            .find('.swiper-slide:visible')
            .as('visibleSlides')
            .should('length', 4)

          cy.get('@visibleSlides').each(($el, index) => {
            if (officers[index].lastest_rank) {
              expect($el.find('.officer-rank')).to.contain(
                `${officers[index].lastest_rank}`
              )
            }
            expect($el.find('.officer-name')).to.contain(
              `${officers[index].name}`
            )
            if (officers[index].complaints_count > 0) {
              expect($el.find('.allegation-count')).to.contain(
                `${officers[index].complaints_count}`
              )
            }
            if (officers[index].use_of_forces_count > 0) {
              expect($el.find('.use-of-force-count')).to.contain(
                `${officers[index].use_of_forces_count}`
              )
            }
            if (officers[index].is_starred) {
              expect($el.find('.star-corner')).to.exist
            }
          })

          cy.get('[data-testid="Featured officers"]')
            .find('.carousel-prev.swiper-button-disabled')
            .should('exist')

          _.times(20, () => {
            cy.get('[data-testid="Featured officers"]')
              .find('.carousel-next')
              .click()
          })

          cy.get('[data-testid="Featured officers"]')
            .find('.carousel-next.swiper-button-disabled')
            .should('exist')
        }
      )
    })

    it('redirects to officer page when clicks on officer card', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.request(`http://localhost:9000/api/departments/${slug}/officers`).then(
        (response) => {
          const officers = response.body

          cy.get('[data-testid="Featured officers"]')
            .find('.swiper-slide')
            .eq(0)
            .click()

          cy.wrap(import('utils/paths'))
            .invoke('officerPath', officers[0].id, officers[0].name)
            .then((value) => cy.location('pathname').should('eq', value))
        }
      )
    })
  })

  describe('featured documents carousel', () => {
    it('render correctly', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.request(
        `http://localhost:9000/api/departments/${slug}/documents`
      ).then((response) => {
        const documents = response.body

        cy.get('[data-testid="Featured documents"]')
          .find('.carousel-title')
          .should('text', 'Featured documents')
        cy.get('[data-testid="Featured documents"]')
          .find('.swiper-slide')
          .should('length', 20)
        cy.get('[data-testid="Featured documents"]')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', 4)

        cy.get('@visibleSlides').each(($el, index) => {
          expect($el.find('.document-title')).to.contain(
            `${documents[index].title}`
          )
          if (documents[index].incident_date) {
            cy.wrap(import('utils/formatter'))
              .invoke('formatDate', documents[index].incident_date)
              .then((value) =>
                expect($el.find('.document-subtitle')).to.contain(value)
              )
          }
          if (documents[index].use_of_forces_count > 0) {
            expect($el.find('.use-of-force-count')).to.contain(
              `${documents[index].use_of_forces_count}`
            )
          }

          cy.get('@visibleSlides')
            .eq(index)
            .find('.document-preview')
            .should(
              'have.css',
              'background-image',
              `url("${documents[index].preview_image_url}")`
            )
        })

        cy.get('[data-testid="Featured documents"]')
          .find('.carousel-prev.swiper-button-disabled')
          .should('exist')

        _.times(20, () => {
          cy.get('[data-testid="Featured documents"]')
            .find('.carousel-next')
            .click()
        })

        cy.get('[data-testid="Featured documents"]')
          .find('.carousel-next.swiper-button-disabled')
          .should('exist')
      })
    })

    it('opens document url in new tab', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.request(
        `http://localhost:9000/api/departments/${slug}/documents`
      ).then((response) => {
        const documents = response.body

        cy.get('[data-testid="Featured documents"]')
          .find('.swiper-slide')
          .eq(0)
          .click()

        cy.get('@open').should(
          'to.be.calledWith',
          documents[0].url,
          '_blank',
          'noopener noreferrer'
        )
      })
    })
  })

  describe('featured news articles carousel', () => {
    it('render correctly', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.request(
        `http://localhost:9000/api/departments/${slug}/news_articles`
      ).then((response) => {
        const articles = response.body

        cy.get('[data-testid="Featured news"]')
          .find('.carousel-title')
          .should('text', 'Featured news')
        cy.get('[data-testid="Featured news"]')
          .find('.swiper-slide')
          .should('length', 20)
        cy.get('[data-testid="Featured news"]')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', 4)

        cy.get('@visibleSlides').each(($el, index) => {
          expect($el.find('.news-article-type')).to.contain('news article')
          expect($el.find('.news-article-title')).to.contain(
            `${articles[index].title}`
          )
          if (articles[index].published_date) {
            cy.wrap(import('utils/formatter'))
              .invoke('formatDate', articles[index].published_date)
              .then((value) =>
                expect($el.find('.news-article-subtitle').first()).to.contain(
                  value
                )
              )
          }
          if (articles[index].source_display_name) {
            expect($el.find('.news-article-subtitle').last()).to.contain(
              `${articles[index].source_display_name}`
            )
          }
        })

        cy.get('[data-testid="Featured news"]')
          .find('.carousel-prev.swiper-button-disabled')
          .should('exist')

        _.times(20, () => {
          cy.get('[data-testid="Featured news"]').find('.carousel-next').click()
        })

        cy.get('[data-testid="Featured news"]')
          .find('.carousel-next.swiper-button-disabled')
          .should('exist')
      })
    })

    it('opens news articles url in new tab', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.request(
        `http://localhost:9000/api/departments/${slug}/news_articles`
      ).then((response) => {
        const articles = response.body

        cy.get('[data-testid="Featured news"]')
          .find('.swiper-slide')
          .eq(0)
          .click()

        cy.get('@open').should(
          'to.be.calledWith',
          articles[0].url,
          '_blank',
          'noopener noreferrer'
        )
      })
    })
  })

  describe('datasets', () => {
    it('renders correctly', function () {
      const slug = this.departments[1].id
      cy.visit(`/agency/${slug}/`)

      cy.request(`http://localhost:9000/api/departments/${slug}/datasets`).then(
        (response) => {
          const datasets = response.body

          cy.get('.department-wrgl-files')
            .find('.wrgl-title')
            .should('text', 'Datasets')

          cy.get('.department-wrgl-files')
            .find('.wrgl-container')
            .each(($el, index) => {
              expect($el.find('.wrgl-name')).to.contain(
                `${datasets[index].name}`
              )
              expect($el.find('.wrgl-description')).to.exist
            })

          cy.get('.wrgl-download').should('have.css', 'background')
        }
      )
    })
  })
})
