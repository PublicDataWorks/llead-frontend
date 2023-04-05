describe('Forgot Password Page', () => {
  it('shows sended email when request change password successfully', () => {
    cy.visit('/forgot-password')

    cy.get('input[name="email"]').type('test@gmail.com')

    cy.get('.btn').click()

    cy.contains('Your password reset link has been sent to your email.')
  })

  it('shows error when request change password fail', () => {
    cy.visit('/forgot-password')

    cy.get('input[name="email"]').type('username@mail.com')

    cy.get('.btn').click()

    cy.contains(
      "We couldn't find an account associated with that email. Please try a different e-mail address."
    )
  })
})
