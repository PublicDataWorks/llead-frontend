const { _ } = Cypress

describe('Search Modal', () => {
  before(() => {
    cy.resetDatabase()
    cy.rebuildIndex()
  })

  it('toggles search modal', () => {
    cy.visit('/')

    cy.get('.search-modal').should('not.exist')

    cy.get('.search-icon').click()

    cy.get('.search-modal').should('exist')
    cy.get('.search-modal')
      .find('input')
      .invoke('attr', 'placeholder')
      .should('contain', 'Search by name, agency, or keyword')

    cy.get('.search-modal').find('.close-btn').click()
    cy.get('.search-modal').should('not.exist')

    cy.get('.front-page').find('.search-input').click()
    cy.get('.search-modal')
      .find('input')
      .invoke('attr', 'placeholder')
      .should('contain', 'Search by name, agency, or keyword')

    cy.get('.featured-search-backdrop').click()
    cy.get('.search-modal').should('not.exist')
  })

  it('renders seach header', () => {
    const searchQuery = 'new'

    cy.visit('/')
    cy.get('.search-icon').click()

    cy.request(`http://localhost:9000/api/search/?q=${searchQuery}/`).then(
      (response) => {
        const searchResults = response.body
        const searchSection = [
          'all',
          'agencies',
          'officers',
          'documents',
          'articles',
        ]

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-modal').find('.clear-btn').should('be.visible')

        cy.get('.search-bar-container')
          .find('.swiper-slide')
          .should('length', 5)

        cy.get('.search-bar-container')
          .find('.swiper-slide')
          .eq(0)
          .should('have.class', 'is-active')

        cy.get('.search-bar-container')
          .find('.swiper-slide')
          .each(($el, index) => {
            cy.wrap($el)
              .find('.title')
              .should('text', _.upperFirst(searchSection[index]))
            if (index === 0) {
              cy.wrap($el)
                .find('.count')
                .should(
                  'text',
                  _.reduce(
                    searchResults,
                    (sum, section) => sum + section.count,
                    0
                  )
                )
            } else {
              cy.wrap($el)
                .find('.count')
                .should('text', searchResults[`${searchSection[index]}`].count)
            }
          })
      }
    )
  })

  it('clears search query', () => {
    const searchQuery = 'new'

    cy.visit('/')
    cy.get('.search-icon').click()
    cy.get('.search-modal').find('input').type(searchQuery)

    cy.get('.search-modal')
      .find('input')
      .invoke('attr', 'value')
      .should('contain', 'new')

    cy.get('.search-modal').find('.clear-btn').click()

    cy.get('.search-modal')
      .find('input')
      .invoke('attr', 'value')
      .should('contain', '')
  })

  describe('Search all', () => {
    it('renders seach all', () => {
      const searchQuery = 'new'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(`http://localhost:9000/api/search/?q=${searchQuery}/`).then(
        (response) => {
          const searchResults = response.body

          cy.get('.search-modal').find('input').type(searchQuery)

          cy.get('.search-all')
            .find('.search-result')
            .each(($el) => {
              cy.wrap($el)
                .find('.search-section')
                .invoke('text')
                .then((section) => {
                  cy.wrap($el)
                    .find('.search-title')
                    .should(
                      'text',
                      `${searchResults[section].count} results for\u00A0\u201C${searchQuery}\u201D\u00A0in\u00A0${section}`
                    )

                  if (searchResults[section].count > 5) {
                    cy.wrap($el)
                      .find('.search-more')
                      .should(
                        'text',
                        `+ ${searchResults[section].count - 5} more`
                      )
                  }
                })
            })
        }
      )
    })

    it('does not render section in seach all if no section count', () => {
      const searchQuery = 'newe'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(`http://localhost:9000/api/search/?q=${searchQuery}/`).then(
        (response) => {
          const searchResults = response.body
          const searchSection = [
            'all',
            'agencies',
            'officers',
            'documents',
            'articles',
          ]

          cy.get('.search-modal').find('input').type(searchQuery)

          _.forEach(searchSection, (section) => {
            if (searchResults[section] && searchResults[section].count === 0) {
              cy.get('.search-all').contains(section).should('not.exist')
            }
          })
        }
      )
    })
  })

  describe('Search particular', () => {
    it('renders department results', () => {
      const searchQuery = 'new'
      const section = 'agencies'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        const searchResults = response.body
        const departments = searchResults[section].results

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Agencies')
          .parent()
          .click({ force: true })

        cy.get('.particular-search')
          .find('.search-title')
          .should(
            'text',
            `${searchResults[section].count} results for\u00A0\u201C${searchQuery}\u201D\u00A0in\u00A0${section}`
          )

        cy.get('.department-item').each(($el, index) => {
          if (!_.isEmpty(departments[index].parish)) {
            cy.wrap($el)
              .find('.department-item-parish')
              .should('text', `Agency | ${departments[index].parish}`)
          } else {
            cy.wrap($el)
              .find('.department-item-parish')
              .should('include.text', 'Agency')
          }

          cy.wrap($el)
            .find('.department-item-name')
            .should('text', departments[index].name)
        })
      })
    })

    it('redirects to department page when clicks on department card', () => {
      const searchQuery = 'new'
      const section = 'agencies'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        const searchResults = response.body

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Agencies')
          .parent()
          .click({ force: true })

        cy.get('.department-item').eq(0).click({ force: true })

        cy.location('pathname').should(
          'eq',
          `/agency/${searchResults[section].results[0].id}/`
        )
      })
    })

    it('gets more department results when scroll down', () => {
      const searchQuery = 'ne'

      cy.visit('/')
      cy.get('.search-icon').click()
      cy.get('.search-modal').find('input').type(searchQuery)
      cy.get('.search-bar-container')
        .contains('Agencies')
        .parent()
        .click({ force: true })

      cy.get('.department-item').should('have.length', 20)

      cy.get('.particular-search').scrollTo('bottom')

      cy.get('.department-item').should('have.length.greaterThan', 20)
    })

    it('renders officer results', () => {
      const searchQuery = 'new'
      const section = 'officers'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        const searchResults = response.body
        const officers = searchResults[section].results

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Officers')
          .parent()
          .click({ force: true })

        cy.get('.particular-search')
          .find('.search-title')
          .should(
            'text',
            `${searchResults[section].count} results for\u00A0\u201C${searchQuery}\u201D\u00A0in\u00A0${section}`
          )

        cy.get('.officer-item').each(($el, index) => {
          if (!_.isEmpty(officers[index].departments)) {
            cy.wrap($el)
              .find('.officer-item-department')
              .should(
                'text',
                `Police Officer | ${officers[index].departments[0].name}`
              )
          } else {
            cy.wrap($el)
              .find('.officer-item-department')
              .should('include.text', 'Police Officer')
          }

          cy.wrap($el)
            .find('.officer-item-name')
            .should('text', officers[index].name)
        })
      })
    })

    it('redirects to officer page when clicks on officer card', () => {
      const searchQuery = 'new'
      const section = 'officers'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        const searchResults = response.body
        const officers = searchResults[section].results

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Officers')
          .parent()
          .click({ force: true })

        cy.get('.officer-item').eq(0).click({ force: true })

        cy.wrap(import('utils/paths'))
          .invoke('officerPath', officers[0].id, officers[0].name)
          .then((value) => cy.location('pathname').should('eq', value))
      })
    })

    it('gets more officer results when scroll down', () => {
      const searchQuery = 'ne'

      cy.visit('/')
      cy.get('.search-icon').click()
      cy.get('.search-modal').find('input').type(searchQuery)
      cy.get('.search-bar-container')
        .contains('Officers')
        .parent()
        .click({ force: true })

      cy.get('.officer-item').should('have.length', 20)

      cy.get('.particular-search').scrollTo('bottom')

      cy.get('.officer-item').should('have.length.greaterThan', 20)
    })

    it('renders documents results', () => {
      const searchQuery = 'new'
      const section = 'documents'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        const searchResults = response.body
        const documents = searchResults[section].results

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Documents')
          .parent()
          .click({ force: true })

        cy.get('.particular-search')
          .find('.search-title')
          .should(
            'text',
            `${searchResults[section].count} results for\u00A0\u201C${searchQuery}\u201D\u00A0in\u00A0${section}`
          )

        cy.get('.document-item').each(($el, index) => {
          if (!_.isEmpty(documents[index].departments)) {
            cy.wrap($el)
              .find('.document-item-department')
              .should(
                'text',
                `Documents | ${documents[index].departments[0].name}`
              )
          } else {
            cy.wrap($el)
              .find('.document-item-department')
              .should('include.text', 'Documents')
          }

          cy.wrap($el)
            .find('.document-item-name')
            .should('text', documents[index].title)

          cy.wrap(import('utils/formatter'))
            .invoke('formatDate', documents[index].incident_date)
            .then((value) =>
              expect($el.find('.document-item-incident-date')).to.contain(value)
            )
        })
      })
    })

    it('opens document url in new tab when click on document card', () => {
      const searchQuery = 'new'
      const section = 'documents'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        cy.window().then((win) => {
          cy.stub(win, 'open').as('open')
        })
        const searchResults = response.body
        const documents = searchResults[section].results
        const pdfDocumentIndex = _.findIndex(documents, [
          'document_type',
          'application/pdf',
        ])

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Documents')
          .parent()
          .click({ force: true })

        cy.get('.document-item').eq(pdfDocumentIndex).click({ force: true })

        cy.get('@open').should(
          'to.be.calledWith',
          documents[pdfDocumentIndex].url,
          '_blank',
          'noopener noreferrer'
        )
      })
    })

    it('gets more documents results when scroll down', () => {
      const searchQuery = 'ne'

      cy.visit('/')
      cy.get('.search-icon').click()
      cy.get('.search-modal').find('input').type(searchQuery)
      cy.get('.search-bar-container')
        .contains('Documents')
        .parent()
        .click({ force: true })

      cy.get('.document-item').should('have.length', 20)

      cy.get('.particular-search').scrollTo('bottom')

      cy.get('.document-item').should('have.length.greaterThan', 20)
    })

    it('renders news articles results', () => {
      const searchQuery = 'new'
      const section = 'articles'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        const searchResults = response.body
        const articles = searchResults[section].results

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Articles')
          .parent()
          .click({ force: true })

        cy.get('.particular-search')
          .find('.search-title')
          .should(
            'text',
            `${searchResults[section].count} results for\u00A0\u201C${searchQuery}\u201D\u00A0in\u00A0${section}`
          )

        cy.get('.news-article-item').each(($el, index) => {
          if (!_.isEmpty(articles[index].source_name)) {
            cy.wrap($el)
              .find('.news-article-item-source-name')
              .should('text', `News Articles | ${articles[index].source_name}`)
          } else {
            cy.wrap($el)
              .find('.news-article-item-source-name')
              .should('include.text', 'News Articles')
          }

          cy.wrap($el)
            .find('.news-article-item-name')
            .should('text', articles[index].title)
          cy.wrap(import('utils/formatter'))
            .invoke('formatDate', articles[index].date)
            .then((value) =>
              expect($el.find('.news-article-item-published-date')).to.contain(
                value
              )
            )
          cy.wrap($el)
            .find('.news-article-item-text-content')
            .should('include.text', articles[index].author)
        })
      })
    })

    it('opens news article url in new tab when click on news article card', () => {
      const searchQuery = 'new'
      const section = 'articles'

      cy.visit('/')
      cy.get('.search-icon').click()

      cy.request(
        `http://localhost:9000/api/search/?q=${searchQuery}&doc_type=${section}/`
      ).then((response) => {
        cy.window().then((win) => {
          cy.stub(win, 'open').as('open')
        })
        const searchResults = response.body
        const articles = searchResults[section].results

        cy.get('.search-modal').find('input').type(searchQuery)
        cy.get('.search-bar-container')
          .contains('Articles')
          .parent()
          .click({ force: true })

        cy.get('.news-article-item').eq(0).click({ force: true })

        cy.get('@open').should(
          'to.be.calledWith',
          articles[0].url,
          '_blank',
          'noopener noreferrer'
        )
      })
    })

    it('gets more news articles results when scroll down', () => {
      const searchQuery = 'ne'

      cy.visit('/')
      cy.get('.search-icon').click()
      cy.get('.search-modal').find('input').type(searchQuery)
      cy.get('.search-bar-container')
        .contains('Articles')
        .parent()
        .click({ force: true })

      cy.get('.news-article-item').should('have.length', 20)

      cy.get('.particular-search').scrollTo('bottom')

      cy.get('.news-article-item').should('have.length.greaterThan', 20)
    })
  })

  describe('Recent queries', () => {
    it('displays recent search terms', () => {
      const searchQuery = 'orleans'

      cy.visit('/')
      cy.get('.search-icon').click()
      cy.get('.search-modal').find('input').type(searchQuery)
      cy.get('.department-item').eq(0).click({ force: true })

      cy.visit('/')
      cy.get('.search-icon').click()
      cy.get('.search-query-suggestion')
        .eq(0)
        .should('text', searchQuery)
        .click()

      cy.get('.search-all').should('exist')
    })
  })
})
