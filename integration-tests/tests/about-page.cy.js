const { _ } = Cypress

describe('About Page', () => {
  it('renders successfully', () => {
    cy.visit('/about/')

    cy.request('http://localhost:9000/api/q-and-a/').then((response) => {
      const responseData = response.body

      cy.get('.summary').find('.title').should('text', 'About LLEAD')

      cy.get('.section')
        .should('length', responseData.length)
        .each(($el, index) => {
          const qAndA = responseData[index]
          expect($el.find('.section-name')).to.contain(
            `${_.toUpper(qAndA.section)}`
          )

          _.forEach($el.find('.title'), (item, index) => {
            expect(item).to.contain(qAndA.q_and_a[index].question)
          })
        })
    })
  })

  it('expands questions', () => {
    cy.visit('/about/')

    cy.get('.section')
      .eq(0)
      .find('.accordion')
      .eq(0)
      .find('div[data-testid="answer"]')
      .should('have.class', 'rah-static--height-zero')

    cy.get('.section').eq(0).find('.accordion').eq(0).click()

    cy.get('.section')
      .eq(0)
      .find('.accordion')
      .eq(0)
      .find('div[data-testid="answer"]')
      .should('have.class', 'rah-static--height-auto')
  })
})
