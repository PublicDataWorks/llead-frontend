describe('Logout', () => {
  it('should log out successfully', () => {
    cy.login()

    cy.visit('/')
    cy.get('.logout-btn').click()

    cy.location('pathname').should('eq', '/login/')
  })
})
