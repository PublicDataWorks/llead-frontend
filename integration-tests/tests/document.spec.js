describe('Document Page', () => {
  it('shows document info', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:8000/api/documents/1',
      },
      {
        id: 1,
        title: 'Document title',
      }
    )

    cy.visit('/documents/1')

    cy.contains('DOCUMENT 1')
  })
})
