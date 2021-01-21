describe('Homepage', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/')

    cy.contains('Homepage').should('not.exist')
    cy.location('pathname').should('eq', '/login/')
  })
})
