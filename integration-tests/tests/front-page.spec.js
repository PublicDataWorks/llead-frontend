describe('FrontPage', () => {
  it('redirect to login when not logged in', () => {
    cy.visit('/')

    cy.location('pathname').should('eq', '/login/')
  })

  it('render successfully', () => {
    cy.login()
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/app-config',
      },
      {
        CMS: {
          FRONTPAGE_SUMMARY:
            'We are building a database of <b>Louisiana</b> police officers, departments, and documents.',
        },
      }
    )

    cy.visit('/')

    cy.location('pathname').should('eq', '/')
    cy.contains(
      'We are building a database of Louisiana police officers, departments, and documents.'
    )
  })
})
