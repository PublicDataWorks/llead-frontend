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
          FRONT_PAGE_SUMMARY:
            'We are building a database of <b>Louisiana</b> police officers, departments, and documents.',
        },
      }
    )
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/analytics/summary',
      },
      {
        departments_count: 4,
        officers_count: 5,
        documents_count: 6,
        recent_days: 30,
        recent_departments_count: 1,
        recent_officers_count: 2,
        recent_documents_count: 3,
      }
    )

    cy.visit('/')

    cy.location('pathname').should('eq', '/')
    cy.contains(
      'We are building a database of Louisiana police officers, departments, and documents.'
    )
    cy.contains('6 documents')
    cy.contains('+3 in the past 30 days')
    cy.contains('5 officers')
    cy.contains('+2 in the past 30 days')
    cy.contains('4 departments')
    cy.contains('+1 in the past 30 days')
  })

  it('redirect to login when not logged in - test if local storage is cleared', () => {
    cy.visit('/')

    cy.location('pathname').should('eq', '/login/')
  })
})
