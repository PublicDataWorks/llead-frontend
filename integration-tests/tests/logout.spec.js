describe('Logout', () => {
  beforeEach(() => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/token/revoke/',
      },
      {
        detail: 'Logout successfully',
      }
    )

    cy.interceptExact(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/user/',
      },
      {
        email: 'user@mail.com',
      }
    )
  })

  it('should log out successfully', () => {
    cy.login()

    cy.visit('/')
    cy.get('.panel-toggle').click()

    cy.get('.user-email').should('text', 'user@mail.com')

    cy.get('.logout-button').click()
    cy.location('pathname').should('eq', '/login/')
  })
})
