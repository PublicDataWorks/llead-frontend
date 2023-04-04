describe('DepartmentPage', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.request('http://localhost:9000/api/departments/')
      .its('body')
      .as('departments')
  })

  it('adds officer to recent items when click on officer card', function () {
    const slug = this.departments[0].id
    cy.visit(`/agency/${slug}/`)

    cy.request(`http://localhost:9000/api/departments/${slug}/officers`).then(
      (response) => {
        const officers = response.body

        cy.get('.featured-officer-card').eq(0).click()

        cy.wrap(import('utils/paths'))
          .invoke('officerPath', officers[0].id, officers[0].name)
          .then((value) => cy.location('pathname').should('eq', value))

        // Wait for saving recent item
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.officer-name')
          .should('text', officers[0].name)
      }
    )
  })

  it('adds document to recent items when click on document card', function () {
    const slug = this.departments[1].id
    cy.visit(`/agency/${slug}/`)

    cy.request(`http://localhost:9000/api/departments/${slug}/documents`).then(
      (response) => {
        const documents = response.body

        cy.get('.featured-document-card').eq(0).click()

        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.document-title')
          .should('text', documents[0].title)
      }
    )
  })

  it('adds news article to recent items when click on news article card', function () {
    const slug = this.departments[1].id
    cy.visit(`/agency/${slug}/`)

    cy.request(
      `http://localhost:9000/api/departments/${slug}/news_articles`
    ).then((response) => {
      const articles = response.body

      cy.get('.featured-news-article-card').eq(0).click()

      cy.visit('/')

      cy.get('.recent-items-carousel')
        .find('.swiper-slide')
        .eq(0)
        .find('.news-article-title')
        .should('text', articles[0].title)
    })
  })
})
