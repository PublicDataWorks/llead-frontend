const { _ } = Cypress

describe('FrontPage', () => {
  it('renders order correctly', () => {
    cy.visit('/')

    cy.get('.front-order-101')
      .should('have.css', 'order', '101')
      .contains('Agencies')
    cy.get('.front-order-102')
      .should('have.css', 'order', '102')
      .contains('Officers')
    cy.get('.front-order-103')
      .should('have.css', 'order', '103')
      .contains('News')
    cy.get('.front-order-104')
      .should('have.css', 'order', '104')
      .contains('Documents')
  })

  describe('FrontPage Cards', () => {
    it('renders summary', () => {
      cy.visit('/')

      cy.request('http://localhost:9000/api/front-page-cards/').then(
        (response) => {
          const cards = response.body
          cy.get('.intro-card')
            .find('.bar')
            .should('length', cards.length + 1)
        }
      )

      cy.request('http://localhost:9000/api/analytics/summary/').then(
        (response) => {
          const summmary = response.body
          cy.get('.navigation-button').find('.next-button').click()
          cy.get('.navigation-button').find('.next-button').click()

          cy.wrap(import('utils/formatter'))
            .invoke(
              'stringifyTotalItems',
              summmary.departments_count,
              'agencies'
            )
            .then((value) => cy.contains(value).should('be.visible'))
          cy.wrap(import('utils/formatter'))
            .invoke('stringifyTotalItems', summmary.officers_count, 'officers')
            .then((value) => cy.contains(value).should('be.visible'))
          cy.wrap(import('utils/formatter'))
            .invoke(
              'stringifyTotalItems',
              summmary.documents_count,
              'documents'
            )
            .then((value) => cy.contains(value).should('be.visible'))
          cy.wrap(import('utils/formatter'))
            .invoke(
              'stringifyTotalItems',
              summmary.news_articles_count,
              'news articles'
            )
            .then((value) => cy.contains(value).should('be.visible'))
        }
      )
    })
  })

  describe('departments carousel', () => {
    it('renders correctly', () => {
      cy.visit('/')

      cy.get('.departments-carousel')
        .find('.carousel-title')
        .should('text', 'Agencies')

      cy.get('.departments-carousel').find('.swiper-slide').should('length', 20)

      cy.request('http://localhost:9000/api/departments/').then((response) => {
        const departments = response.body

        cy.get('.departments-carousel')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', 4)

        cy.get('@visibleSlides').each(($el, index) => {
          expect($el.find('.department-name')).to.contain(
            `${departments[index].name}`
          )
          expect($el.find('.department-city')).to.contain(
            `${departments[index].city}`
          )
          expect($el.find('.department-parish')).to.contain(
            `${departments[index].parish}`
          )

          cy.get('@visibleSlides')
            .eq(index)
            .find('.department-map')
            .should(
              'have.css',
              'background-image',
              `url("${departments[index].location_map_url}")`
            )
        })
      })

      cy.get('.departments-carousel')
        .find('.carousel-prev.swiper-button-disabled')
        .should('exist')

      _.times(20, () => {
        cy.get('.departments-carousel').find('.carousel-next').click()
      })

      cy.get('.departments-carousel')
        .find('.carousel-next.swiper-button-disabled')
        .should('exist')
    })

    it('redirects to department page when click on department card', () => {
      cy.visit('/')

      cy.request('http://localhost:9000/api/departments/').then((response) => {
        const departments = response.body

        cy.get('.departments-carousel').find('.swiper-slide').eq(1).click()
        cy.location('pathname').should('eq', `/agency/${departments[1].id}/`)
      })
    })
  })

  describe('officers carousel', () => {
    it('render correctly', () => {
      cy.visit('/')

      cy.get('.officers-carousel')
        .find('.carousel-title')
        .should('text', 'Officers')

      cy.get('.officers-carousel').find('.swiper-slide').should('length', 20)

      cy.request('http://localhost:9000/api/officers/').then((response) => {
        const officers = response.body

        cy.get('.officers-carousel')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', 4)

        cy.get('@visibleSlides').each(($el, index) => {
          expect($el.find('.officer-name')).to.contain(
            `${officers[index].name}`
          )
          expect($el.find('.officer-department')).to.contain(
            `${officers[index].departments[0].name}`
          )
        })
      })

      cy.get('.officers-carousel')
        .find('.carousel-prev.swiper-button-disabled')
        .should('exist')

      _.times(20, () => {
        cy.get('.officers-carousel').find('.carousel-next').click()
      })

      cy.get('.officers-carousel')
        .find('.carousel-next.swiper-button-disabled')
        .should('exist')
    })

    it('redirects to department page when click on officer card', () => {
      cy.visit('/')

      cy.request('http://localhost:9000/api/officers/').then((response) => {
        const officers = response.body

        cy.get('.officers-carousel').find('.swiper-slide').eq(1).click()

        cy.wrap(import('utils/paths'))
          .invoke('officerPath', officers[1].id, officers[1].name)
          .then((value) => cy.location('pathname').should('eq', value))
      })
    })
  })

  describe('documents carousel', () => {
    it('render correctly', () => {
      cy.visit('/')

      cy.get('.documents-carousel')
        .find('.carousel-title')
        .should('text', 'Documents')

      cy.get('.documents-carousel').find('.swiper-slide').should('length', 20)

      cy.request('http://localhost:9000/api/documents/').then((response) => {
        const documents = response.body

        cy.get('.documents-carousel')
          .find('.swiper-slide:visible')
          .as('visibleSlides')
          .should('length', 4)

        cy.get('@visibleSlides').each(($el, index) => {
          expect($el.find('.document-type')).to.contain('document')
          expect($el.find('.document-title')).to.contain(
            `${documents[index].title}`
          )

          cy.wrap(import('utils/formatter'))
            .invoke('formatDate', documents[index].incident_date)
            .then((value) =>
              expect($el.find('.document-subtitle')).to.contain(value)
            )

          expect($el.find('.document-department-name')).to.contain(
            `${documents[index].departments[0].name}`
          )
        })
      })

      cy.get('.documents-carousel')
        .find('.carousel-prev.swiper-button-disabled')
        .should('exist')

      _.times(20, () => {
        cy.get('.documents-carousel').find('.carousel-next').click()
      })

      cy.get('.documents-carousel')
        .find('.carousel-next.swiper-button-disabled')
        .should('exist')
    })

    it('opens document url in new tab when click on document card', () => {
      cy.visit('/')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.request('http://localhost:9000/api/documents/').then((response) => {
        const documents = response.body

        cy.get('.documents-carousel').find('.swiper-slide').eq(0).click()

        cy.get('@open').should(
          'to.be.calledWith',
          documents[0].url,
          '_blank',
          'noopener noreferrer'
        )
      })
    })

    it('redirects to department page when click on departments section', () => {
      cy.visit('/')

      cy.request('http://localhost:9000/api/documents/').then((response) => {
        const documents = response.body

        cy.get('.documents-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.document-department-name')
          .eq(0)
          .click()

        cy.location('pathname').should(
          'eq',
          `/agency/${documents[0].departments[0].id}/`
        )
      })
    })
  })

  describe('news articles carousel', () => {
    it('render correctly', () => {
      cy.visit('/')

      cy.get('.news-articles-carousel')
        .find('.carousel-title')
        .should('text', 'News')

      cy.get('.news-articles-carousel')
        .find('.swiper-slide')
        .should('length', 20)

      cy.request('http://localhost:9000/api/news-articles/').then(
        (response) => {
          const articles = response.body

          cy.get('.news-articles-carousel')
            .find('.swiper-slide:visible')
            .as('visibleSlides')
            .should('length', 4)

          cy.get('@visibleSlides').each(($el, index) => {
            expect($el.find('.news-article-type')).to.contain('news article')
            expect($el.find('.news-article-title')).to.contain(
              `${articles[index].title}`
            )
            expect($el.find('.news-article-subtitle').first()).to.contain(
              `${articles[index].source_name}`
            )

            cy.wrap(import('utils/formatter'))
              .invoke('formatDate', articles[index].date)
              .then((value) =>
                expect($el.find('.news-article-subtitle').last()).to.contain(
                  value
                )
              )
          })
        }
      )

      cy.get('.news-articles-carousel')
        .find('.carousel-prev.swiper-button-disabled')
        .should('exist')

      _.times(20, () => {
        cy.get('.news-articles-carousel').find('.carousel-next').click()
      })

      cy.get('.news-articles-carousel')
        .find('.carousel-next.swiper-button-disabled')
        .should('exist')
    })

    it('opens news article url in new tab when click on news article card', () => {
      cy.visit('/')
      cy.window().then((win) => {
        cy.stub(win, 'open').as('open')
      })

      cy.request('http://localhost:9000/api/news-articles/').then(
        (response) => {
          const articles = response.body

          cy.get('.news-articles-carousel').find('.swiper-slide').eq(0).click()

          cy.get('@open').should(
            'to.be.calledWith',
            articles[0].url,
            '_blank',
            'noopener noreferrer'
          )
        }
      )
    })
  })

  describe('Header', () => {
    it('redirects to about page when click on About on header', () => {
      cy.visit('/')

      cy.get('.navbar').find('.about').click()

      cy.location('pathname').should('eq', '/about/')
    })

    it('redirects to contact page when click on Contact on header', () => {
      cy.visit('/')

      cy.get('.navbar').find('.contact').click()

      cy.location('pathname').should('eq', '/contact/')
    })

    it('logs out successfully', () => {
      cy.visit('/login')

      cy.get('input[name="email"]').type('test@gmail.com')
      cy.get('input[name="password"]').type('P@ssw0rd')
      cy.get('.btn').click()

      cy.get('.panel-toggle').click()
      cy.get('.user-email').should('text', 'test@gmail.com')

      cy.get('.logout-button').click()

      cy.location('pathname').should('eq', '/')
      cy.get('.panel-toggle').should('not.exist')
    })
  })
})
