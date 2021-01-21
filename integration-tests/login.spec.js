describe('Login Page', () => {
  it('should redirect to homepage when loging in successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/token/',
      },
      {
        access: 'accessToken',
        refresh: 'refreshToken',
      }
    )

    cy.visit('/login')

    cy.get('input[name="email"]').type('username@mail.com')
    cy.get('input[name="password"]').type('password')
    cy.get('.btn').click()

    cy.contains('Homepage')
  })
})
