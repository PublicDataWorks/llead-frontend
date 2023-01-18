describe('Login Page', () => {
  it('redirects to FrontPage when loging in successfully', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('test@gmail.com')
    cy.get('input[name="password"]').type('P@ssw0rd')
    cy.get('.btn').click()

    cy.waitUntil(() => cy.location('pathname').should('eq', '/'))
  })

  it('shows error when loging in unsuccessfully', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('username@mail.com')
    cy.get('input[name="password"]').type('password')
    cy.get('.btn').click()

    cy.contains('Password/email combination aren’t recognized')
  })

  it('toggles show hide password', () => {
    cy.visit('/login')

    cy.get('input[name="password"]').type('password')
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')

    cy.get('.eye-icon').click()
    cy.get('input[name="password"]').should('have.attr', 'type', 'text')
  })

  it('redirects to Forgot Password Page when click on here link', () => {
    cy.visit('/login')

    cy.get('.forgot-password-message').find('a').dblclick()

    cy.waitUntil(() =>
      cy.location('pathname').should('eq', '/forgot-password/')
    )
  })
})
