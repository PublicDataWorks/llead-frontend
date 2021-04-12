describe('Logout', () => {
  it('should log out successfully', () => {
    cy.login()

    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/token/revoke/',
      },
      {
        detail: 'Logout successfully',
      }
    )

    cy.visit('/')
    cy.get('.logout-btn').click()

    cy.location('pathname').should('eq', '/login/')
  })
})
