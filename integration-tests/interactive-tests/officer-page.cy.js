const { _ } = Cypress

describe('OfficerPage', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.request('http://localhost:9000/api/officers/testing-officer-timelines/')
      .its('body')
      .as('officerIds')
  })

  it('adds document to recent items when click document card in officer timeline', function () {
    const id = this.officerIds.document_officer_id
    cy.visit(`/officers/${id}/`)

    cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
      (response) => {
        const documentTimeline = _.filter(
          response.body.timeline,
          (timelineItem) => 'DOCUMENT' === timelineItem['kind']
        )
        const sortedDocumentTimeline = _.orderBy(
          documentTimeline,
          [
            (o) => {
              return o.date || ''
            },
          ],
          ['desc']
        )
        const document = sortedDocumentTimeline[0]

        cy.get('.timeline-document-card').eq(0).click()

        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.document-title')
          .should('text', document.title)
      }
    )
  })

  it('adds news article to recent items when click news article card in officer timeline', function () {
    const id = this.officerIds.news_article_officer_id
    cy.visit(`/officers/${id}/`)

    cy.request(`http://localhost:9000/api/officers/${id}/timeline/`).then(
      (response) => {
        const articleTimeline = _.filter(
          response.body.timeline,
          (timelineItem) => 'NEWS_ARTICLE' === timelineItem['kind']
        )
        const sortedArticleTimeline = _.orderBy(
          articleTimeline,
          [
            (o) => {
              return o.date || ''
            },
          ],
          ['desc']
        )
        const article = sortedArticleTimeline[0]

        cy.get('.timeline-news-article-card').eq(0).click()

        cy.visit('/')

        cy.get('.recent-items-carousel')
          .find('.swiper-slide')
          .eq(0)
          .find('.news-article-title')
          .should('text', article.title)
      }
    )
  })
})
