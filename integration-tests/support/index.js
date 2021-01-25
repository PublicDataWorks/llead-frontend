Cypress.Commands.add('login', () => {
  // This is a jwt token generated for testing only which expired at 2021/1/20 16:37:50
  cy.clock(Date.UTC(2021, 1, 20), ['Date'])
  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzODM5MDcwLC' +
    'JqdGkiOiI5YmExNTZiMTZmMDU0Y2ZjYjIzODY4Y2QxNGMyZjI0YSJ9.ixdg8N3oqUFFdncy0XqsxbD4-aGrlVg0ENvajwz8qcs'

  window.localStorage.setItem(
    'redux',
    JSON.stringify({
      token: { access: accessToken },
    })
  )
})
