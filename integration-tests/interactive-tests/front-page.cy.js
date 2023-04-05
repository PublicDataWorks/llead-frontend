describe('FrontPage', () => {
  beforeEach(() => {
    cy.resetDatabase()
  })

  describe('Recent items', () => {
    it('adds department, officer, document, news article to recent items when click', () => {
      cy.visit('/')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.request('http://localhost:9000/api/departments/').then((response) => {
        const departments = response.body

        cy.get('.recent-items-carousel').should('not.exist')

        cy.get('.departments-carousel', { timeout: 1000 })
          .find('.department-card')
          .eq(0)
          .click()

        cy.waitUntil(() =>
          cy.location('pathname').should('eq', `/agency/${departments[0].id}/`)
        )

        // Wait for saving recent item
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .should('length', 1)
        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.department-name')
          .should('text', departments[0].name)
      })

      cy.request('http://localhost:9000/api/officers/').then((response) => {
        const officers = response.body

        cy.get('.officers-carousel').find('.officer-card').eq(0).click()

        cy.waitUntil(() =>
          cy
            .wrap(import('utils/paths'))
            .invoke('officerPath', officers[0].id, officers[0].name)
            .then((value) => cy.location('pathname').should('eq', value))
        )

        // Wait for saving recent item
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .should('length', 2)
        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.officer-name')
          .should('text', officers[0].name)
      })

      cy.request('http://localhost:9000/api/documents/').then((response) => {
        const documents = response.body

        cy.get('.documents-carousel').find('.document-card').eq(0).click()

        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .should('length', 3)
        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.document-title')
          .contains(documents[0].title)
      })

      cy.request('http://localhost:9000/api/news-articles/').then(
        (response) => {
          const articles = response.body

          cy.get('.news-articles-carousel')
            .find('.news-article-card')
            .eq(0)
            .click()

          cy.visit('/')

          cy.get('.recent-items-carousel')
            .find('.swiper-slide')
            .should('length', 4)
          cy.get('.recent-items-carousel')
            .find('.swiper-slide')
            .eq(0)
            .find('.news-article-title')
            .contains(articles[0].title)
        }
      )
    })

    it('does not render remove icon on recent items for anonymous users', () => {
      cy.visit('/')

      cy.request('http://localhost:9000/api/departments/').then((response) => {
        const departments = response.body

        cy.get('.recent-items-carousel').should('not.exist')

        cy.get('.departments-carousel').find('.department-card').eq(0).click()

        cy.waitUntil(() =>
          cy.location('pathname').should('eq', `/agency/${departments[0].id}/`)
        )

        // Wait for saving recent item
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.custom-link-wrapper')
          .each(($el) => {
            cy.wrap($el).find('.remove-btn').should('not.exist')
          })
      })
    })

    it('removes recent item as users', () => {
      cy.visit('/login')

      cy.get('input[name="email"]').type('test@gmail.com')
      cy.get('input[name="password"]').type('P@ssw0rd')
      cy.get('.btn').click()

      cy.waitUntil(() => cy.location('pathname').should('eq', '/'))

      cy.request('http://localhost:9000/api/departments/').then((response) => {
        const departments = response.body

        cy.get('.recent-items-carousel').should('not.exist')

        cy.get('.departments-carousel').find('.department-card').eq(0).click()

        cy.waitUntil(() =>
          cy.location('pathname').should('eq', `/agency/${departments[0].id}/`)
        )

        // Wait for saving recent item
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.visit('/')

        cy.get('.recent-items-carousel').find('.remove-btn').click()

        cy.get('.recent-items-carousel').should('not.exist')
      })
    })
  })

  describe('News article cards', () => {
    it('does not render remove icon if user is not admin', () => {
      cy.visit('/login')

      cy.get('input[name="email"]').type('test@gmail.com')
      cy.get('input[name="password"]').type('P@ssw0rd')
      cy.get('.btn').click()

      cy.get('.news-article-card').each(($el) => {
        cy.wrap($el).find('.hide-btn').should('not.exist')
      })
    })

    it('removes news articles as admin', () => {
      cy.rebuildIndex()
      cy.clearCache()
      cy.visit('/login')

      cy.get('input[name="email"]').type('admin@gmail.com')
      cy.get('input[name="password"]').type('P@ssw0rd')
      cy.get('.btn').click()

      cy.get('.news-article-card').each(($el) => {
        cy.wrap($el).find('.hide-btn').should('exist')
      })

      cy.request('http://localhost:9000/api/news-articles/').then(
        (response) => {
          const articles = response.body

          cy.get('.news-article-card').eq(0).find('.hide-btn').click()
          cy.get('.hide-comfirmation').find('.delete-btn').click()

          cy.get('.panel-toggle').click()
          cy.get('.logout-button').click()

          cy.visit('/login')
          cy.get('input[name="email"]').type('test@gmail.com')
          cy.get('input[name="password"]').type('P@ssw0rd')
          cy.get('.btn').click()

          cy.contains(articles[0].title).should('not.exist')

          cy.get('.panel-toggle').click()
          cy.get('.logout-button').click()

          cy.contains(articles[0].title).should('not.exist')
        }
      )
    })
  })
})
