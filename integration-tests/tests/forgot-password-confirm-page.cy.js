describe('Forgot Password Confirm Page', () => {
  it('changes password successfully', () => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/password-reset/confirm/',
      },
      {
        message: 'Your password has changed.',
      }
    )

    cy.clearLocalStorage()

    cy.visit('/forgot-password/confirm?token=ba')

    cy.get('input[name="confirmPassword"]').type('new-p@ssword')
    cy.get('input[name="password"]').type('new-p@ssword')

    cy.get('.btn').click()

    cy.contains('Updated password successfully.')
  })

  it('shows error when the passwords does not match', () => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/password-reset/confirm/',
      },
      {
        message: 'Your password has changed.',
      }
    )

    cy.clearLocalStorage()

    cy.visit('/forgot-password/confirm?token=ba')

    cy.get('input[name="password"]').type('new-p@ssword')
    cy.get('input[name="confirmPassword"]').type('new-p@ssword-not-matches')

    cy.get('.btn').click()

    cy.contains('The two passwords does not match. Please try again!')
  })

  it('shows error when calling api causes some errors', () => {
    cy.interceptExact(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/password-reset/confirm/',
      },
      {
        statusCode: 401,
        body: {
          message: 'Token is invalid or has been used',
        },
      }
    )

    cy.clearLocalStorage()

    cy.visit('/forgot-password/confirm?token=ba')

    cy.get('input[name="password"]').type('new-p@ssword')
    cy.get('input[name="confirmPassword"]').type('new-p@ssword')

    cy.get('.btn').click()

    cy.contains('Token is invalid or has been used')
  })
})
