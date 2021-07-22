describe('Forgot Password Page', () => {
  it('should show sended email when request change password successfully', () => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/password_reset/',
      },
      {
        detail: 'OK',
      }
    )

    cy.clearLocalStorage()

    cy.visit('/forgot-password')

    cy.get('input[name="email"]').type('username@mail.com')

    cy.get('.btn').click()

    cy.contains('Your password reset link has been sent to your email.')
  })

  it('should show error when request change password fail', () => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/password_reset/',
      },
      {
        statusCode: 400,
      }
    )

    cy.clearLocalStorage()

    cy.visit('/forgot-password')

    cy.get('input[name="email"]').type('username@mail.com')

    cy.get('.btn').click()

    cy.contains(
      "We couldn't find an account associated with that email. Please try a different e-mail address."
    )
  })
})
